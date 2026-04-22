import { cn } from "@/lib/utils";

type BadgeVariant = "gold" | "success" | "danger" | "muted";

interface BadgeProps {
  variant: BadgeVariant;
  children: React.ReactNode;
  className?: string;
}

const variantClasses: Record<BadgeVariant, string> = {
  gold: "bg-gold/15 text-gold border-gold/40",
  success: "bg-success/15 text-success border-success/30",
  danger: "bg-destructive/15 text-destructive border-destructive/30",
  muted: "bg-muted text-muted-foreground border-border",
};

export default function Badge({ variant, children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex px-2.5 py-1 rounded-full text-xs border",
        variantClasses[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
