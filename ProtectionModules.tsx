import { useState } from "react";
import { Mail, Globe, MessageSquare, Wifi } from "lucide-react";
import { motion } from "framer-motion";

const modules = [
  { id: "email", label: "Email Guard", desc: "Scan incoming emails for phishing links", icon: Mail, defaultOn: true },
  { id: "web", label: "Web Shield", desc: "Block malicious websites in real-time", icon: Globe, defaultOn: true },
  { id: "sms", label: "SMS Filter", desc: "Detect smishing attacks via text", icon: MessageSquare, defaultOn: true },
  { id: "dns", label: "DNS Protection", desc: "Prevent DNS spoofing & hijacking", icon: Wifi, defaultOn: false },
];

const ProtectionModules = () => {
  const [states, setStates] = useState<Record<string, boolean>>(
    Object.fromEntries(modules.map((m) => [m.id, m.defaultOn]))
  );

  const toggle = (id: string) => setStates((s) => ({ ...s, [id]: !s[id] }));

  return (
    <div className="rounded-2xl border border-border bg-card p-6">
      <h3 className="mb-4 font-semibold text-card-foreground">Protection Modules</h3>
      <div className="space-y-3">
        {modules.map((m, i) => {
          const on = states[m.id];
          return (
            <motion.div
              key={m.id}
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: i * 0.07 }}
              className="flex items-center gap-3 rounded-lg border border-border bg-muted/50 p-3"
            >
              <m.icon className={`h-5 w-5 shrink-0 ${on ? "text-primary" : "text-muted-foreground"}`} />
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">{m.label}</p>
                <p className="text-xs text-muted-foreground">{m.desc}</p>
              </div>
              <button
                onClick={() => toggle(m.id)}
                className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${on ? "bg-primary" : "bg-muted-foreground/30"}`}
              >
                <motion.div
                  animate={{ x: on ? 20 : 2 }}
                  className="absolute top-1 h-4 w-4 rounded-full bg-primary-foreground shadow"
                />
              </button>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default ProtectionModules;
