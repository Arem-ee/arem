"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Eye, Users, Clock, Download, ArrowUp, ArrowDown, TrendingUp } from "lucide-react";

import { Container } from "@/components/ui/container";
import { PageLayout } from "@/components/layout/page-layout";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/animations";

interface MetricCardProps {
  label: string;
  value: string;
  change: number;
  trend: "up" | "down";
  icon: React.ReactNode;
  delay?: number;
}

function MetricCard({ label, value, change, trend, icon, delay = 0 }: MetricCardProps) {
  return (
    <motion.div
      className="rounded-xl border bg-card p-6 shadow-sm"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
    >
      <div className="mb-4 flex items-center justify-between">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary text-secondary-foreground">
          {icon}
        </div>
        <div
          className={`flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${
            trend === "up"
              ? "bg-emerald-500/10 text-emerald-500"
              : "bg-destructive/10 text-destructive"
          }`}
        >
          {trend === "up" ? (
            <ArrowUp className="h-3 w-3" />
          ) : (
            <ArrowDown className="h-3 w-3" />
          )}
          {Math.abs(change)}%
        </div>
      </div>
      <p className="text-2xl font-bold">{value}</p>
      <p className="mt-1 text-sm text-muted-foreground">{label}</p>
    </motion.div>
  );
}

const metrics = [
  { label: "Portfolio Views", value: "12,847", change: 23.5, trend: "up" as const, icon: <Eye className="h-5 w-5" /> },
  { label: "Project Clicks", value: "3,421", change: 12.3, trend: "up" as const, icon: <TrendingUp className="h-5 w-5" /> },
  { label: "Resume Downloads", value: "892", change: 8.1, trend: "up" as const, icon: <Download className="h-5 w-5" /> },
  { label: "Contact Messages", value: "156", change: 3.2, trend: "down" as const, icon: <Users className="h-5 w-5" /> },
  { label: "Avg. Session", value: "4m 32s", change: 15.7, trend: "up" as const, icon: <Clock className="h-5 w-5" /> },
  { label: "Bounce Rate", value: "32.1%", change: 5.4, trend: "down" as const, icon: <ArrowDown className="h-5 w-5" /> },
];

const recentActivity = [
  { action: "Project viewed", detail: "Analytics Dashboard", time: "2 minutes ago" },
  { action: "Resume downloaded", detail: "PDF version", time: "15 minutes ago" },
  { action: "Contact form submitted", detail: "From sarah@example.com", time: "1 hour ago" },
  { action: "Blog post read", detail: "Building Resilient Frontend Architecture", time: "3 hours ago" },
  { action: "Project viewed", detail: "Design System", time: "5 hours ago" },
];

const pageViews = [
  { page: "/", views: 4821 },
  { page: "/projects/*", views: 3156 },
  { page: "/blog/*", views: 2540 },
  { page: "/resume", views: 1892 },
  { page: "/dashboard", views: 438 },
];

function DashboardPage() {
  return (
    <PageLayout>
      <section className="border-b py-16 md:py-24">
        <Container size="xl">
          <FadeIn>
            <h1 className="mb-2 text-3xl font-bold tracking-tight md:text-4xl">Dashboard</h1>
            <p className="text-muted-foreground">Portfolio analytics and activity overview</p>
          </FadeIn>
        </Container>
      </section>

      <section className="py-16 md:py-24">
        <Container size="xl">
          <div className="mb-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
            {metrics.map((metric, i) => (
              <MetricCard key={metric.label} {...metric} delay={i * 0.06} />
            ))}
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            <StaggerContainer className="space-y-4" staggerDelay={0.06}>
              <StaggerItem>
                <h2 className="mb-4 text-xl font-semibold">Recent Activity</h2>
              </StaggerItem>
              {recentActivity.map((activity, i) => (
                <StaggerItem key={i}>
                  <motion.div
                    className="flex items-center justify-between rounded-lg border bg-card px-5 py-3"
                    whileHover={{ x: 4 }}
                    transition={{ duration: 0.15 }}
                  >
                    <div>
                      <p className="text-sm font-medium">{activity.action}</p>
                      <p className="text-xs text-muted-foreground">{activity.detail}</p>
                    </div>
                    <span className="text-xs text-muted-foreground">{activity.time}</span>
                  </motion.div>
                </StaggerItem>
              ))}
            </StaggerContainer>

            <StaggerContainer className="space-y-4" staggerDelay={0.06}>
              <StaggerItem>
                <h2 className="mb-4 text-xl font-semibold">Page Views</h2>
              </StaggerItem>
              {pageViews.map((pv, i) => (
                <StaggerItem key={i}>
                  <motion.div
                    className="rounded-lg border bg-card px-5 py-3"
                    whileHover={{ x: 4 }}
                    transition={{ duration: 0.15 }}
                  >
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-sm font-medium">{pv.page}</span>
                      <span className="text-sm font-semibold">{pv.views.toLocaleString()}</span>
                    </div>
                    <div className="h-1.5 overflow-hidden rounded-full bg-secondary">
                      <motion.div
                        className="h-full rounded-full bg-foreground"
                        initial={{ width: 0 }}
                        animate={{ width: `${(pv.views / 5000) * 100}%` }}
                        transition={{ duration: 1, delay: i * 0.1, ease: "easeOut" }}
                      />
                    </div>
                  </motion.div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </Container>
      </section>
    </PageLayout>
  );
}

export default DashboardPage;
