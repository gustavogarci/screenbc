"use client";

import Link from "next/link";
import type { ScreeningStatus as Status } from "@/lib/types";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Props {
  status: Status;
}

export function ScreeningStatus({ status }: Props) {
  const configs: Record<
    Status,
    { bg: string; border: string; title: string; description: string; href?: string; cta?: string }
  > = {
    due: {
      bg: "bg-bc-gold-light",
      border: "border-status-yellow/30",
      title: "You\u2019re due for preventive screening",
      description:
        "You\u2019re due for preventive screening for diabetes and cholesterol.",
      href: "/portal/requisition",
      cta: "Get Your Lab Requisition \u2192",
    },
    "awaiting-results": {
      bg: "bg-bc-blue-light",
      border: "border-bc-link/20",
      title: "Awaiting lab results",
      description:
        "Your lab requisition has been generated. Visit any LifeLabs to complete your blood work. We\u2019ll notify you when results are ready.",
    },
    "results-ready": {
      bg: "bg-status-yellow-bg",
      border: "border-status-yellow/30",
      title: "Your screening results are ready",
      description: "Your screening results are ready for review.",
      href: "/portal/results",
      cta: "View Your Results \u2192",
    },
    "up-to-date": {
      bg: "bg-status-green-bg",
      border: "border-status-green/30",
      title: "You\u2019re up to date",
      description:
        "You\u2019re up to date. We\u2019ll send you a reminder when your next screening is recommended.",
    },
  };

  const config = configs[status];

  return (
    <div className={`${config.bg} border ${config.border} rounded-md p-5`}>
      <h3 className="font-semibold text-text-primary text-sm">{config.title}</h3>
      <p className="text-sm text-text-secondary mt-1">{config.description}</p>
      {config.href && config.cta && (
        <Link
          href={config.href}
          className={cn(
            buttonVariants({ size: "sm" }),
            "mt-4 bg-bc-blue hover:bg-bc-blue-hover"
          )}
        >
          {config.cta}
        </Link>
      )}
    </div>
  );
}
