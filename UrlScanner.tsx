import { useState } from "react";
import { Search, AlertTriangle, CheckCircle2, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type ScanResult = "safe" | "suspicious" | "phishing" | null;

const suspiciousPatterns = [
  /paypa[l1]/i, /amaz[o0]n/i, /g[o0]{2}gle/i, /micr[o0]soft/i,
  /bank/i, /login.*verify/i, /secure.*update/i, /\.tk$/i, /\.xyz/i,
  /bit\.ly/i, /tinyurl/i, /@.*@/,
];

const UrlScanner = () => {
  const [url, setUrl] = useState("");
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState<ScanResult>(null);

  const scanUrl = () => {
    if (!url.trim()) return;
    setScanning(true);
    setResult(null);
    setTimeout(() => {
      const isSuspicious = suspiciousPatterns.some((p) => p.test(url));
      setResult(isSuspicious ? "phishing" : "safe");
      setScanning(false);
    }, 1500);
  };

  return (
    <div className="rounded-2xl border border-border bg-card p-6">
      <h3 className="mb-4 font-semibold text-card-foreground">URL Scanner</h3>
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={url}
            onChange={(e) => { setUrl(e.target.value); setResult(null); }}
            onKeyDown={(e) => e.key === "Enter" && scanUrl()}
            placeholder="Paste a suspicious URL to scan..."
            className="w-full rounded-lg border border-border bg-muted py-2.5 pl-10 pr-4 font-mono text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>
        <button
          onClick={scanUrl}
          disabled={scanning || !url.trim()}
          className="rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition hover:brightness-110 disabled:opacity-50"
        >
          {scanning ? <Loader2 className="h-4 w-4 animate-spin" /> : "Scan"}
        </button>
      </div>
      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="mt-4 overflow-hidden"
          >
            <div className={`flex items-center gap-3 rounded-lg border p-4 ${
              result === "safe"
                ? "border-safe/30 bg-safe/10 text-safe"
                : "border-danger/30 bg-danger/10 text-danger"
            }`}>
              {result === "safe" ? <CheckCircle2 className="h-5 w-5" /> : <AlertTriangle className="h-5 w-5" />}
              <div>
                <p className="font-semibold">{result === "safe" ? "URL appears safe" : "⚠ Phishing detected!"}</p>
                <p className="text-xs opacity-80 font-mono">
                  {result === "safe" ? "No malicious patterns found." : "This URL matches known phishing patterns. Do NOT enter credentials."}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UrlScanner;
