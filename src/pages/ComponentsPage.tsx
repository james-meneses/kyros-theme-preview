import { motion } from "motion/react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { transitions, variants } from "@/lib/motion";
import {
  Zap, AlertTriangle, Trash2, Download, Settings, Bell,
  Check, X, Info, Loader2, ArrowRight, Plus, ExternalLink,
} from "lucide-react";
import { toast, Toaster } from "sonner";

function Section({ title, tag, children }: { title: string; tag: string; children: React.ReactNode }) {
  return (
    <motion.section
      className="mb-16"
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={transitions.enter}
    >
      <p className="mb-2 text-xs font-mono uppercase tracking-[0.2em]" style={{ color: "var(--primary)" }}>
        // {tag}
      </p>
      <h2 className="mb-8 text-2xl font-bold" style={{ fontFamily: "var(--font-heading)" }}>
        {title}
      </h2>
      {children}
    </motion.section>
  );
}

export function ComponentsPage() {
  const [progress, setProgress] = useState(45);
  const [switchOn, setSwitchOn] = useState(true);

  return (
    <TooltipProvider>
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: "var(--bg-card)",
            border: "1px solid var(--border)",
            color: "var(--foreground)",
          },
        }}
      />
      <div className="mx-auto max-w-6xl px-6 py-16">
        <motion.div {...variants.slideUp}>
          <p className="mb-2 text-xs font-mono uppercase tracking-[0.3em]" style={{ color: "var(--primary)" }}>
            [ COMPONENT_SHOWCASE ]
          </p>
          <h1 className="mb-4 text-4xl font-bold" style={{ fontFamily: "var(--font-heading)" }}>
            Tactical Neon <span style={{ color: "var(--primary)" }}>Components</span>
          </h1>
          <p className="mb-16 text-lg" style={{ color: "var(--foreground-muted)" }}>
            Every component from the design system, rendered with the active theme.
          </p>
        </motion.div>

        {/* ── Buttons ── */}
        <Section title="Buttons" tag="BUTTONS">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <CardContent>
                <p className="text-xs font-mono mb-4" style={{ color: "var(--foreground-muted)" }}>VARIANTS</p>
                <div className="flex flex-wrap gap-3">
                  <Button>Primary</Button>
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="outline">Outline</Button>
                  <Button variant="ghost">Ghost</Button>
                  <Button variant="destructive">
                    <Trash2 className="h-4 w-4 mr-1.5" />
                    Destructive
                  </Button>
                  <Button variant="link">Link</Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent>
                <p className="text-xs font-mono mb-4" style={{ color: "var(--foreground-muted)" }}>SIZES</p>
                <div className="flex flex-wrap items-center gap-3">
                  <Button size="sm">Small</Button>
                  <Button size="default">Default</Button>
                  <Button size="lg">Large</Button>
                  <Button size="icon"><Zap className="h-4 w-4" /></Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent>
                <p className="text-xs font-mono mb-4" style={{ color: "var(--foreground-muted)" }}>WITH ICONS</p>
                <div className="flex flex-wrap gap-3">
                  <Button><Download className="h-4 w-4 mr-1.5" />Download</Button>
                  <Button variant="outline"><Settings className="h-4 w-4 mr-1.5" />Settings</Button>
                  <Button variant="secondary"><Bell className="h-4 w-4 mr-1.5" />Notifications</Button>
                  <Button>Next <ArrowRight className="h-4 w-4 ml-1.5" /></Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent>
                <p className="text-xs font-mono mb-4" style={{ color: "var(--foreground-muted)" }}>STATES</p>
                <div className="flex flex-wrap gap-3">
                  <Button disabled>Disabled</Button>
                  <Button>
                    <Loader2 className="h-4 w-4 mr-1.5 animate-spin" />
                    Loading...
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </Section>

        {/* ── Badges ── */}
        <Section title="Badges" tag="BADGES">
          <Card>
            <CardContent>
              <div className="flex flex-wrap gap-3">
                <Badge>[DEFAULT]</Badge>
                <Badge variant="secondary">[SECONDARY]</Badge>
                <Badge variant="outline">[OUTLINE]</Badge>
                <Badge variant="destructive">[DESTRUCTIVE]</Badge>
                <Badge className="gap-1.5">
                  <span className="inline-block h-2 w-2 rounded-full bg-green-500" style={{ boxShadow: "0 0 6px #22C55E80" }} />
                  ACTIVE
                </Badge>
                <Badge variant="secondary" className="gap-1.5">
                  <span className="inline-block h-2 w-2 rounded-full bg-yellow-500" />
                  REVIEWING
                </Badge>
                <Badge variant="outline" className="gap-1.5">
                  <span className="inline-block h-2 w-2 rounded-full bg-gray-500" />
                  IDLE
                </Badge>
                <Badge variant="destructive" className="gap-1.5">
                  <span className="inline-block h-2 w-2 rounded-full bg-red-400" />
                  ERROR
                </Badge>
              </div>
            </CardContent>
          </Card>
        </Section>

        {/* ── Form Inputs ── */}
        <Section title="Form Inputs" tag="INPUTS">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardContent className="space-y-4">
                <p className="text-xs font-mono" style={{ color: "var(--foreground-muted)" }}>TEXT INPUTS</p>
                <div className="space-y-2">
                  <Label htmlFor="default-input">Default</Label>
                  <Input id="default-input" placeholder="Enter task description..." />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="disabled-input">Disabled</Label>
                  <Input id="disabled-input" disabled placeholder="Disabled input" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="error-input" className="text-red-500">With Error</Label>
                  <Input
                    id="error-input"
                    className="border-red-500 focus-visible:ring-red-500"
                    defaultValue="Invalid value"
                  />
                  <p className="text-xs text-red-500 font-mono">[ERROR] Field is required</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="space-y-4">
                <p className="text-xs font-mono" style={{ color: "var(--foreground-muted)" }}>CONTROLS</p>
                <div className="flex items-center gap-3">
                  <Checkbox id="check1" defaultChecked />
                  <Label htmlFor="check1">Enable auto-dispatch</Label>
                </div>
                <div className="flex items-center gap-3">
                  <Checkbox id="check2" />
                  <Label htmlFor="check2">Require architect review</Label>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <Label htmlFor="switch1">Real-time updates</Label>
                  <Switch id="switch1" checked={switchOn} onCheckedChange={setSwitchOn} />
                </div>
                <Separator />
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>Sprint progress</Label>
                    <span className="text-xs font-mono" style={{ color: "var(--primary)" }}>{progress}%</span>
                  </div>
                  <Progress value={progress} />
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={() => setProgress(Math.max(0, progress - 10))}>−10</Button>
                    <Button size="sm" variant="outline" onClick={() => setProgress(Math.min(100, progress + 10))}>+10</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </Section>

        {/* ── Tabs ── */}
        <Section title="Tabs" tag="TABS">
          <Card>
            <CardContent>
              <Tabs defaultValue="overview">
                <TabsList>
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="agents">Agents</TabsTrigger>
                  <TabsTrigger value="metrics">Metrics</TabsTrigger>
                  <TabsTrigger value="settings">Settings</TabsTrigger>
                </TabsList>
                <TabsContent value="overview" className="mt-4">
                  <p className="text-sm" style={{ color: "var(--foreground-muted)" }}>
                    Your engineering team is running at 94% sprint velocity with 21 active agents across 5 teams.
                    All systems nominal. Queue depth is low.
                  </p>
                </TabsContent>
                <TabsContent value="agents" className="mt-4">
                  <p className="text-sm" style={{ color: "var(--foreground-muted)" }}>
                    8 agents active, 2 in review, 11 idle. Current sprint: Phase 4.25 System Reliability.
                  </p>
                </TabsContent>
                <TabsContent value="metrics" className="mt-4">
                  <p className="text-sm" style={{ color: "var(--foreground-muted)" }}>
                    Average dispatch cost: $0.079. Token efficiency: 89%. PR merge time: 12 min average.
                  </p>
                </TabsContent>
                <TabsContent value="settings" className="mt-4">
                  <p className="text-sm" style={{ color: "var(--foreground-muted)" }}>
                    Max concurrency: 5. Review matrix: enabled. Auto-retry: exponential backoff.
                  </p>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </Section>

        {/* ── Dialog & Toast ── */}
        <Section title="Dialogs & Toasts" tag="OVERLAYS">
          <div className="flex flex-wrap gap-4">
            <Dialog>
              <DialogTrigger render={<Button />}>
                <Plus className="h-4 w-4 mr-1.5" />New Task
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create New Task</DialogTitle>
                  <DialogDescription>
                    Dispatch a new task to the agent fleet. The system will auto-assign based on skill match.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="task-desc">Description</Label>
                    <Input id="task-desc" placeholder="What needs to be done?" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="task-priority">Priority</Label>
                    <select
                      id="task-priority"
                      className="w-full h-10 px-3 text-sm border rounded-md"
                      style={{
                        backgroundColor: "var(--bg-secondary)",
                        borderColor: "var(--border)",
                        color: "var(--foreground)",
                        borderRadius: "var(--radius)",
                      }}
                    >
                      <option>P0_CRITICAL</option>
                      <option>P1_HIGH</option>
                      <option>P2_STANDARD</option>
                    </select>
                  </div>
                </div>
                <DialogFooter>
                  <DialogClose render={<Button variant="outline" />}>
                    Cancel
                  </DialogClose>
                  <Button onClick={() => toast.success("Task dispatched to Akira (backend_dev)")}>
                    <Zap className="h-4 w-4 mr-1.5" />
                    Dispatch
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <Button
              variant="outline"
              onClick={() => toast("Task T-1042 completed by Akira", { description: "OAuth2 token refresh flow ready for review" })}
            >
              <Info className="h-4 w-4 mr-1.5" />
              Info Toast
            </Button>

            <Button
              variant="outline"
              onClick={() => toast.success("Sprint #12 velocity: 94%", { description: "All 8 tasks completed within estimate" })}
            >
              <Check className="h-4 w-4 mr-1.5" />
              Success Toast
            </Button>

            <Button
              variant="outline"
              onClick={() => toast.warning("Queue depth exceeds threshold", { description: "3 tasks waiting, consider scaling agents" })}
            >
              <AlertTriangle className="h-4 w-4 mr-1.5" />
              Warning Toast
            </Button>

            <Button
              variant="outline"
              onClick={() => toast.error("Deploy failed: health-check timeout", { description: "Ada is investigating staging environment" })}
            >
              <X className="h-4 w-4 mr-1.5" />
              Error Toast
            </Button>
          </div>
        </Section>

        {/* ── Tooltips ── */}
        <Section title="Tooltips" tag="TOOLTIPS">
          <Card>
            <CardContent>
              <div className="flex flex-wrap gap-4">
                <Tooltip>
                  <TooltipTrigger render={<Button variant="outline" />}>
                    <Zap className="h-4 w-4 mr-1.5" />Dispatch
                  </TooltipTrigger>
                  <TooltipContent>Send task to the next available agent</TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger render={<Button variant="outline" size="icon" />}>
                    <ExternalLink className="h-4 w-4" />
                  </TooltipTrigger>
                  <TooltipContent>Open in new window</TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger render={<span className="cursor-help" />}>
                    <Badge>21 AGENTS</Badge>
                  </TooltipTrigger>
                  <TooltipContent>5 teams: Core, Frontend, Backend, QA, Design</TooltipContent>
                </Tooltip>
              </div>
            </CardContent>
          </Card>
        </Section>

        {/* ── Cards ── */}
        <Section title="Cards" tag="CARDS">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="group">
              <CardContent>
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-lg"
                    style={{ backgroundColor: "#60A5FA20", color: "#60A5FA" }}
                  >
                    A
                  </div>
                  <div>
                    <div className="font-semibold" style={{ fontFamily: "var(--font-heading)" }}>Akira</div>
                    <div className="text-xs font-mono" style={{ color: "var(--foreground-muted)" }}>BACKEND_DEV</div>
                  </div>
                </div>
                <p className="text-sm mb-3" style={{ color: "var(--foreground-muted)" }}>
                  Implementing OAuth2 token refresh flow with Redis caching.
                </p>
                <div className="flex items-center justify-between">
                  <Badge className="gap-1.5">
                    <span className="inline-block h-2 w-2 rounded-full bg-green-500" style={{ boxShadow: "0 0 6px #22C55E80" }} />
                    ACTIVE
                  </Badge>
                  <span className="text-xs font-mono" style={{ color: "var(--foreground-muted)" }}>14,820 tokens</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent>
                <p className="text-xs font-mono mb-2" style={{ color: "var(--primary)" }}>SPRINT_VELOCITY</p>
                <div className="text-4xl font-bold mb-2" style={{ color: "var(--primary)", fontFamily: "var(--font-heading)" }}>94%</div>
                <Progress value={94} className="mb-2" />
                <p className="text-xs" style={{ color: "var(--foreground-muted)" }}>8/8 tasks completed in Sprint #12</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent>
                <p className="text-xs font-mono mb-2" style={{ color: "var(--primary)" }}>COST_EFFICIENCY</p>
                <div className="text-4xl font-bold mb-2" style={{ color: "var(--primary)", fontFamily: "var(--font-heading)" }}>$0.079</div>
                <p className="text-xs mb-2" style={{ color: "var(--foreground-muted)" }}>Average cost per dispatch</p>
                <div className="flex gap-1">
                  <Badge variant="outline">Claude Sonnet</Badge>
                  <Badge variant="outline">6.9K tokens</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </Section>
      </div>
    </TooltipProvider>
  );
}
