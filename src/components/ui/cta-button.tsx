import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

/**
 * Shared marketing call-to-action button. Renders an <a> when `href` is given,
 * otherwise a <button>. Centralizes the primary/secondary styles that were
 * previously hand-copied across ~15 CTAs. Override width/padding via className
 * (tailwind-merge resolves conflicts).
 */
const VARIANTS = {
  primary: "bg-brand text-white hover:bg-brand-hover hover:-translate-y-px",
  secondary:
    "bg-transparent border-[1.5px] border-neutral-900 text-neutral-900 hover:bg-neutral-900 hover:text-white",
} as const;

const BASE =
  "inline-flex items-center justify-center gap-2 font-semibold text-base px-8 py-3 rounded transition-all";

type Variant = keyof typeof VARIANTS;

type AnchorProps = { href: string } & ComponentPropsWithoutRef<"a">;
type ButtonProps = { href?: undefined } & ComponentPropsWithoutRef<"button">;

type CtaButtonProps = { variant?: Variant; className?: string } & (
  | AnchorProps
  | ButtonProps
);

export function CtaButton({
  variant = "primary",
  className,
  ...props
}: CtaButtonProps) {
  const classes = cn(BASE, VARIANTS[variant], className);

  if (props.href !== undefined) {
    return <a className={classes} {...(props as AnchorProps)} />;
  }
  return (
    <button type="button" className={cn(classes, "cursor-pointer")} {...(props as ButtonProps)} />
  );
}
