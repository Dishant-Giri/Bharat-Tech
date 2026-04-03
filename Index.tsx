import { Shield } from "lucide-react";
import ShieldStatus from "@/components/ShieldStatus";
import UrlScanner from "@/components/UrlScanner";
import ThreatLog from "@/components/ThreatLog";
import ProtectionModules from "@/components/ProtectionModules";
import StatsBar from "@/components/StatsBar";

const Index = () => (
  <div className="min-h-screen bg-background text-foreground">
    {/* Header */}
    <header className="border-b border-border bg-card/80 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center gap-3 px-6 py-4">
        <Shield className="h-6 w-6 text-primary" />
        <h1 className="text-lg font-bold tracking-tight">PhishGuard</h1>
        <span className="ml-1 rounded-full bg-primary/15 px-2 py-0.5 font-mono text-xs text-primary">v2.1</span>
        <div className="ml-auto flex items-center gap-2">
          <span className="h-2 w-2 animate-pulse-glow rounded-full bg-safe" />
          <span className="text-xs text-muted-foreground">Real-time protection active</span>
        </div>
      </div>
    </header>

    {/* Main */}
    <main className="mx-auto max-w-7xl space-y-6 px-6 py-8">
      <StatsBar />
      <div className="grid gap-6 lg:grid-cols-3">
        <ShieldStatus status="protected" threatsBlocked={142} />
        <div className="space-y-6 lg:col-span-2">
          <UrlScanner />
          <ProtectionModules />
        </div>
      </div>
      <ThreatLog />
    </main>
  </div>
);

export default Index;
