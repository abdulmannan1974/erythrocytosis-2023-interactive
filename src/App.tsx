import { useState } from "react";
import {
  BookOpen, FlaskConical, Dna, Heart, Pill, Map, Star,
  ExternalLink, AlertTriangle, CheckCircle, Info, AlertCircle,
  Activity, Beaker, ArrowRight,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";

/* ── tiny cn helper ── */
function cn(...c: (string | undefined | false)[]) { return c.filter(Boolean).join(" "); }

/* ── CALLOUT (wraps shadcn Alert) ── */
type CalloutType = "info" | "warning" | "danger" | "success" | "navy";
function Callout({ type = "info", title, children }: { type?: CalloutType; title: string; children: React.ReactNode }) {
  const cfg: Record<CalloutType, { cls: string; icon: React.ReactNode }> = {
    info:    { cls: "border-blue-400 bg-blue-50 text-blue-900",     icon: <Info size={16} className="text-blue-500" /> },
    warning: { cls: "border-amber-400 bg-amber-50 text-amber-900",  icon: <AlertTriangle size={16} className="text-amber-500" /> },
    danger:  { cls: "border-red-400 bg-red-50 text-red-900",        icon: <AlertCircle size={16} className="text-red-500" /> },
    success: { cls: "border-green-400 bg-green-50 text-green-900",  icon: <CheckCircle size={16} className="text-green-600" /> },
    navy:    { cls: "border-indigo-500 bg-indigo-50 text-indigo-900", icon: <BookOpen size={16} className="text-indigo-600" /> },
  };
  const { cls, icon } = cfg[type];
  return (
    <Alert className={cn("border-l-4 rounded-r-lg my-3", cls)}>
      <AlertTitle className="flex items-center gap-2 font-semibold text-sm">
        {icon} {title}
      </AlertTitle>
      <AlertDescription className="text-sm leading-relaxed mt-1">{children}</AlertDescription>
    </Alert>
  );
}

/* ── STAT CARD (shadcn Card) ── */
function StatCard({ num, label, accent = "border-t-slate-800" }: { num: string; label: string; accent?: string }) {
  return (
    <Card className={cn("border-t-4 text-center shadow-sm", accent)}>
      <CardContent className="pt-4 pb-3">
        <div className="text-2xl font-extrabold text-slate-800">{num}</div>
        <div className="text-xs text-muted-foreground mt-1 leading-tight">{label}</div>
      </CardContent>
    </Card>
  );
}

/* ── PATHWAY CARD (shadcn Accordion) ── */
function PathwayCard({ value, icon, title, steps, callout }: {
  value: string; icon: React.ReactNode; title: string; steps: string[]; callout?: string;
}) {
  return (
    <AccordionItem value={value} className="border border-teal-600 rounded-xl overflow-hidden mb-2">
      <AccordionTrigger className="bg-teal-700 text-white px-4 py-3 font-semibold text-sm hover:bg-teal-800 hover:no-underline [&>svg]:text-white">
        <span className="flex items-center gap-2">{icon}{title}</span>
      </AccordionTrigger>
      <AccordionContent className="p-4 bg-white space-y-2 pb-4">
        {steps.map((s, i) => (
          <div key={i} className="flex gap-3 items-start">
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-slate-800 text-white text-xs flex items-center justify-center font-bold mt-0.5">{i + 1}</span>
            <p className="text-sm text-gray-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: s }} />
          </div>
        ))}
        {callout && <Callout type="warning" title="Evidence Note">{callout}</Callout>}
      </AccordionContent>
    </AccordionItem>
  );
}

/* ════════════════════════════════════════════════════════ APP ════════════ */
export default function App() {
  const [activeTab, setActiveTab] = useState("overview");
  return (
    <div className="min-h-screen bg-gray-50 font-sans">

      {/* ── HERO ── */}
      <header className="bg-gradient-to-br from-slate-800 via-slate-700 to-teal-700 text-white px-6 py-10">
        <div className="max-w-5xl mx-auto">
          {/* Blood Doctor branding */}
          <div className="flex items-center gap-2 mb-5">
            <span style={{
              fontSize: "1.35rem",
              fontWeight: 800,
              letterSpacing: "-0.02em",
              background: "linear-gradient(135deg, #f59e0b 0%, #ef4444 60%, #dc2626 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>Blood🩸Doctor</span>
            <span style={{ color: "rgba(255,255,255,0.35)", fontSize: "1rem" }}>·</span>
            <span style={{ color: "rgba(255,255,255,0.55)", fontSize: "0.75rem", fontWeight: 500, letterSpacing: "0.05em", textTransform: "uppercase" }}>
              Dr Abdul Mannan · Bangor Haemophilia Centre
            </span>
          </div>
          <div className="flex flex-wrap gap-2 mb-4">
            <Badge variant="secondary">Gangat · Szuber · Tefferi</Badge>
            <Badge variant="secondary">Am J Hematol 2023;98:965–981</Badge>
            <Badge variant="secondary">Mayo Clinic</Badge>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold leading-tight mb-2">
            JAK2 Unmutated Erythrocytosis
          </h1>
          <p className="text-white/75 text-lg mb-5">2023 Update on Diagnosis and Management — Interactive Clinical Review</p>
          <a href="https://doi.org/10.1002/ajh.26920" target="_blank" rel="noopener"
            className="inline-flex items-center gap-2 bg-white/15 hover:bg-white/25 border border-white/30 rounded-lg px-4 py-2 text-sm font-medium transition-colors">
            <ExternalLink size={14} /> View Original Paper
          </a>
        </div>
      </header>

      {/* ── CONTENT with shadcn Tabs ── */}
      <div className="max-w-5xl mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}
          style={{ display: "flex", flexDirection: "column", width: "100%" }}>
          <TabsList
            style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", width: "100%", height: "auto" }}
            className="gap-1 bg-slate-800 p-2 rounded-xl mb-6">
            {[
              { value: "overview",     label: "Overview",        icon: <BookOpen size={13} /> },
              { value: "pathogenesis", label: "Pathogenesis",    icon: <FlaskConical size={13} /> },
              { value: "diagnosis",    label: "Diagnosis",       icon: <Beaker size={13} /> },
              { value: "hereditary",   label: "Hereditary",      icon: <Dna size={13} /> },
              { value: "acquired",     label: "Acquired",        icon: <Heart size={13} /> },
              { value: "management",   label: "Management",      icon: <Pill size={13} /> },
              { value: "pathways",     label: "Care Pathways",   icon: <Map size={13} /> },
              { value: "pearls",       label: "Clinical Pearls", icon: <Star size={13} /> },
            ].map(t => {
              const isActive = activeTab === t.value;
              return (
                <TabsTrigger key={t.value} value={t.value}
                  style={{
                    flex: "0 0 auto",
                    backgroundColor: isActive ? "#fbbf24" : "transparent",
                    color: isActive ? "#0f172a" : "rgba(255,255,255,0.78)",
                    fontWeight: isActive ? 700 : 600,
                    border: "none",
                    outline: "none",
                  }}
                  className="flex items-center gap-1.5 text-xs rounded-md px-3 py-1.5 transition-colors hover:bg-white/10">
                  {t.icon}{t.label}
                </TabsTrigger>
              );
            })}
          </TabsList>

          <TabsContent value="overview"><OverviewTab /></TabsContent>
          <TabsContent value="pathogenesis"><PathogenesisTab /></TabsContent>
          <TabsContent value="diagnosis"><DiagnosisTab /></TabsContent>
          <TabsContent value="hereditary"><HereditaryTab /></TabsContent>
          <TabsContent value="acquired"><AcquiredTab /></TabsContent>
          <TabsContent value="management"><ManagementTab /></TabsContent>
          <TabsContent value="pathways"><PathwaysTab /></TabsContent>
          <TabsContent value="pearls"><PearlsTab /></TabsContent>
        </Tabs>
      </div>

      {/* ── FOOTER ── */}
      <footer className="bg-slate-800 text-white/50 text-center py-5 text-xs mt-8">
        Interactive review based on: Gangat N, Szuber N, Tefferi A. <em>Am J Hematol.</em> 2023;98:965–981 · DOI: 10.1002/ajh.26920<br />
        Prepared for Dr Abdul Mannan — Consultant Haematologist, Bangor Haemophilia Centre, Betsi Cadwaladr UHB
      </footer>
    </div>
  );
}

/* ════════════════════════════════════════ OVERVIEW ═════════════════════ */
function OverviewTab() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-slate-800 border-b-2 border-amber-400 pb-2">Disease Overview</h2>

      <Callout type="navy" title="What is JAK2 Unmutated Erythrocytosis?">
        A heterogeneous spectrum of hereditary and acquired conditions causing elevated Hgb/Hct <strong>without a JAK2 mutation</strong> — therefore NOT polycythemia vera. Also called "non-PV erythrocytosis." More common than PV but frequently under-investigated.
      </Callout>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        <StatCard num="16.5" label="Hgb g/dL threshold males (WHO 2016)" accent="border-t-slate-800" />
        <StatCard num="16.0" label="Hgb g/dL threshold females (WHO 2016)" accent="border-t-teal-600" />
        <StatCard num="3.4%" label="Population prevalence (WHO 2016 criteria)" accent="border-t-amber-400" />
        <StatCard num="12%" label="Hereditary causes identified (Mayo, n=1192)" accent="border-t-blue-500" />
        <StatCard num="58%" label="Patients with no workup beyond JAK2 testing" accent="border-t-red-500" />
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2"><Dna size={16} />Two Main Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2 mb-3">
              <Badge variant="destructive">Hereditary (Congenital)</Badge>
              <Badge variant="secondary">Acquired (Secondary)</Badge>
              <Badge variant="outline">Idiopathic</Badge>
            </div>
            <p className="text-sm text-muted-foreground">Hereditary = longstanding, often childhood onset, family history. Acquired = adult onset, identifiable trigger. Idiopathic = label given when workup is incomplete.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2"><Activity size={16} />Key Differences vs PV</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-800 hover:bg-slate-800">
                  <TableHead className="text-white">Feature</TableHead>
                  <TableHead className="text-white">Non-PV</TableHead>
                  <TableHead className="text-white">PV</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[
                  ["JAK2 mutation", "Absent", "Present (>95%)"],
                  ["WBC/Platelets", "Usually normal", "Often elevated"],
                  ["Serum Epo", "Normal or elevated", "Subnormal"],
                  ["Splenomegaly", "Absent", "Often present"],
                  ["Thrombosis risk", "Lower (generally)", "Significantly elevated"],
                  ["Cytoreduction", "NOT recommended", "Often needed"],
                ].map(([f, a, b]) => (
                  <TableRow key={f}>
                    <TableCell className="font-medium text-xs">{f}</TableCell>
                    <TableCell className="text-xs">{a}</TableCell>
                    <TableCell className="text-xs">{b}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      <Callout type="danger" title="Most Important First Step">
        Exclude polycythemia vera by testing JAK2 V617F (exon 14) AND exon 12 mutations in peripheral blood. PV carries specific risks of thrombosis and fibrotic/leukemic transformation requiring targeted treatment.
      </Callout>

      <Callout type="warning" title="The 'Idiopathic' Problem">
        "Idiopathic erythrocytosis" often reflects incomplete workup. In one series, 58% of patients had no investigation beyond JAK2 testing. This label should prompt systematic evaluation rather than premature closure.
      </Callout>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">WHO 2016 Diagnostic Thresholds</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-800 hover:bg-slate-800">
                <TableHead className="text-white">Sex</TableHead>
                <TableHead className="text-white text-center">Haemoglobin</TableHead>
                <TableHead className="text-white text-center">Haematocrit</TableHead>
                <TableHead className="text-white">Notes</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">Caucasian Male</TableCell>
                <TableCell className="text-center font-bold text-slate-800">&gt;16.5 g/dL</TableCell>
                <TableCell className="text-center font-bold text-slate-800">&gt;49%</TableCell>
                <TableCell className="text-xs text-muted-foreground">Lowered from 2008 to capture masked PV</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Caucasian Female</TableCell>
                <TableCell className="text-center font-bold text-slate-800">&gt;16.0 g/dL</TableCell>
                <TableCell className="text-center font-bold text-slate-800">&gt;48%</TableCell>
                <TableCell className="text-xs text-muted-foreground">Unchanged in 2022 ICC</TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <p className="text-xs text-muted-foreground px-4 py-2 italic">Confirmed on at least 2 separate blood counts. Race-, altitude-, and sex-adjusted values required.</p>
        </CardContent>
      </Card>
    </div>
  );
}

/* ════════════════════════════════════════ PATHOGENESIS ══════════════════ */
function PathogenesisTab() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-slate-800 border-b-2 border-amber-400 pb-2">Pathogenesis — HIF–PHD2–VHL Oxygen Sensing Pathway</h2>

      <Callout type="info" title="The Central Mechanism">
        Erythropoiesis is regulated by erythropoietin (Epo), produced by renal peritubular cells via the <strong>HIF–PHD2–VHL pathway</strong> in an oxygen-dependent manner. Disruption — by hypoxia or mutation — leads to inappropriate Epo production and erythrocytosis.
      </Callout>

      <div className="grid md:grid-cols-2 gap-4">
        <Card className="border-blue-200 bg-blue-50">
          <CardHeader className="pb-2">
            <CardTitle className="text-base text-blue-800 flex items-center gap-2"><CheckCircle size={15} />Under NORMOXIA</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {[
              "PHD2 hydroxylates HIF2-alpha at Pro405 and Pro531",
              "VHL binds hydroxylated HIF2-alpha",
              "Ubiquitin-proteasomal degradation of HIF2-alpha",
              "EPO gene NOT transcribed — Normal erythropoiesis",
            ].map((s, i) => (
              <div key={i} className="flex items-start gap-2">
                <ArrowRight size={14} className="text-blue-500 mt-1 flex-shrink-0" />
                <span className="text-sm text-blue-800">{s}</span>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border-red-200 bg-red-50">
          <CardHeader className="pb-2">
            <CardTitle className="text-base text-red-800 flex items-center gap-2"><AlertCircle size={15} />Under HYPOXIA or Pathway Mutation</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {[
              "PHD2 activity reduced — HIF2-alpha NOT hydroxylated",
              "HIF2-alpha stabilised — Escapes VHL binding",
              "HIF complex binds hypoxia-responsive elements in EPO gene",
              "EPO transcription activated — ERYTHROCYTOSIS",
            ].map((s, i) => (
              <div key={i} className="flex items-start gap-2">
                <ArrowRight size={14} className="text-red-500 mt-1 flex-shrink-0" />
                <span className="text-sm text-red-800">{s}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Separator />

      <h3 className="text-lg font-bold text-slate-800">Key Genes in the Pathway</h3>
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-800 hover:bg-slate-800">
                <TableHead className="text-white">Gene</TableHead>
                <TableHead className="text-white">Protein</TableHead>
                <TableHead className="text-white">Mutation Effect</TableHead>
                <TableHead className="text-white">Inheritance</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[
                ["EPAS1", "HIF2-alpha", "Gain-of-function — HIF2 not degraded", "Somatic or germline (AD)"],
                ["EGLN1", "PHD2", "Loss-of-function — HIF2 not hydroxylated", "Germline (AD)"],
                ["VHL", "pVHL", "Loss-of-function — HIF2 not targeted for degradation", "Germline (AR or AD)"],
                ["EPOR", "Epo receptor", "Gain-of-function — hypersensitive to Epo", "Germline (AD)"],
              ].map(([gene, protein, effect, inh]) => (
                <TableRow key={gene}>
                  <TableCell><Badge variant="outline" className="font-mono">{gene}</Badge></TableCell>
                  <TableCell className="text-sm">{protein}</TableCell>
                  <TableCell className="text-sm">{effect}</TableCell>
                  <TableCell className="text-sm">{inh}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Callout type="warning" title="EPAS1 — Somatic Mosaic vs Germline">
        EPAS1 mutations causing erythrocytosis are often <strong>somatic mosaic</strong> (not germline), occurring post-zygotically. This means standard germline sequencing may miss them — deep sequencing or targeted analysis of haematopoietic tissue may be needed.
      </Callout>

      <Callout type="info" title="2,3-BPG and Haemoglobin Oxygen Affinity">
        A second mechanism involves <strong>high oxygen affinity haemoglobin variants (HOAV)</strong> or 2,3-BPG deficiency. When haemoglobin binds O2 too tightly, tissues become relatively hypoxic despite normal pO2, triggering EPO production. Detected by measuring P50 on a venous blood gas sample (normal P50 = 26–28 mmHg; HOAV P50 is lower).
      </Callout>
    </div>
  );
}

/* ════════════════════════════════════════ DIAGNOSIS ════════════════════ */
function DiagnosisTab() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-slate-800 border-b-2 border-amber-400 pb-2">Diagnostic Workup</h2>

      <Callout type="navy" title="Stepwise Diagnostic Approach">
        Begin with confirmation of true erythrocytosis (not apparent/relative), then exclude PV, then systematically evaluate for secondary (acquired) and hereditary causes. Never label as "idiopathic" without completing steps 1–4.
      </Callout>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Step-by-Step Diagnostic Protocol</CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion className="w-full">
            {[
              {
                title: "Step 1 — Confirm True Erythrocytosis",
                content: "Confirm on at least 2 blood counts. Consider red cell mass (RCM) measurement if borderline (males Hgb 16.5–18 g/dL, females 16–17.5 g/dL). Exclude apparent erythrocytosis due to dehydration, diuretics, or smoker's polycythaemia.",
              },
              {
                title: "Step 2 — Exclude Polycythemia Vera",
                content: "Test JAK2 V617F (exon 14) — covers >95% of PV. If negative but suspicion remains, test JAK2 exon 12 (covers ~3% of JAK2-positive PV, typically isolated erythrocytosis phenotype). If both negative, proceed to Step 3.",
              },
              {
                title: "Step 3 — Basic Labs and Epo Level",
                content: "FBC, blood film, reticulocytes, LDH, U&E, LFTs, TFTs, ferritin. Serum Epo is pivotal: subnormal = strongly suggests PV (or EPOR mutation if very low). Normal or elevated = proceed to acquired and hereditary workup.",
              },
              {
                title: "Step 4 — Acquired Cause Workup",
                content: "Arterial blood gas (SaO2 less than 92% = significant hypoxia). Overnight pulse oximetry (looking for OSA/nocturnal desaturations). Review medications: testosterone, SGLT-2 inhibitors, EPO doping, cobalt. Check for post-renal transplant erythrocytosis (ACE-I/ARB as both diagnostic and therapeutic).",
              },
              {
                title: "Step 5 — Hereditary Workup",
                content: "P50 measurement on venous blood gas (low P50 = HOAV or 2,3-BPG deficiency). Haemoglobin electrophoresis and HPLC. If suspected, refer to specialised panel: EPAS1, EGLN1, VHL, EPOR, HBB/HBA sequence variants. Consider 2,3-BPG diphosphoglycerate mutase deficiency.",
              },
            ].map((item, i) => (
              <AccordionItem key={i} value={`step-${i}`}>
                <AccordionTrigger className="font-semibold text-sm text-slate-800">{item.title}</AccordionTrigger>
                <AccordionContent className="text-sm text-gray-700 leading-relaxed">{item.content}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>

      <Callout type="warning" title="P50 Must Be Venous Blood">
        P50 measurement for HOAV MUST be done on <strong>venous blood</strong> (not arterial). Arterial sample gives falsely elevated P50 due to different pH. P50 below 23 mmHg is considered abnormal; normal range 26–28 mmHg.
      </Callout>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Mayo Clinic Hereditary Erythrocytosis Panel</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-3">Next-generation sequencing panel used at Mayo Clinic for suspected hereditary cases. Covers all major gene targets.</p>
          <div className="flex flex-wrap gap-2">
            {["EPAS1 (HIF2A)", "EGLN1 (PHD2)", "VHL", "EPOR", "HBB", "HBA1", "HBA2", "BPGM", "PIEZO1"].map(g => (
              <Badge key={g} variant="outline" className="font-mono text-xs">{g}</Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

/* ════════════════════════════════════════ HEREDITARY ════════════════════ */
function HereditaryTab() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-slate-800 border-b-2 border-amber-400 pb-2">Hereditary (Congenital) Causes</h2>

      <Callout type="navy" title="Overview">
        Hereditary erythrocytosis = erythrocytosis present from birth, often with family history. Caused by germline mutations in oxygen sensing genes, Epo receptor, or haemoglobin variants affecting oxygen affinity. Found in 12% of systematically evaluated erythrocytosis patients (Mayo series, n=1192).
      </Callout>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Hereditary Causes — Evidence Table</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-800 hover:bg-slate-800">
                <TableHead className="text-white">Cause</TableHead>
                <TableHead className="text-white">Gene</TableHead>
                <TableHead className="text-white">Mechanism</TableHead>
                <TableHead className="text-white">Epo Level</TableHead>
                <TableHead className="text-white">Inheritance</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[
                ["VHL mutation (Chuvash)", "VHL", "VHL cannot target HIF2 for degradation — HIF2 accumulates", "Elevated", "Autosomal recessive (AR205)"],
                ["PHD2 deficiency", "EGLN1", "PHD2 cannot hydroxylate HIF2 — HIF2 not degraded", "Elevated", "Autosomal dominant"],
                ["HIF2-alpha gain-of-function", "EPAS1", "HIF2 escapes hydroxylation by PHD2 — constitutively active", "Elevated", "Somatic mosaic or germline AD"],
                ["EPOR gain-of-function", "EPOR", "Truncated cytoplasmic tail — hypersensitive Epo receptor", "Subnormal", "Autosomal dominant"],
                ["High-affinity Hgb variants (HOAV)", "HBB/HBA", "Hgb releases O2 poorly — tissue hypoxia — EPO induction", "Elevated", "Autosomal dominant"],
                ["2,3-BPG deficiency", "BPGM", "Low 2,3-BPG causes leftward shift O2-dissociation curve", "Elevated", "Autosomal recessive"],
                ["PIEZO1 gain-of-function", "PIEZO1", "RBC dehydration — stomatocytosis — possible erythrocytosis", "Normal/variable", "Autosomal dominant"],
              ].map(([cause, gene, mech, epo, inh]) => (
                <TableRow key={gene}>
                  <TableCell className="font-medium text-sm">{cause}</TableCell>
                  <TableCell><Badge variant="outline" className="font-mono text-xs">{gene}</Badge></TableCell>
                  <TableCell className="text-xs text-muted-foreground">{mech}</TableCell>
                  <TableCell className="text-xs">{epo}</TableCell>
                  <TableCell className="text-xs">{inh}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Callout type="info" title="Chuvash Polycythaemia — Special Mention">
        VHL p.R200W (Arg200Trp) is the most common hereditary erythrocytosis mutation worldwide. Originally described in the Chuvash people of Russia but found globally. AR inheritance. Associated with thrombotic and haemorrhagic complications — management differs from other hereditary causes.
      </Callout>

      <Callout type="warning" title="EPOR Mutations — Key Diagnostic Clue">
        Unlike all other hereditary causes, EPOR gain-of-function produces <strong>subnormal serum Epo</strong>. This is because the hypersensitive receptor suppresses Epo production via feedback. In the context of JAK2-negative erythrocytosis + low Epo, always consider EPOR mutation and NOT just PV.
      </Callout>
    </div>
  );
}

/* ════════════════════════════════════════ ACQUIRED ═════════════════════ */
function AcquiredTab() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-slate-800 border-b-2 border-amber-400 pb-2">Acquired (Secondary) Causes</h2>

      <Callout type="info" title="Key Assessment for Acquired Causes">
        The serum Epo level and SaO2 (arterial blood gas or pulse oximetry) are your two most important initial investigations. Hypoxia drives EPO production appropriately; ectopic EPO production is rare.
      </Callout>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Acquired Causes — Evidence Table</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-800 hover:bg-slate-800">
                <TableHead className="text-white">Cause</TableHead>
                <TableHead className="text-white">Mechanism</TableHead>
                <TableHead className="text-white">Epo</TableHead>
                <TableHead className="text-white">Key Investigation</TableHead>
                <TableHead className="text-white">Treatment</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[
                ["COPD", "Chronic alveolar hypoxia — continuous EPO drive", "Elevated", "ABG, spirometry, SaO2", "Supplemental O2, treat COPD"],
                ["Obstructive Sleep Apnoea", "Nocturnal desaturations — intermittent EPO stimulation", "Elevated or normal", "Overnight oximetry or polysomnography", "CPAP — usually resolves erythrocytosis"],
                ["Cyanotic heart disease", "R-L shunt — systemic desaturation", "Elevated", "Echo, cardiac catheter", "Surgical correction if possible"],
                ["Testosterone / androgens", "Direct EPO stimulation + marrow stimulation", "Variable", "Drug history, testosterone levels", "Reduce dose or stop; TESA monitoring"],
                ["SGLT-2 inhibitors", "Haemoconcentration + modest EPO rise", "Mildly elevated or normal", "Drug history, HbA1c, volume status", "Monitor; may not need treatment"],
                ["Post-renal transplant", "Increased Epo sensitivity; allograft Epo production", "Normal or mildly elevated", "Renal function, Epo level", "ACE-I or ARB (first-line; reduces both BP and Hct)"],
                ["Ectopic EPO (tumour)", "Renal cell carcinoma, hepatocellular carcinoma, others", "Elevated", "Abdominal USS/CT, tumour markers", "Treat underlying tumour"],
                ["TEMPI syndrome", "Telangiectasias, Epo elevation, M-protein, Perinephric fluid, Intrapulmonary shunting", "Markedly elevated", "M-protein, perinephric USS", "Bortezomib-based therapy"],
                ["High altitude", "Environmental hypoxia — physiological EPO drive", "Elevated", "History, altitude", "Return to sea level if Hct very high"],
              ].map(([cause, mech, epo, inv, rx]) => (
                <TableRow key={cause}>
                  <TableCell className="font-medium text-sm">{cause}</TableCell>
                  <TableCell className="text-xs text-muted-foreground">{mech}</TableCell>
                  <TableCell className="text-xs">{epo}</TableCell>
                  <TableCell className="text-xs">{inv}</TableCell>
                  <TableCell className="text-xs">{rx}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Callout type="warning" title="TEMPI Syndrome — Rare but Important">
        TEMPI is a plasma cell dyscrasia with markedly elevated Epo, perinephric fluid collections, and intrapulmonary shunting causing hypoxia. It mimics both hereditary (elevated Epo) and acquired erythrocytosis. Key clue: M-protein on serum electrophoresis. Bortezomib-based therapy is effective.
      </Callout>
    </div>
  );
}

/* ════════════════════════════════════════ MANAGEMENT ═══════════════════ */
function ManagementTab() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-slate-800 border-b-2 border-amber-400 pb-2">Management Principles</h2>

      <Callout type="danger" title="The Most Important Management Principle">
        <strong>Cytoreductive therapy is NOT recommended for non-clonal (non-PV) erythrocytosis.</strong> No survival benefit, no reduction in thrombotic risk, and potential harm. The goal is to treat the underlying cause, not the Hgb number.
      </Callout>

      <div className="grid md:grid-cols-2 gap-4">
        <Card className="border-green-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-base text-green-800">Treat the Underlying Cause</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {[
              "O2 therapy for COPD/hypoxia",
              "CPAP for obstructive sleep apnoea",
              "ACE-inhibitor or ARB for post-transplant erythrocytosis",
              "Reduce or stop testosterone / SGLT-2 inhibitor",
              "Bortezomib for TEMPI syndrome",
              "Surgical correction for cyanotic heart disease where feasible",
            ].map((s, i) => (
              <div key={i} className="flex items-center gap-2 text-sm text-gray-700">
                <CheckCircle size={14} className="text-green-500 flex-shrink-0" />
                {s}
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border-amber-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-base text-amber-800">Phlebotomy — Conditional</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-3">Symptom-driven only. No fixed Hct target. Indications:</p>
            <div className="space-y-2">
              {[
                "Symptomatic hyperviscosity (headache, visual disturbance, dizziness)",
                "Planned surgery requiring Hct below 52% perioperatively",
                "Chuvash polycythaemia — consider if Hct above 55%",
                "Very high Hct (above 60%) with symptoms in any cause",
              ].map((s, i) => (
                <div key={i} className="flex items-start gap-2 text-sm text-gray-700">
                  <ArrowRight size={14} className="text-amber-500 flex-shrink-0 mt-0.5" />
                  {s}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Callout type="info" title="Thrombosis Management">
        Antiplatelet therapy (aspirin) and anticoagulation should be based on individual cardiovascular risk — NOT erythrocytosis per se. In hereditary erythrocytosis, thrombotic risk is generally lower than PV. Chuvash polycythaemia is an exception with higher thrombotic and haemorrhagic risk.
      </Callout>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">What NOT to Do</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="bg-red-700 hover:bg-red-700">
                <TableHead className="text-white">Intervention</TableHead>
                <TableHead className="text-white">Why to Avoid</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[
                ["Hydroxyurea / cytoreduction", "No benefit in non-clonal erythrocytosis; potential long-term toxicity"],
                ["Routine venesection to fixed Hct target", "No evidence-base; causes iron deficiency; does not reduce thrombotic risk"],
                ["Aspirin in low-risk hereditary erythrocytosis", "Bleeding risk outweighs benefit without clonal disease"],
                ["Label as PV without full JAK2 testing", "Exon 12 missed without targeted testing; incorrect diagnosis has major consequences"],
                ["Label as idiopathic without full workup", "58% cases never investigated beyond JAK2; hereditary and acquired causes may be treatable"],
              ].map(([inv, why]) => (
                <TableRow key={inv}>
                  <TableCell className="font-medium text-sm text-red-700">{inv}</TableCell>
                  <TableCell className="text-xs text-muted-foreground">{why}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

/* ════════════════════════════════════════ PATHWAYS ═════════════════════ */
function PathwaysTab() {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-slate-800 border-b-2 border-amber-400 pb-2">Care Pathways by Cause</h2>
      <Callout type="navy" title="How to Use These Pathways">
        Each pathway below is specific to a confirmed cause of JAK2-unmutated erythrocytosis. Expand to reveal step-by-step clinical management. These are based on the 2023 Tefferi review and associated BSH/ISTH guidance.
      </Callout>
      <Accordion multiple className="w-full space-y-1">
        <PathwayCard value="copd" icon={<Activity size={15} />} title="COPD / Chronic Hypoxia"
          steps={[
            "Confirm chronic hypoxia: ABG at rest — SaO2 below 92% or PaO2 below 8 kPa qualifies for LTOT",
            "Initiate long-term oxygen therapy (LTOT) at 1–4 L/min to maintain SaO2 above 92% for at least 15 hours/day",
            "Reassess FBC at 3–6 months — erythrocytosis will partially or fully resolve if compliance with O2 is good",
            "Do NOT venesect routinely — hyperviscosity symptoms only, with phlebotomy of 250–500 mL per session",
            "Treat underlying COPD: bronchodilators, inhaled steroids, pulmonary rehab",
            "Annual review of Hgb/Hct and O2 needs",
          ]}
          callout="Phlebotomy in COPD can worsen exercise tolerance by reducing O2-carrying capacity. Only use for symptomatic hyperviscosity." />

        <PathwayCard value="osa" icon={<Beaker size={15} />} title="Obstructive Sleep Apnoea (OSA)"
          steps={[
            "Overnight pulse oximetry or polysomnography: look for desaturations below 88–90% and apnoea-hypopnoea index (AHI) above 15",
            "Refer to sleep medicine — CPAP titration is first-line treatment",
            "Reassess FBC at 6 months post-CPAP initiation — erythrocytosis typically resolves within weeks to months",
            "If incomplete resolution, check CPAP compliance (AHI should fall below 5 on device data)",
            "Consider mandibular advancement device for mild-moderate OSA or CPAP intolerance",
            "Weight loss counselling if BMI elevated — significant weight loss can resolve OSA",
          ]}
          callout="OSA-related erythrocytosis is fully reversible with effective CPAP therapy in most cases." />

        <PathwayCard value="hoav" icon={<Dna size={15} />} title="High-Affinity Haemoglobin / 2,3-BPG Deficiency"
          steps={[
            "Measure P50 on venous blood gas (not arterial): P50 below 23 mmHg is abnormal",
            "Haemoglobin electrophoresis and HPLC — may identify abnormal band, but many HOAV have normal patterns",
            "Sequence HBB, HBA1, HBA2 genes for known and novel variants",
            "If P50 low but haemoglobin genes normal — measure RBC 2,3-bisphosphoglycerate; if low, test BPGM gene",
            "Management: reassurance only in asymptomatic cases — this is a compensatory mechanism, NOT a disease",
            "No phlebotomy, no cytoreduction — these would worsen effective oxygen delivery",
            "Genetic counselling: most are AD; screen first-degree relatives",
          ]}
          callout="Phlebotomy is CONTRAINDICATED in HOAV — reducing RBC mass would worsen already impaired tissue O2 delivery." />

        <PathwayCard value="vhl" icon={<FlaskConical size={15} />} title="VHL / EPAS1 / EGLN1 Mutations"
          steps={[
            "Confirm germline mutation by genetic testing of blood (and consider deep sequencing for somatic mosaic EPAS1)",
            "For VHL p.R200W (Chuvash): regular monitoring for thrombosis and haemorrhage; consider aspirin 75 mg in high-risk cases",
            "Epo level will be elevated — this is expected and does not guide management",
            "Phlebotomy only if Hct above 55% with symptoms, or perioperative Hct reduction needed",
            "Screen for VHL-associated tumours in classic VHL disease (haemangioblastoma, RCC) — different from Chuvash",
            "Genetic counselling: VHL AR, EGLN1 and EPAS1 AD — family screening appropriate",
            "Annual review with haematologist; no cytoreduction",
          ]}
          callout="Chuvash polycythaemia has higher thrombotic AND haemorrhagic risk than other hereditary causes — needs individual risk assessment." />

        <PathwayCard value="epor" icon={<Heart size={15} />} title="EPOR Gain-of-Function"
          steps={[
            "Distinguish from PV: EPOR gives subnormal Epo (like PV) but JAK2 negative; BM biopsy shows erythroid hyperplasia without PV features",
            "Test EPOR gene: truncation mutations of cytoplasmic tail (removes SHP-1 binding site) are causative",
            "Phlebotomy: consider for Hct above 52% or symptomatic cases — this group has slightly higher thrombotic risk than other hereditary causes",
            "Avoid cytoreduction — no RCT evidence and risk of long-term toxicity",
            "Famous association: Finnish cross-country skiing doping scandal — athletes with natural EPOR mutations had competitive advantage",
            "Genetic counselling: AD inheritance; screen first-degree relatives",
            "Annual review including cardiovascular risk assessment",
          ]} />

        <PathwayCard value="transplant" icon={<Pill size={15} />} title="Post-Renal Transplant Erythrocytosis"
          steps={[
            "Occurs in 10–15% of renal transplant recipients, typically 8–24 months post-transplant",
            "Exclude other causes: confirm functioning allograft, check for native kidney EPO production, review medications",
            "First-line treatment: ACE-inhibitor or ARB — reduces Hct by 4–6 percentage points and controls blood pressure simultaneously",
            "Theophylline (low dose, 100 mg BD) is a second-line option if ACE-I/ARB contraindicated or ineffective",
            "Phlebotomy if Hct above 52% causing symptoms while awaiting medication effect",
            "Monitor renal function after starting ACE-I/ARB (creatinine rise of up to 20–30% is acceptable)",
            "Usually self-limiting — resolves in 24–48 months in many patients without treatment",
          ]}
          callout="ACE-inhibitors work via adenosine pathway modulation in the erythropoietic drive — not just via blood pressure effect." />

        <PathwayCard value="drug" icon={<Star size={15} />} title="Drug-Induced (Testosterone / SGLT-2i)"
          steps={[
            "Testosterone: measure Hgb/Hct before starting and at 3, 6, 12 months then annually. If Hct above 52%, reduce dose or switch preparation",
            "For Hct 52–54%: dose reduction usually sufficient. For Hct above 54%: consider stopping testosterone",
            "SGLT-2 inhibitors: modest Hgb rise (1–2 g/dL) due to haemoconcentration + EPO effect. Usually benign; do not stop for erythrocytosis alone",
            "Ensure genuine erythrocytosis rather than haemoconcentration from diuretic effect of SGLT-2i",
            "Review complete drug list: EPO doping, androgen supplements, cobalt, recombinant erythropoiesis-stimulating agents",
            "Stop causative drug if Hct above 54% or symptomatic. FBC normalises within 3–6 months",
          ]}
          callout="Testosterone-associated erythrocytosis is dose-dependent and formulation-dependent — injectable testosterone causes higher peaks than gel." />
      </Accordion>
    </div>
  );
}

/* ════════════════════════════════════════ PEARLS ═══════════════════════ */
function PearlsTab() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-slate-800 border-b-2 border-amber-400 pb-2">Clinical Pearls</h2>

      <div className="grid md:grid-cols-2 gap-4">
        {[
          {
            title: "JAK2-Negative does NOT mean benign",
            body: "Some hereditary causes (Chuvash VHL) carry real thrombotic and haemorrhagic risk. Do not dismiss JAK2-negative erythrocytosis as automatically safe.",
            type: "danger" as CalloutType,
          },
          {
            title: "Subnormal Epo — Think EPOR, not just PV",
            body: "When JAK2 is negative but Epo is subnormal, EPOR gain-of-function is the key differential. Send EPOR sequencing before concluding 'incomplete JAK2 testing'.",
            type: "warning" as CalloutType,
          },
          {
            title: "P50 Requires Venous Sample",
            body: "Always request venous P50 for HOAV workup. Arterial samples falsely elevate P50 due to higher pH, masking low-affinity curves.",
            type: "info" as CalloutType,
          },
          {
            title: "TEMPI — The Great Mimic",
            body: "Markedly elevated Epo + erythrocytosis + M-protein = TEMPI until proven otherwise. Do serum electrophoresis in all unexplained erythrocytosis with Epo above 100.",
            type: "warning" as CalloutType,
          },
          {
            title: "Idiopathic is a Label of Last Resort",
            body: "Before accepting 'idiopathic', confirm: ABG, overnight oximetry, P50, haemoglobin electrophoresis, drug review, targeted gene panel. 58% of patients are inadequately investigated.",
            type: "navy" as CalloutType,
          },
          {
            title: "Phlebotomy Harms HOAV Patients",
            body: "In high-affinity haemoglobin variants, reducing RBC mass actually worsens oxygen delivery to tissues. Phlebotomy is contraindicated — explain this clearly to colleagues and patients.",
            type: "danger" as CalloutType,
          },
        ].map(({ title, body, type }) => (
          <Callout key={title} type={type} title={title}>{body}</Callout>
        ))}
      </div>

      <Separator />

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">FRCPath / FCPS Exam Essentials</CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion multiple className="w-full">
            {[
              {
                q: "A 35-year-old man has Hgb 19 g/dL, Hct 58%, JAK2 negative, serum Epo 2 mU/mL (low). What is the most likely diagnosis?",
                a: "EPOR gain-of-function mutation. Subnormal Epo + JAK2 negative = EPOR or rare somatic erythrocytosis. Not PV (JAK2 negative). Send EPOR sequencing. BM biopsy may show erythroid hyperplasia without PV megakaryocyte morphology.",
              },
              {
                q: "A 55-year-old with COPD has Hgb 18.5 g/dL. His cardiologist wants to start hydroxyurea. What is your advice?",
                a: "Decline hydroxyurea. In COPD-related erythrocytosis (secondary, non-clonal), cytoreduction has no evidence base and will worsen O2-carrying capacity. The correct management is LTOT to maintain SaO2 above 92%, treating the hypoxic drive. Phlebotomy only if symptomatic hyperviscosity.",
              },
              {
                q: "P50 on a venous blood gas is 18 mmHg (normal 26–28). What does this indicate and how do you investigate further?",
                a: "P50 below 23 mmHg indicates high-affinity haemoglobin variant (HOAV) or 2,3-BPG deficiency. Investigate with: haemoglobin electrophoresis, HPLC, HBB/HBA gene sequencing. If haemoglobin genes normal, measure RBC 2,3-BPG and test BPGM gene. Management is reassurance only — DO NOT venesect.",
              },
              {
                q: "Which inherited erythrocytosis has the highest risk of thrombosis and haemorrhage?",
                a: "Chuvash polycythaemia (VHL p.R200W). Unlike other hereditary causes which have low thrombotic risk, Chuvash carries real vascular risk. Hct targets are lower (aim below 55%), aspirin considered in high-risk cases, anticoagulation may be needed.",
              },
            ].map((item, i) => (
              <AccordionItem key={i} value={`q-${i}`}>
                <AccordionTrigger className="text-sm font-medium text-slate-700 text-left">{item.q}</AccordionTrigger>
                <AccordionContent className="text-sm text-gray-700 leading-relaxed bg-slate-50 rounded p-3">{item.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>

      <Card className="bg-slate-800 text-white border-0">
        <CardHeader className="pb-2">
          <CardTitle className="text-base text-amber-400">Reference</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-white/80">
          Gangat N, Szuber N, Tefferi A. <em>JAK2 unmutated erythrocytosis: 2023 update on diagnosis and management.</em> American Journal of Hematology. 2023;98(7):1099–1110. DOI: <a href="https://doi.org/10.1002/ajh.26920" className="text-amber-400 hover:underline">10.1002/ajh.26920</a>
        </CardContent>
      </Card>
    </div>
  );
}
