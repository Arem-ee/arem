export interface BlogPostData {
  title: string;
  slug: string;
  date: string;
  readingTime: string;
  summary: string;
  tags: string[];
  coverImage?: string;
  content: string;
}

export const blogPosts: BlogPostData[] = [
  {
    title: "How a Multisig Wallet Actually Works",
    slug: "multisig-wallets-how-they-work",
    date: "2026-07-14",
    readingTime: "8 min read",
    summary:
      "A walkthrough of the model behind Safe-style multisig wallets, a minimal Solidity implementation, and the pitfalls that make you not want to write your own.",
    tags: ["Multisig", "Solidity", "Safe", "Security"],
    content: `
      <h2>The Problem a Multisig Solves</h2>
      <p>A single private key is a single point of failure. If it leaks, the wallet empties. If it is lost, the wallet freezes. A multisig spreads that risk across several keys: a wallet that requires 2 of 3 owners to sign any transaction.</p>
      <p>The term comes from the signers, not the addresses. A 2-of-3 wallet is controlled by three keys. Moving funds requires signatures from any two of them.</p>

      <h2>The Model</h2>
      <p>A multisig wallet is a smart contract with two pieces of state:</p>
      <ul>
        <li><strong>Owners:</strong> the list of addresses that hold a key</li>
        <li><strong>Threshold:</strong> how many of them must sign for a transaction to execute</li>
      </ul>
      <p>Every transfer goes through the same lifecycle: propose, collect signatures, execute. The contract does not move funds until the threshold is met.</p>

      <h2>A Minimal Implementation</h2>
      <p>This is the smallest multisig that does the job. It is educational, not production code. There is no replay protection and no way to change owners, and that matters later.</p>
      <pre><code>// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract MinimalMultiSig {
  address[] public owners;
  uint256 public threshold;
  mapping(bytes32 => mapping(address => bool)) public signed;
  mapping(bytes32 => bool) public executed;

  constructor(address[] memory _owners, uint256 _threshold) {
    require(_owners.length &gt;= _threshold, "threshold too high");
    owners = _owners;
    threshold = _threshold;
  }

  // Encode the transfer, hash it, collect signatures, then call this.
  function execute(
    address to,
    uint256 value,
    bytes calldata data,
    bytes[] calldata signatures
  ) external {
    bytes32 txHash = keccak256(abi.encode(to, value, data));
    require(!executed[txHash], "already executed");

    uint256 count = 0;
    for (uint256 i = 0; i &lt; signatures.length; i++) {
      address signer = recoverSigner(txHash, signatures[i]);
      if (signed[txHash][signer]) continue; // no double counting
      if (!isOwner(signer)) continue;
      signed[txHash][signer] = true;
      count++;
    }
    require(count &gt;= threshold, "not enough signatures");

    executed[txHash] = true;
    (bool ok, ) = to.call{value: value}(data);
    require(ok, "execution failed");
  }
}</code></pre>
      <p>To make a transfer, each signer signs the hash <code>keccak256(abi.encode(to, value, data))</code> with their key. The last signer submits all signatures and the call executes. That is the whole mechanism.</p>

      <h2>Why You Use Safe Instead</h2>
      <p>The minimal version above has problems that are not obvious until money is in it:</p>
      <ul>
        <li><strong>Replay across chains:</strong> the same transaction hash can be valid on another chain that runs the same code. Production multisigs include a chain ID and nonce in the signed hash.</li>
        <li><strong>No owner changes:</strong> you cannot add an owner or change the threshold, so key rotation is impossible.</li>
        <li><strong>Phishing surface:</strong> an owner signs a hash without seeing the decoded transaction. Real wallets decode and display the transaction before signing.</li>
      </ul>
      <p>Safe (formerly Gnosis Safe) solves these: EIP-712 typed data, a nonce per transaction, owner and threshold management, and modules for recovery and automation. It is audited, and its contract code runs on most EVM chains.</p>

      <h2>Creating a Safe With the SDK</h2>
      <p>The <code>@safe-global/protocol-kit</code> package handles deployment and transaction building:</p>
      <pre><code>import Safe from "@safe-global/protocol-kit";

const owners = [
  "0x1111111111111111111111111111111111111111",
  "0x2222222222222222222222222222222222222222",
  "0x3333333333333333333333333333333333333333",
];

const safe = await Safe.init({
  provider: "https://rpc.testnet.monad.xyz",
  signer: signerAddress,
  safeAddress: undefined, // undefined deploys a new one
});

const deployment = await safe.createSafe({ owners, threshold: 2 });
console.log("safe at", deployment.safeAddress);</code></pre>
      <p>Deploy on a testnet first. Send test funds, add an owner, remove an owner, make a 2-of-3 transfer. The failure modes are cheap to learn there.</p>

      <h2>What to Watch For</h2>
      <ul>
        <li><strong>Threshold changes:</strong> lowering the threshold to 1 defeats the purpose. Some protocols require the threshold to never drop below 2.</li>
        <li><strong>Losing a key:</strong> with 2-of-3 you survive one lost key. With 3-of-5 you survive two. Keep the math honest about how many keys can fail.</li>
        <li><strong>Signer hygiene:</strong> a multisig is only as good as its weakest signer. A hardware key per signer is the standard setup.</li>
      </ul>
      <p>Multisigs are boring by design. The contract does one thing, slowly and with checks. That slowness is the feature.</p>
    `,
  },
  {
    title: "Self-Custody: Keys, Seeds, and Derivation Paths",
    slug: "self-custody-keys-seeds-derivation-paths",
    date: "2026-06-02",
    readingTime: "7 min read",
    summary:
      "What self-custody actually requires: how a mnemonic becomes an address, what you must back up, and how to verify a wallet works without a network.",
    tags: ["Self-Custody", "Wallets", "BIP39", "Ethers.js"],
    content: `
      <h2>What Self-Custody Means in Practice</h2>
      <p>Self-custody means you hold the material that can move the funds. For most wallets that material is a mnemonic phrase: 12 or 24 words that derive every key the wallet will ever use.</p>
      <p>The chain from phrase to address has three standards: BIP39 (mnemonic to seed), BIP32 (seed to master key), BIP44 (master key to accounts). Understanding them is what lets you verify a wallet instead of trusting its UI.</p>

      <h2>Mnemonic to Address, Step by Step</h2>
      <p>BIP39 turns entropy into words. The 12 or 24 words are a checksummed encoding of a random number. BIP32 takes the seed and walks down a tree of keys. BIP44 fixes the path so every wallet derives the same account from the same phrase.</p>
      <p>Ethers.js hides most of this. The full path, for reference:</p>
      <pre><code>import { Wallet, HDNodeWallet } from "ethers";

// 1. Generate a phrase. This is what you back up.
const wallet = HDNodeWallet.createRandom();
console.log(wallet.mnemonic.phrase);
// "candy maple cake ..."

// 2. The same phrase always derives the same account.
const restored = HDNodeWallet.fromPhrase(wallet.mnemonic.phrase);
console.log(restored.address === wallet.address); // true

// 3. Derive account #0 on Ethereum mainnet (path m/44'/60'/0'/0/0)
const account = HDNodeWallet.fromPhrase(wallet.mnemonic.phrase, undefined, "m/44'/60'/0'/0/0");
console.log(account.address);

// 4. A passphrase changes everything. Empty passphrase !== "hunter2".
const secured = HDNodeWallet.fromPhrase(wallet.mnemonic.phrase, "hunter2");
console.log(secured.address !== wallet.address); // true</code></pre>
      <p>The derivation path <code>m/44'/60'/0'/0/0</code> breaks down as: BIP44 purpose, coin type 60 (Ethereum), account 0, external chain, address index 0. Change the coin type and the same phrase produces an address on another chain. This is why a phrase can manage Ethereum and Solana keys from one backup.</p>

      <h2>What to Back Up</h2>
      <p>Back up exactly three things:</p>
      <ul>
        <li><strong>The words, in order.</strong> Wrong order, wrong wallet.</li>
        <li><strong>The passphrase, if you used one.</strong> A phrase without its passphrase is a different wallet, one the phrase alone does not open.</li>
        <li><strong>The derivation path, if it is unusual.</strong> Standard paths are recoverable by any wallet. Custom paths are not.</li>
      </ul>
      <p>Do not back up: screenshots of the phrase, the phrase in cloud notes, the phrase in a chat. The words on paper, split across two physical locations, remain the baseline.</p>

      <h2>Verifying a Wallet Without a Network</h2>
      <p>Before moving real funds, prove the wallet holds the key. Sign a message and verify it. This works offline and never touches a chain:</p>
      <pre><code>import { Wallet, verifyMessage } from "ethers";

const wallet = new Wallet(account.privateKey);

const message = "I control this wallet";
const signature = await wallet.signMessage(message);

const recovered = verifyMessage(message, signature);
console.log(recovered === wallet.address); // true</code></pre>
      <p>If the recovered address matches, the software holds the key. Do the same test after restoring the phrase on a fresh device, before sending anything.</p>

      <h2>Common Failures</h2>
      <ul>
        <li><strong>12 vs 24 words:</strong> 24 words do not mean more security for the same entropy. Either is fine; both must be backed up fully.</li>
        <li><strong>Typing the phrase into a site:</strong> no legitimate service asks for the phrase. This rule alone filters most drainers.</li>
        <li><strong>Backing up after importing:</strong> the phrase you restored from must be rewritten and checked, not assumed.</li>
      </ul>
      <p>Self-custody is a chain of verified steps, not a checkbox. Generate, back up, restore, verify. Then test with a small transfer. The rest is repetition.</p>
    `,
  },
  {
    title: "A DAO Treasury Stack: Multisig, Timelock, and Snapshot",
    slug: "dao-treasury-multisig-timelock-snapshot",
    date: "2026-05-18",
    readingTime: "8 min read",
    summary:
      "The three pieces most DAO treasuries run on, why the delay matters, and a minimal timelock you can trace through end to end.",
    tags: ["DAO", "Governance", "Treasury", "Timelock"],
    content: `
      <h2>The Standard Stack</h2>
      <p>Most DAO treasuries run on three pieces that never touch each other directly:</p>
      <ul>
        <li><strong>Snapshot:</strong> off-chain voting. Weighted by token balance at a snapshot block. Costs nothing, binds nothing.</li>
        <li><strong>Timelock:</strong> the delay between a proposal being approved and its execution. Usually 24 to 72 hours.</li>
        <li><strong>Safe:</strong> the executor. A multisig that holds the funds and only moves them through the timelock.</li>
      </ul>
      <p>The design separates who decides from who signs. Votes happen off-chain. The multisig signs what the timelock schedules. The timelock delays what the multisig wants.</p>

      <h2>Why the Delay Exists</h2>
      <p>The delay exists so that members can react. If a proposal is malicious or plainly wrong, the window is the time to exit or to change the guard. A treasury without a delay is a treasury where a single vote round can drain everything before anyone notices.</p>
      <p>The delay is also a governance speed limit. It converts "we voted for this" into "we still agree with this after sleeping on it."</p>

      <h2>A Minimal Timelock</h2>
      <p>The real timelock used by many DAOs is OpenZeppelin's <code>TimelockController</code>. Its core loop is short:</p>
      <pre><code>// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract MinimalTimelock {
  uint256 public minDelay;
  mapping(bytes32 => uint256) public scheduled;

  constructor(uint256 _minDelay) {
    minDelay = _minDelay;
  }

  function schedule(address target, bytes calldata data) external {
    bytes32 id = keccak256(abi.encode(target, data, block.timestamp));
    scheduled[id] = block.timestamp + minDelay;
  }

  function execute(address target, bytes calldata data) external {
    bytes32 id = keccak256(abi.encode(target, data, block.timestamp));
    uint256 readyAt = scheduled[id];
    require(readyAt != 0, "not scheduled");
    require(block.timestamp &gt;= readyAt, "not ready");
    delete scheduled[id];
    (bool ok, ) = target.call(data);
    require(ok, "execution failed");
  }
}</code></pre>
      <p>Note what is missing: access control. In production the scheduling and execution functions are role-gated, and the timelock itself is usually a proposal target so governance can change its own parameters.</p>

      <h2>Wiring It Together</h2>
      <p>The flow for a real payout, from a script:</p>
      <pre><code>import { ethers } from "ethers";
import { Safe } from "@safe-global/protocol-kit";

// 1. Snapshot vote passes. The payout is now "approved".
// 2. The timelock schedules the transfer.
const timelock = new ethers.Contract(timelockAddress, timelockAbi, signer);
await timelock.schedule(
  treasuryAddress,
  timelock.interface.encodeFunctionData("executeTransfer", [recipient, amount])
);

// 3. After minDelay, the Safe signs the execution call.
const safe = await Safe.init({ provider, signer, safeAddress: treasuryAddress });
const tx = await safe.createTransaction({
  transactions: [{
    to: timelockAddress,
    data: timelock.interface.encodeFunctionData("execute", [
      timelockAddress,
      timelock.interface.encodeFunctionData("executeTransfer", [recipient, amount]),
    ]),
    value: "0",
  }],
});
const receipt = await safe.executeTransaction(tx);</code></pre>
      <p>Three signatures may be involved: the Safe threshold, plus whoever submits the timelock calls. That is fine. Friction is the product.</p>

      <h2>Failure Modes</h2>
      <ul>
        <li><strong>Expired proposals:</strong> most timelocks expire after a window (for example 14 days). A proposal past its deadline must be rescheduled, which is another governance vote. Budget for this.</li>
        <li><strong>Guard changes:</strong> if the multisig can bypass the timelock, the delay is theater. The standard setup gives the timelock the execution role and nothing else.</li>
        <li><strong>Spam:</strong> anyone can schedule arbitrary calls in some configurations. Rate-limit scheduling and require a whitelisted target set for small DAOs.</li>
      </ul>

      <h2>What a Small DAO Should Actually Run</h2>
      <p>For a treasury under $1M: a 2-of-3 Safe, a 48-hour timelock, Snapshot voting with a simple token gate. That covers accidental and malicious transfers without hiring anyone. Fancy governance modules earn their complexity only when the treasury size justifies it.</p>
    `,
  },
  {
    title: "Verify a Wallet Is Non-Custodial Before You Trust It",
    slug: "verify-wallet-is-non-custodial",
    date: "2026-04-09",
    readingTime: "6 min read",
    summary:
      "How to check that a wallet app cannot move your funds: contract verification, key location, offline signing, and a withdrawal test.",
    tags: ["Security", "Wallets", "Verification"],
    content: `
      <h2>Custody, Defined</h2>
      <p>A wallet is custodial if someone else can move the funds. That is the whole test. Not "does it have a nice recovery flow" but: can any party other than you sign a transfer?</p>
      <p>An app that stores your private key on its server is custodial even if it never touches the key. An app whose keys live on your device is non-custodial even if it is ugly. The distinction is where the key sleeps.</p>

      <h2>Four Checks</h2>
      <h3>1. Contract code is verified</h3>
      <p>For on-chain wallets (multisigs, vaults, smart wallets), the contract bytecode must match public source code. Compare it directly:</p>
      <pre><code>import { ethers } from "ethers";

const provider = new ethers.JsonRpcProvider("https://rpc.ankr.com/eth");
const onChain = await provider.getCode(walletContractAddress);
const verified = await fetch(\`https://api.etherscan.io/api?module=contract&action=getsourcecode&address=\${walletContractAddress}&apikey=\${API_KEY}\`)
  .then((r) => r.json());

if (onChain !== ethers.zeroPadValue("0x" + verified.result[0].bytecode.replace(/^0x/, ""), 32)) {
  console.log("bytecode does not match published source");
}</code></pre>
      <p>If the bytecode differs from the verified source, the deployed contract is not what you read. Stop there.</p>
      <h3>2. Keys never leave the device</h3>
      <p>Non-custodial wallets sign locally. You can test this: put the phone in airplane mode and sign a message. If signing works offline, the key is local. If it fails or requires a server, the key is elsewhere.</p>
      <h3>3. Sign and verify</h3>
      <p>Sign a message, then recover the signer. The recovered address must be the address you control. See the full walkthrough in my post on keys, seeds, and derivation paths.</p>
      <h3>4. Withdraw to a fresh address</h3>
      <p>Send a small amount to a wallet you created from a phrase you wrote down yourself. Then send it out. If the app can do this without your signature, custody has left the building.</p>

      <h2>What the Redact Build Did, and Did Not, Get Right</h2>
      <p>Redact, the privacy app I built for a Monad hackathon, applied these checks to itself. Keys are generated and stored client-side, the contract is verified, and signing happens in the browser. Duress mode lives in the client too, which means a forced phone unlock shows a decoy balance rather than a real one.</p>
      <p>The deposit flow did not complete. A submission-blocking SDK version mismatch between the relay package and the deployed contract ABI surfaced on the last day, and fixing it meant re-deploying the contract with a changed interface, which we could not do in the remaining hours. The submission documents this rather than claiming a clean end-to-end run.</p>
      <p>That failure is normal engineering. The checks above are not about which projects shipped cleanly. They are about whether the software you are about to trust can prove where it keeps your keys.</p>

      <h2>The Rule</h2>
      <p>A wallet you cannot verify is a wallet you do not control. Run the four checks on any new app before moving meaningful amounts. They take an afternoon and they are the difference between using a product and being used by one.</p>
    `,
  },
];

export function getBlogPostBySlug(slug: string): BlogPostData | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

export function getAllBlogSlugs(): string[] {
  return blogPosts.map((p) => p.slug);
}
