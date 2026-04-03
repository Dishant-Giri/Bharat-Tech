import { motion } from "framer-motion";
import { ShieldCheck, Mail, Globe, AlertTriangle } from "lucide-react";

const stats = [
  { label: "Emails Scanned", value: "12,847", icon: Mail, color: "text-info" },
  { label: "URLs Checked", value: "3,291", icon: Globe, color: "text-primary" },
  { label: "Threats Blocked", value: "142", icon: ShieldCheck, color: "text-safe" },
  { label: "Warnings", value: "23", icon: AlertTriangle, color: "text-warning" },
];

const StatsBar = () => (
  <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
    {stats.map((s, i) => (
      <motion.div
        key={s.label}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: i * 0.1 }}
        className="rounded-xl border border-border bg-card p-4"
      >
        <div className="flex items-center gap-2">
          <s.icon className={`h-4 w-4 ${s.color}`} />
          <span className="text-xs text-muted-foreground">{s.label}</span>
        </div>
        <p className="mt-1 font-mono text-2xl font-bold text-foreground">{s.value}</p>
      </motion.div>
    ))}
  </div>
);

export default StatsBar;
