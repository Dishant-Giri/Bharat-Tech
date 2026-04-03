import { motion } from "framer-motion";
import { Mail, Globe, MessageSquare, ShieldX } from "lucide-react";

const threats = [
  { id: 1, type: "email", source: "support@paypa1-secure.com", action: "Blocked", time: "2 min ago", icon: Mail },
  { id: 2, type: "url", source: "amaz0n-verify.tk/login", action: "Blocked", time: "8 min ago", icon: Globe },
  { id: 3, type: "sms", source: "+1-555-0142 (spoofed)", action: "Flagged", time: "23 min ago", icon: MessageSquare },
  { id: 4, type: "email", source: "hr@micr0soft-update.xyz", action: "Quarantined", time: "1 hr ago", icon: Mail },
  { id: 5, type: "url", source: "g00gle-security.com/verify", action: "Blocked", time: "2 hr ago", icon: Globe },
];

const ThreatLog = () => (
  <div className="rounded-2xl border border-border bg-card p-6">
    <div className="mb-4 flex items-center justify-between">
      <h3 className="font-semibold text-card-foreground">Recent Threats</h3>
      <span className="flex items-center gap-1.5 rounded-full bg-danger/15 px-3 py-1 text-xs font-medium text-danger">
        <ShieldX className="h-3 w-3" /> {threats.length} intercepted
      </span>
    </div>
    <div className="space-y-2">
      {threats.map((t, i) => (
        <motion.div
          key={t.id}
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: i * 0.08 }}
          className="flex items-center gap-3 rounded-lg border border-border bg-muted/50 p-3"
        >
          <t.icon className="h-4 w-4 shrink-0 text-muted-foreground" />
          <div className="min-w-0 flex-1">
            <p className="truncate font-mono text-xs text-foreground">{t.source}</p>
            <p className="text-xs text-muted-foreground">{t.time}</p>
          </div>
          <span className="shrink-0 rounded-full bg-danger/15 px-2.5 py-0.5 text-xs font-medium text-danger">
            {t.action}
          </span>
        </motion.div>
      ))}
    </div>
  </div>
);

export default ThreatLog;
