import Image from "next/image";

export function BCLogo({ className }: { className?: string }) {
  return (
    <span className="flex items-center gap-2.5">
      <Image
        src="/bc-logo.png"
        alt="British Columbia"
        width={44}
        height={32}
        className={className}
      />
      <span className="flex flex-col leading-tight">
        <span className="text-white font-bold text-base tracking-tight">
          ScreenBC
        </span>
        <span className="text-white/70 text-[10px] font-normal">
          Preventive Health Screening
        </span>
      </span>
    </span>
  );
}
