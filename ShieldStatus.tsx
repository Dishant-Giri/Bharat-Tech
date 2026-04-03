import { Shield, ShieldCheck, ShieldAlert } from "lucide-react";
import { motion } from "framer-motion";

interface ShieldStatusProps {
  status: "protected" | "warning" | "danger";
  threatsBlocked: number;
}

const statusConfig = {
  protected: {
    icon: ShieldCheck,
    label: "System Protected",
    color: "text-safe",
    glow: "shadow-[var(--glow-primary)]",
    ring: "ring-safe/30",
  },
  warning: {
    icon: ShieldAlert,
    label: "Potential Threats",
    color: "text-warning",
    glow: "shadow-[0_0_20px_hsl(38_92%_50%/0.3)]",
    ring: "ring-warning/30",
  },
  danger: {
    icon: ShieldAlert,
    label: "Threats Detected",
    color: "text-danger",
    glow: "shadow-[var(--glow-danger)]",
    ring: "ring-danger/30",
  },
};

const ShieldStatus = ({ status, threatsBlocked }: ShieldStatusProps) => {
  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className={`relative flex flex-col items-center justify-center rounded-2xl border border-border bg-card p-8 ${config.glow}`}
    >
      <motion.div
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
        className={`mb-4 rounded-full border-2 ${config.ring} border-current p-6 ${config.color}`}
      >
        <Icon className="h-16 w-16" />
      </motion.div>
      <h2 className={`text-xl font-bold ${config.color}`}>{config.label}</h2>
      <p className="mt-2 font-mono text-sm text-muted-foreground">
        <span className="text-primary font-semibold">{threatsBlocked.toLocaleString()}</span> threats blocked today
      </p>
    </motion.div>
  );
};

export default ShieldStatus;
