import { useState } from "react";
import {
  BookOpen, FlaskConical, Dna, Heart, Pill, Map, Star, ChevronDown,
  ChevronUp, ExternalLink, AlertTriangle, CheckCircle, Info, AlertCircle,
  Activity, Beaker, Microscope, Stethoscope, ArrowRight, GitBranch
} from "lucide-react";

/* ── tiny cn helper ── */
function cn(...c: (string | undefined | false)[]) { return c.filter(Boolean).join(" "); }

/* ── BADGE ── */
function Badge({ children, variant = "default" }: { children: React.ReactNode; variant?: "default"|"red"|"green"|"amber"|"blue"|"purple"|"muted" }) {
  const v = {
    default: "bg-navy text-white",
    red:     "bg-red-100 text-red-800 border border-red-200",
    green:   "bg-green-100 text-green-800 border border-green-200",
    amber:   "bg-amber-100 text-amber-800 border border-amber-200",
    blue:    "bg-blue-100 text-blue-800 border border-blue-200",
    purple:  "bg-purple-100 text-purple-800 border border-purple-200",
    muted:   "bg-gray-100 text-gray-600 border border-gray-200",
  }[variant];
  return <span className={cn("inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium", v)}>{children}</span>;
}

/* ── CALLOUT ── */
function Callout({ type = "info", title, children }: { type?: "info"|"warning"|"danger"|"success"|"navy"; title: string; children: React.ReactNode }) {
  const cfg = {
    info:    { bg: "bg-blue-50   border-blue-400",  icon: <Info className="text-blue-500" size={16}/>,    title: "text-blue-800"  },
    warning: { bg: "bg-amber-50  border-amber-400", icon: <AlertTriangle className="text-amber-500" size={16}/>, title: "text-amber-800" },
    danger:  { bg: "bg-red-50    border-red-400",   icon: <AlertCircle className="text-red-500" size={16}/>,    title: "text-red-800"   },
    success: { bg: "bg-green-50  border-green-400", icon: <CheckCircle className="text-green-600" size={16}/>,  title: "text-green-800" },
    navy:    { bg: "bg-indigo-50 border-indigo-500",icon: <BookOpen className="text-indigo-600" size={16}/>,    title: "text-indigo-800"},
  }[type];
  return (
    <div className={cn("border-l-4 rounded-r-lg p-4 my-3", cfg.bg)}>
      <div className={cn("flex items-center gap-2 font-semibold text-sm mb-1", cfg.title)}>
        {cfg.icon} {title}
      </div>
      <div className="text-sm text-gray-700 leading-relaxed">{children}</div>
    </div>
  );
}

/* ── STAT CARD ── */
function StatCard({ num, label, color="border-navy" }: { num: string; label: string; color?: string }) {
  return (
    <div className={cn("bg-white rounded-xl border border-gray-200 border-t-4 p-4 text-center shadow-sm", color)}>
      <div className="text-2xl font-extrabold text-navy">{num}</div>
      <div className="text-xs text-gray-500 mt-1 leading-tight">{label}</div>
    </div>
  );
}

/* ── PATHWAY CARD ── */
function PathwayCard({ icon, title, steps, callout }: { icon: React.ReactNode; title: string; steps: string[]; callout?: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-teal rounded-xl overflow-hidden">
      <button onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-4 py-3 bg-teal text-white font-semibold text-sm hover:bg-teal/90 transition-colors">
        <span className="flex items-center gap-2">{icon}{title}</span>
        {open ? <ChevronUp size={16}/> : <ChevronDown size={16}/>}
      </button>
      {open && (
        <div className="p-4 bg-white space-y-2">
          {steps.map((s, i) => (
            <div key={i} className="flex gap-3 items-start">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-navy text-white text-xs flex items-center justify-center font-bold mt-0.5">{i+1}</span>
              <p className="text-sm text-gray-700 leading-relaxed" dangerouslySetInnerHTML={{__html: s}}/>
            </div>
          ))}
          {callout && <Callout type="warning" title="Evidence Note">{callout}</Callout>}
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════ TABS DATA ═══ */
const TABS = [
  { id:"overview",     label:"Overview",       icon:<BookOpen size={14}/>    },
  { id:"pathogenesis", label:"Pathogenesis",   icon:<FlaskConical size={14}/>},
  { id:"diagnosis",    label:"Diagnosis",      icon:<Beaker size={14}/>      },
  { id:"hereditary",   label:"Hereditary",     icon:<Dna size={14}/>         },
  { id:"acquired",     label:"Acquired",       icon:<Heart size={14}/>       },
  { id:"management",   label:"Management",     icon:<Pill size={14}/>        },
  { id:"pathways",     label:"Care Pathways",  icon:<Map size={14}/>         },
  { id:"pearls",       label:"Clinical Pearls",icon:<Star size={14}/>        },
];

/* ═══════════════════════════════════════════════════════ APP ═══════════ */
export default function App() {
  const [active, setActive] = useState("overview");

  return (
    <div className="min-h-screen bg-gray-50 font-sans">

      {/* ── HERO ── */}
      <header className="bg-gradient-to-br from-navy via-navy/90 to-teal text-white px-6 py-10 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 text-[12rem] flex items-center justify-end pr-8 pointer-events-none select-none">🩸</div>
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-wrap gap-2 mb-4">
            <Badge>Gangat · Szuber · Tefferi</Badge>
            <Badge>Am J Hematol 2023;98:965–981</Badge>
            <Badge>Mayo Clinic</Badge>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold leading-tight mb-2">
            JAK2 Unmutated Erythrocytosis
          </h1>
          <p className="text-white/75 text-lg mb-5">2023 Update on Diagnosis and Management — Interactive Clinical Review</p>
          <div className="flex flex-wrap gap-3">
            <a href="https://doi.org/10.1002/ajh.26920" target="_blank" rel="noopener"
               className="inline-flex items-center gap-2 bg-white/15 hover:bg-white/25 border border-white/30 rounded-lg px-4 py-2 text-sm font-medium transition-colors">
              <ExternalLink size={14}/> View Original Paper
            </a>
            <a href="https://github.com/abdulmannan1974/erythrocytosis-2023-interactive" target="_blank" rel="noopener"
               className="inline-flex items-center gap-2 bg-white/15 hover:bg-white/25 border border-white/30 rounded-lg px-4 py-2 text-sm font-medium transition-colors">
              <GitBranch size={14}/> GitHub
            </a>
          </div>
        </div>
      </header>

      {/* ── TAB BAR ── */}
      <nav className="sticky top-0 z-50 bg-navy shadow-lg">
        <div className="max-w-5xl mx-auto px-4 flex gap-1 overflow-x-auto py-2 scrollbar-hide">
          {TABS.map(t => (
            <button key={t.id} onClick={() => setActive(t.id)}
              className={cn(
                "flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold whitespace-nowrap transition-all",
                active === t.id
                  ? "bg-gold text-navy shadow-sm"
                  : "text-white/70 hover:text-white hover:bg-white/10"
              )}>
              {t.icon}{t.label}
            </button>
          ))}
        </div>
      </nav>

      {/* ── CONTENT ── */}
      <main className="max-w-5xl mx-auto px-4 py-8">
        {active === "overview" && <OverviewTab/>}
        {active === "pathogenesis" && <PathogenesisTab/>}
        {active === "diagnosis" && <DiagnosisTab/>}
        {active === "hereditary" && <HereditaryTab/>}
        {active === "acquired" && <AcquiredTab/>}
        {active === "management" && <ManagementTab/>}
        {active === "pathways" && <PathwaysTab/>}
        {active === "pearls" && <PearlsTab/>}
      </main>

      {/* ── FOOTER ── */}
      <footer className="bg-navy text-white/50 text-center py-5 text-xs mt-8">
        Interactive review based on: Gangat N, Szuber N, Tefferi A. <em>Am J Hematol.</em> 2023;98:965–981 · DOI: 10.1002/ajh.26920<br/>
        Prepared for Dr Abdul Mannan — Consultant Haematologist, Bangor Haemophilia Centre, Betsi Cadwaladr UHB
      </footer>
    </div>
  );
}

/* ════════════════════════════════════════ OVERVIEW ════════════════════════ */
function OverviewTab() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-navy border-b-2 border-gold pb-2">Disease Overview</h2>

      <Callout type="navy" title="What is JAK2 Unmutated Erythrocytosis?">
        A heterogeneous spectrum of hereditary and acquired conditions causing elevated Hgb/Hct <strong>without a JAK2 mutation</strong> — therefore NOT polycythemia vera. Also called "non-PV erythrocytosis." More common than PV but frequently under-investigated.
      </Callout>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        <StatCard num="16.5" label="Hgb g/dL threshold males (WHO 2016)" color="border-navy"/>
        <StatCard num="16.0" label="Hgb g/dL threshold females (WHO 2016)" color="border-teal"/>
        <StatCard num="3.4%" label="Population prevalence (WHO 2016 criteria)" color="border-gold"/>
        <StatCard num="12%" label="Hereditary causes identified (Mayo, n=1192)" color="border-blue-400"/>
        <StatCard num="58%" label="Patients with no workup beyond JAK2 testing" color="border-red-400"/>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
          <h3 className="font-bold text-navy mb-3 flex items-center gap-2"><Dna size={16}/>Two Main Categories</h3>
          <div className="flex flex-wrap gap-2 mb-3">
            <Badge variant="red">Hereditary (Congenital)</Badge>
            <Badge variant="blue">Acquired (Secondary)</Badge>
            <Badge variant="muted">Idiopathic</Badge>
          </div>
          <p className="text-sm text-gray-600">Hereditary = longstanding, often childhood onset, family history. Acquired = adult onset, identifiable trigger. Idiopathic = label given when workup is incomplete.</p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm overflow-x-auto">
          <h3 className="font-bold text-navy mb-3 flex items-center gap-2"><Activity size={16}/>Key Differences vs PV</h3>
          <table className="w-full text-xs">
            <thead><tr className="bg-navy text-white"><th className="p-2 text-left rounded-tl">Feature</th><th className="p-2 text-left">Non-PV</th><th className="p-2 text-left rounded-tr">PV</th></tr></thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["JAK2 mutation","❌ Absent","✅ Present (>95%)"],
                ["WBC/Platelets","Usually normal","Often elevated"],
                ["Serum Epo","Normal or ↑","Subnormal"],
                ["Splenomegaly","Absent","Often present"],
                ["Thrombosis risk","Lower (generally)","Significantly elevated"],
                ["Cytoreduction","NOT recommended","Often needed"],
              ].map(([f,a,b]) => (
                <tr key={f} className="even:bg-gray-50">
                  <td className="p-2 font-medium text-gray-700">{f}</td>
                  <td className="p-2 text-gray-600">{a}</td>
                  <td className="p-2 text-gray-600">{b}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Callout type="danger" title="Most Important First Step">
        Exclude polycythemia vera by testing JAK2 V617F (exon 14) AND exon 12 mutations in peripheral blood. PV carries specific risks of thrombosis and fibrotic/leukemic transformation requiring targeted treatment.
      </Callout>

      <Callout type="warning" title="The 'Idiopathic' Problem">
        "Idiopathic erythrocytosis" often reflects incomplete workup. In one series, 58% of patients had no investigation beyond JAK2 testing. This label should prompt systematic evaluation rather than premature closure.
      </Callout>

      <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm overflow-x-auto">
        <h3 className="font-bold text-navy mb-3">WHO 2016 Diagnostic Thresholds</h3>
        <table className="w-full text-sm">
          <thead><tr className="bg-navy text-white"><th className="p-2 text-left">Sex</th><th className="p-2">Haemoglobin</th><th className="p-2">Haematocrit</th><th className="p-2 text-left">Notes</th></tr></thead>
          <tbody>
            <tr className="border-b border-gray-100">
              <td className="p-2 font-medium">Caucasian Male</td>
              <td className="p-2 text-center font-bold text-navy">&gt;16.5 g/dL</td>
              <td className="p-2 text-center font-bold text-navy">&gt;49%</td>
              <td className="p-2 text-xs text-gray-500">Lowered from 2008 to capture masked PV</td>
            </tr>
            <tr>
              <td className="p-2 font-medium">Caucasian Female</td>
              <td className="p-2 text-center font-bold text-navy">&gt;16.0 g/dL</td>
              <td className="p-2 text-center font-bold text-navy">&gt;48%</td>
              <td className="p-2 text-xs text-gray-500">Unchanged in 2022 ICC</td>
            </tr>
          </tbody>
        </table>
        <p className="text-xs text-gray-500 mt-2 italic">Confirmed on at least 2 separate blood counts. Race-, altitude-, and sex-adjusted values required.</p>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════ PATHOGENESIS ════════════════ */
function PathogenesisTab() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-navy border-b-2 border-gold pb-2">Pathogenesis — HIF–PHD2–VHL Oxygen Sensing Pathway</h2>

      <Callout type="info" title="The Central Mechanism">
        Erythropoiesis is regulated by erythropoietin (Epo), produced by renal peritubular cells via the <strong>HIF–PHD2–VHL pathway</strong> in an oxygen-dependent manner. Disruption of this pathway — by hypoxia or mutation — leads to inappropriate Epo production and erythrocytosis.
      </Callout>

      {/* Pathway visualisation */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-5">
          <h3 className="font-bold text-blue-800 mb-3 flex items-center gap-2"><CheckCircle size={15}/>Under NORMOXIA</h3>
          {[
            "PHD2 hydroxylates HIF2-alpha at Pro405 and Pro531",
            "VHL binds hydroxylated HIF2-alpha",
            "Ubiquitin-proteasomal degradation of HIF2-alpha",
            "EPO gene NOT transcribed → Normal erythropoiesis",
          ].map((s,i) => (
            <div key={i} className="flex items-start gap-2 mb-2">
              <ArrowRight size={14} className="text-blue-500 mt-1 flex-shrink-0"/>
              <span className="text-sm text-blue-800">{s}</span>
            </div>
          ))}
        </div>
        <div className="bg-red-50 border border-red-200 rounded-xl p-5">
          <h3 className="font-bold text-red-800 mb-3 flex items-center gap-2"><AlertCircle size={15}/>Under HYPOXIA or Pathway Mutation</h3>
          {[
            "PHD2 activity reduced → HIF2-alpha NOT hydroxylated",
            "HIF2-alpha stabilised → Escapes VHL binding",
            "HIF complex binds hypoxia-responsive elements in EPO gene",
            "EPO transcription activated → ERYTHROCYTOSIS",
          ].map((s,i) => (
            <div key={i} className="flex items-start gap-2 mb-2">
              <ArrowRight size={14} className="text-red-500 mt-1 flex-shrink-0"/>
              <span className="text-sm text-red-800">{s}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm overflow-x-auto">
          <h3 className="font-bold text-navy mb-3">Key Pathway Proteins</h3>
          <table className="w-full text-xs">
            <thead><tr className="bg-navy text-white"><th className="p-2 text-left">Protein</th><th className="p-2 text-left">Gene</th><th className="p-2 text-left">Role</th></tr></thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["HIF2-alpha","EPAS1","Master transcription factor for EPO; alpha subunit regulated by oxygen"],
                ["PHD2","EGLN1","Prolyl hydroxylase; hydroxylates HIF2-alpha under normoxia — targets for destruction"],
                ["VHL","VHL","E3 ubiquitin ligase subunit; binds hydroxylated HIF2-alpha — degradation"],
                ["EPOR","EPOR","Epo receptor; gain-of-function mutations cause hypersensitivity"],
              ].map(([p,g,r]) => (
                <tr key={p} className="even:bg-gray-50">
                  <td className="p-2 font-bold text-navy">{p}</td>
                  <td className="p-2 italic text-gray-600">{g}</td>
                  <td className="p-2 text-gray-600">{r}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm overflow-x-auto">
          <h3 className="font-bold text-navy mb-3">How Causes Map to the Pathway</h3>
          <table className="w-full text-xs">
            <thead><tr className="bg-navy text-white"><th className="p-2 text-left">Mechanism</th><th className="p-2 text-left">Examples</th></tr></thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["Central hypoxia","COPD, OSA, cyanotic heart disease, high altitude"],
                ["Peripheral hypoxia","Renal artery stenosis"],
                ["High O2 affinity Hgb","HOAV, 2,3-BPG deficiency, PIEZO1"],
                ["Oxygen sensing mutation","VHL (Chuvash), PHD2, HIF2A mutations"],
                ["EPOR mutation","EPOR truncation → gain of function"],
                ["Ectopic Epo","RCC, cerebellar haemangioblastoma, uterine fibroid"],
                ["Drug-induced","Testosterone, SGLT-2i, ESAs"],
              ].map(([m,e]) => (
                <tr key={m} className="even:bg-gray-50">
                  <td className="p-2 font-medium text-gray-700">{m}</td>
                  <td className="p-2 text-gray-500">{e}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Callout type="success" title="Iron Regulation & HIF2-alpha">
        HIF2-alpha expression is modulated by iron regulatory proteins (IRP1 and IRP2) through iron-responsive elements. Deletion of Irp1 in murine models increases HIF2-alpha expression → stimulates Epo → erythrocytosis. This partly explains why HFE mutations (hereditary haemochromatosis) may drive erythrocytosis.
      </Callout>
    </div>
  );
}

/* ════════════════════════════════════════ DIAGNOSIS ══════════════════ */
function DiagnosisTab() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-navy border-b-2 border-gold pb-2">Diagnostic Algorithm</h2>

      <Callout type="danger" title="Step 1 — Always First: Exclude PV">
        Test JAK2 V617F (exon 14) AND exon 12 mutations in peripheral blood. If positive → PV pathway. If subnormal Epo with negative JAK2, consider bone marrow biopsy + CALR/MPL testing.
      </Callout>

      {/* Algorithm flow */}
      <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
        <h3 className="font-bold text-navy mb-4 flex items-center gap-2"><Microscope size={16}/>Diagnostic Flow</h3>
        <div className="space-y-2 text-sm">
          {[
            { step:"Confirm erythrocytosis", detail:"Hgb >16.5 g/dL (male) or >16 g/dL (female) on ≥2 separate FBCs", color:"bg-gray-100 border-gray-300" },
            { step:"Exclude PV", detail:"JAK2 V617F + exon 12. If positive → PV pathway (separate management)", color:"bg-red-50 border-red-300" },
            { step:"Measure serum Epo + review history", detail:"Prior FBC records, family history, medications, duration of erythrocytosis", color:"bg-blue-50 border-blue-300" },
            { step:"Longstanding / family history?", detail:"→ HEREDITARY pathway. Otherwise → ACQUIRED pathway", color:"bg-purple-50 border-purple-300" },
          ].map((s,i) => (
            <div key={i} className={cn("flex gap-3 items-start border rounded-lg p-3", s.color)}>
              <span className="flex-shrink-0 w-7 h-7 rounded-full bg-navy text-white text-xs flex items-center justify-center font-bold">{i+1}</span>
              <div><strong className="text-navy">{s.step}:</strong> <span className="text-gray-600">{s.detail}</span></div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
          <h3 className="font-bold text-navy mb-3">Serum Epo Interpretation</h3>
          <table className="w-full text-sm">
            <thead><tr className="bg-navy text-white"><th className="p-2 text-left">Epo Level</th><th className="p-2 text-left">Interpretation</th></tr></thead>
            <tbody className="divide-y divide-gray-100">
              <tr className="bg-yellow-50"><td className="p-2 font-medium">Subnormal</td><td className="p-2 text-xs">Primary erythrocytosis: EPOR mutation; or (if JAK2+) PV</td></tr>
              <tr><td className="p-2 font-medium">Normal</td><td className="p-2 text-xs">May still be hereditary (oxygen sensing mutations). Phlebotomy can falsely normalise Epo.</td></tr>
              <tr className="bg-orange-50"><td className="p-2 font-medium">Elevated</td><td className="p-2 text-xs">Secondary/acquired cause — hypoxia, ectopic production, HOAV, VHL/HIF2A/PHD2</td></tr>
            </tbody>
          </table>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
          <h3 className="font-bold text-navy mb-3">P50 Testing</h3>
          <table className="w-full text-sm">
            <thead><tr className="bg-navy text-white"><th className="p-2 text-left">P50</th><th className="p-2 text-left">Significance</th></tr></thead>
            <tbody className="divide-y divide-gray-100">
              <tr className="bg-orange-50"><td className="p-2 font-medium">&lt;24 mmHg (low)</td><td className="p-2 text-xs">High oxygen affinity — screen for HOAV, 2,3-BPG deficiency, PIEZO1, methemoglobin</td></tr>
              <tr><td className="p-2 font-medium">Normal (24–28 mmHg)</td><td className="p-2 text-xs">Oxygen sensing pathway mutations (VHL, PHD2, HIF2A) — do NOT affect P50</td></tr>
            </tbody>
          </table>
          <Callout type="warning" title="P50 Must Be Venous Blood">
            Arterial P50 can miss HOAV. Confirm venous saturation is 30–55%. At Mayo Clinic, P50 replaced by HPLC + capillary electrophoresis + mass spectrometry.
          </Callout>
        </div>
      </div>

      <Callout type="warning" title="Mayo Clinic Hereditary Erythrocytosis Panel">
        HOAV (HPLC, capillary electrophoresis, mass spec) → Sanger sequencing: HBA1/HBA2, HBB, EPOR (exon 8), VHL (exons 1–3), EGLN1/PHD2 (exons 1–5), EPAS1/HIF2A (exons 9 and 12), BPGM. Of 1,192 tested — 85 pathogenic/likely pathogenic mutations (12%) and 58 variants of uncertain significance.
      </Callout>
    </div>
  );
}

/* ════════════════════════════════════════ HEREDITARY ═════════════════ */
function HereditaryTab() {
  const causes = [
    { name:"High O2 Affinity Hgb (HOAV)", gene:"HBB/HBA1/HBA2", epo:"Normal/↑", p50:"Low <24mmHg", inh:"AD", risk:"moderate" as const, features:"103 variants in HbVar; 80% β-chain; only 1/3 develop erythrocytosis; left-shifted ODC" },
    { name:"2,3-BPG Deficiency", gene:"BPGM", epo:"Normal/↑", p50:"Low", inh:"AR", risk:"low" as const, features:"Rare; impaired 1,2-BPG → 2,3-BPG conversion; few reported cases" },
    { name:"PIEZO1 Mutation (Hereditary Xerocytosis)", gene:"PIEZO1/FAM38A", epo:"Normal/↑", p50:"Low", inh:"AD", risk:"moderate" as const, features:"~4% of idiopathic erythrocytosis; iron overload, splenomegaly, haemolysis; 68% not anaemic" },
    { name:"HIF2-alpha Mutation (Gain of function)", gene:"EPAS1", epo:"Normal/↑ (inappropriately)", p50:"Normal", inh:"AD", risk:"high" as const, features:"Thrombosis even with Hct <45% on phlebotomy. Screen for neuroendocrine tumours (phaeochromocytoma, paraganglioma). Classes 1 (tumours+) and 2 (erythrocytosis only)." },
    { name:"PHD2 Mutation (Loss of function)", gene:"EGLN1", epo:"Normal (inappropriately)", p50:"Normal", inh:"AD", risk:"low" as const, features:"Rare; P317R and P371H variants. Generally no tumours (except rare paraganglioma with H374R)" },
    { name:"VHL Mutation — Chuvash Polycythaemia", gene:"VHL (R200W homozygous)", epo:"Elevated", p50:"Normal", inh:"AR", risk:"high" as const, features:"Original Chuvashia, Russia. No tumours (unlike VHL syndrome). Mortality 47% vs 18.5% in PV. Phlebotomy WORSENS thrombosis (HR 1.9, p=.028)." },
    { name:"EPOR Mutation", gene:"EPOR (exon 8)", epo:"Subnormal", p50:"Normal", inh:"AD", risk:"low" as const, features:"1.1% of idiopathic erythrocytosis; C-terminal truncation removes SOCS3/SHP1 docking sites → Epo hypersensitivity" },
    { name:"HFE Mutations", gene:"HFE (C282Y, H63D)", epo:"Variable", p50:"Normal", inh:"AR/AD", risk:"low" as const, features:"45–55% of 'idiopathic' erythrocytosis in European cohorts; ferritin NOT always elevated" },
    { name:"EPO Gene Variants", gene:"EPO", epo:"Elevated", p50:"Normal", inh:"AD", risk:"unknown" as const, features:"Exon 2 frameshift → excess liver Epo; novel 5'-UTR variant amplifies HIF2A interaction" },
  ];

  const riskColor = { low:"green", moderate:"amber", high:"red", unknown:"muted" } as const;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-navy border-b-2 border-gold pb-2">Hereditary (Congenital) Erythrocytosis</h2>

      <Callout type="navy" title="When to Suspect Hereditary Cause">
        Children or young adults with longstanding erythrocytosis, particularly with positive family history. Hereditary forms represent the majority of longstanding erythrocytosis cases.
      </Callout>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="bg-navy text-white">
              <th className="p-3 text-left">Cause</th>
              <th className="p-3 text-left">Gene</th>
              <th className="p-3">Epo</th>
              <th className="p-3">P50</th>
              <th className="p-3">Inheritance</th>
              <th className="p-3">Thrombosis Risk</th>
              <th className="p-3 text-left">Key Features</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {causes.map(c => (
              <tr key={c.name} className="even:bg-gray-50 hover:bg-blue-50 transition-colors">
                <td className="p-3 font-semibold text-navy">{c.name}</td>
                <td className="p-3 italic text-gray-600">{c.gene}</td>
                <td className="p-3 text-center">{c.epo}</td>
                <td className="p-3 text-center">{c.p50}</td>
                <td className="p-3 text-center"><Badge variant="muted">{c.inh}</Badge></td>
                <td className="p-3 text-center"><Badge variant={riskColor[c.risk]}>{c.risk.charAt(0).toUpperCase()+c.risk.slice(1)}</Badge></td>
                <td className="p-3 text-gray-600 max-w-xs">{c.features}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Callout type="danger" title="Critical: HIF2A vs EPOR Mutations">
        Both are in the oxygen-sensing pathway — but HIF2A mutations carry HIGH thrombotic risk even with normal Hct and ongoing phlebotomy. EPOR mutations carry LOW thrombotic risk. Screen HIF2A patients for neuroendocrine tumours (phaeochromocytoma, paraganglioma, somatostatinoma).
      </Callout>

      <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
        <h3 className="font-bold text-navy mb-3">Mayo Clinic HOAV Series (n=41, median follow-up 10 years)</h3>
        <div className="grid md:grid-cols-2 gap-2">
          {[
            ["Beta-chain variants","83% (Malmo, Olympia, San Diego, Wood)"],
            ["Alpha-chain variants","17% (Dallas, Columbia-Missouri, Jackson, Wayne)"],
            ["Symptomatic (Hct-related)","56% reported ≥1 symptom"],
            ["Thrombosis rate","24% — NOT correlated with Hct or phlebotomy"],
            ["Arterial thrombosis predictors","Older age (p=.04), male sex (p=.01), CV risk factors (p=.002)"],
            ["Symptom relief from phlebotomy","42% improved; 30% developed NEW adverse symptoms"],
          ].map(([k,v]) => (
            <div key={k} className="flex gap-2 text-sm p-2 rounded bg-gray-50">
              <span className="font-medium text-navy w-52 flex-shrink-0">{k}:</span>
              <span className="text-gray-600">{v}</span>
            </div>
          ))}
        </div>
      </div>

      <Callout type="danger" title="Chuvash Polycythaemia — High Mortality Alert">
        VHL R200W mutation: Mortality 47% vs 18.5% in PV despite younger age (median 16 vs 60 years). Deaths mostly from cerebrovascular events. Phlebotomy NOT protective — may WORSEN thrombosis (HR 1.9, p=.028). Aspirin 75 mg/day not protective. Ruxolitinib showed haematological improvement in 3 patients.
      </Callout>
    </div>
  );
}

/* ════════════════════════════════════════ ACQUIRED ═══════════════════ */
function AcquiredTab() {
  const causes = [
    { name:"COPD", mech:"Chronic hypoxia → HIF2A → ↑Epo", epo:"↑", thrombosis:"VTE similar with/without erythrocytosis (19.8% vs 14%, p=.42). Phlebotomy did NOT reduce thrombosis.", tx:"Supplemental O2, smoking cessation. Phlebotomy ONLY for symptomatic Hct control." },
    { name:"OSA", mech:"Nocturnal intermittent hypoxia → Epo", epo:"Normal/↑", thrombosis:"Lower rate than COPD or PV (1.46 vs 6.24/100 person-years)", tx:"Weight loss, CPAP — reduces Hgb by 3.76 g/L and Hct by 1% in meta-analysis" },
    { name:"Cyanotic Congenital Heart Disease", mech:"Right-to-left shunt → systemic hypoxia", epo:"↑", thrombosis:"Cerebral/pulmonary thrombosis 47%/31%. Phlebotomy INCREASED cerebrovascular events. Iron deficiency strongly linked.", tx:"Avoid phlebotomy. Correct iron deficiency. HU not recommended." },
    { name:"SGLT-2 Inhibitors (Gliflozins)", mech:"HIF2A activation + hepcidin modulation + haemoconcentration", epo:"Normal/↑", thrombosis:"Mayo: 7% thrombosis despite phlebotomy. Self-limiting on discontinuation.", tx:"Do NOT stop — erythrocytosis is biomarker of cardioprotection. Monitor Hct." },
    { name:"Testosterone Therapy", mech:"Direct Epo stimulation; promotes erythropoiesis", epo:"Normal/↑", thrombosis:"Hct ≥52%: OR 1.35 (95%CI 1.13–1.61) for MACE/VTE (p<.001)", tx:"Target Hct <50%. Dose reduce. Phlebotomy if Hct >54%. Injectable > transdermal risk." },
    { name:"Post-Renal Transplant", mech:"Multifactorial — AngII, IGF-1, preserved GFR", epo:"Normal/↑", thrombosis:"5.1% VTE vs 1.2% controls (p=.086). Risk reduced by ACE-I/ARB.", tx:"ACE inhibitor (enalapril) or ARB first line. Theophylline if needed." },
    { name:"Renal Cell Carcinoma", mech:"Ectopic Epo production by tumour cells", epo:"↑↑", thrombosis:"Subacute Hct rise — distinguishing feature", tx:"Treat underlying malignancy" },
    { name:"TEMPI Syndrome", mech:"Monoclonal gammopathy-driven ectopic Epo; intrapulmonary shunting", epo:"↑↑↑ (may be >5000 mIU/mL)", thrombosis:"Rare — case reports only", tx:"Treat plasma cell dyscrasia. Telangiectasias + erythrocytosis often the first clue." },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-navy border-b-2 border-gold pb-2">Acquired (Secondary) Erythrocytosis</h2>

      <Callout type="info" title="Key Assessment for Acquired Causes">
        Arterial blood gas + overnight oximetry (hypoxia), abdominal USS (renal/hepatic tumours, RAS), echocardiogram with shunt study (cardiac causes), CT/MRI brain if neurological symptoms, thorough medication review (testosterone, SGLT-2i, ESAs).
      </Callout>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="bg-navy text-white">
              <th className="p-3 text-left">Cause</th>
              <th className="p-3 text-left">Mechanism</th>
              <th className="p-3">Epo</th>
              <th className="p-3 text-left">Thrombosis Data</th>
              <th className="p-3 text-left">Treatment</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {causes.map(c => (
              <tr key={c.name} className="even:bg-gray-50 hover:bg-blue-50 transition-colors">
                <td className="p-3 font-semibold text-navy">{c.name}</td>
                <td className="p-3 text-gray-600">{c.mech}</td>
                <td className="p-3 text-center font-medium">{c.epo}</td>
                <td className="p-3 text-gray-600">{c.thrombosis}</td>
                <td className="p-3 text-gray-600">{c.tx}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Callout type="danger" title="Phlebotomy is Often Counterproductive">
        In COPD, cyanotic heart disease, and most hereditary erythrocytosis, elevated Hgb/Hct is a PHYSIOLOGICALLY APPROPRIATE compensation. Phlebotomy removes this compensation without objective benefit. Iron deficiency from phlebotomy is itself a risk factor for cerebrovascular events in cyanotic heart disease.
      </Callout>
    </div>
  );
}

/* ════════════════════════════════════════ MANAGEMENT ═════════════════ */
function ManagementTab() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-navy border-b-2 border-gold pb-2">Management Approach</h2>

      <Callout type="danger" title="Overarching Principle (Mayo Clinic Position)">
        Cytoreductive therapy and indiscriminate phlebotomy should be AVOIDED in non-clonal erythrocytosis. Therapeutic phlebotomy is reasonable only if it demonstrably improves symptoms, with frequency driven by symptoms — NOT Hct target. Address underlying cause. Optimise cardiovascular risk.
      </Callout>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm overflow-x-auto">
          <h3 className="font-bold text-navy mb-3">Phlebotomy by Condition</h3>
          <table className="w-full text-xs">
            <thead><tr className="bg-navy text-white"><th className="p-2 text-left">Condition</th><th className="p-2">Phlebotomy</th><th className="p-2 text-left">Reason</th></tr></thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["COPD","❌ Avoid","No thrombosis benefit; no objective pulmonary benefit"],
                ["Cyanotic HD","❌ Avoid","Worsens iron deficiency; increases cerebrovascular events"],
                ["HOAV","⚠️ Symptoms only","30% develop new adverse symptoms from phlebotomy"],
                ["Chuvash VHL","❌ Avoid","Associated with INCREASED thrombosis (HR 1.9)"],
                ["HIF2A mutation","❌ Not protective","Thrombosis at Hct <45% despite phlebotomy"],
                ["Testosterone","✅ If Hct >54%","Dose reduce first; target Hct <50%"],
                ["Post-transplant","⚠️ Adjunct","ACE-I/ARB first line"],
                ["SGLT-2i","⚠️ Rarely","Do not stop drug"],
              ].map(([c,p,r]) => (
                <tr key={c} className="even:bg-gray-50">
                  <td className="p-2 font-medium text-gray-700">{c}</td>
                  <td className="p-2 text-center">{p}</td>
                  <td className="p-2 text-gray-500">{r}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm overflow-x-auto">
          <h3 className="font-bold text-navy mb-3">Specific Drug Treatments</h3>
          <table className="w-full text-xs">
            <thead><tr className="bg-navy text-white"><th className="p-2 text-left">Drug</th><th className="p-2 text-left">Indication</th><th className="p-2 text-left">Evidence</th></tr></thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["ACE inhibitor (enalapril)","Post-renal transplant","RCT: Hct 52.7→46.1% at 4 months; p=.004"],
                ["ARB (losartan)","Post-renal transplant","Comparable to enalapril; longer remission"],
                ["Theophylline","Post-renal transplant","Hct 0.58→0.46; eliminated phlebotomy need"],
                ["Ruxolitinib","Chuvash (experimental)","3 cases: haematological/symptomatic improvement"],
                ["Belzutifan (HIF2A inhibitor)","HIF2A gain-of-function","Case: rapid resolution of polycythaemia + tumour"],
                ["CPAP","OSA-related erythrocytosis","Meta-analysis: Hgb ↓3.76 g/L, Hct ↓1%"],
                ["Hydroxyurea","NOT recommended (cyanotic HD)","Myelosuppression 75%; TIA in 1 patient"],
              ].map(([d,i,e]) => (
                <tr key={d} className="even:bg-gray-50">
                  <td className="p-2 font-medium text-navy">{d}</td>
                  <td className="p-2 text-gray-600">{i}</td>
                  <td className="p-2 text-gray-500">{e}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Callout type="info" title="Thrombosis Management">
        Arterial thrombosis → antiplatelet agents. Venous thrombosis → systemic anticoagulation (DOAC or LMWH/warfarin). CV risk factors present → Aspirin 81 mg daily + risk factor modification (statins, BP control, smoking cessation, diabetes management).
      </Callout>

      <Callout type="success" title="Future Directions">
        Advances in molecular haematology may better characterise "idiopathic erythrocytosis." Gene panel sequencing improves diagnostic yield. Prospective controlled studies needed to define thrombotic risk by cause and document therapeutic value of phlebotomy.
      </Callout>
    </div>
  );
}

/* ════════════════════════════════════════ PATHWAYS ═══════════════════ */
function PathwaysTab() {
  return (
    <div className="space-y-5">
      <h2 className="text-2xl font-bold text-navy border-b-2 border-gold pb-2">Individualised Care Pathways</h2>
      <p className="text-sm text-gray-500">Click each condition to expand its step-by-step care pathway.</p>

      <PathwayCard icon={<Heart size={14}/>} title="COPD-Associated Erythrocytosis"
        steps={[
          "<strong>Confirm diagnosis:</strong> Spirometry (FEV1/FVC &lt;0.7), ABG, overnight oximetry. Ensure JAK2 negative.",
          "<strong>Assess oxygen status:</strong> PaO2 &lt;7.3 kPa at rest → LTOT. Nocturnal desaturation → nocturnal O2. Pulmonary rehab referral.",
          "<strong>Smoking cessation:</strong> Mandatory counselling + pharmacotherapy (varenicline, NRT).",
          "<strong>Cardiovascular risk:</strong> Aspirin 81 mg if CV risk factors. Statin, antihypertensive optimisation.",
          "<strong>Phlebotomy decision:</strong> Only if clearly symptomatic AND documented response. Frequency = symptom control only, NOT Hct target.",
          "<strong>Red flags:</strong> Progressive dyspnoea on LTOT → assess for cor pulmonale. Iron deficiency from phlebotomy → stop and supplement.",
        ]}
        callout="Phlebotomy did not reduce thrombosis (31% vs 22%, p=.28) and tighter Hct control provided no benefit. No objective pulmonary function improvement from phlebotomy."
      />

      <PathwayCard icon={<Pill size={14}/>} title="Testosterone Therapy-Associated Erythrocytosis"
        steps={[
          "<strong>Baseline Hct:</strong> Document before starting testosterone. Educate on risk — highest with injectable testosterone cypionate/undecanoate.",
          "<strong>Monitoring:</strong> FBC at 3 months, 6 months, then 6-monthly. Risk increases over time (38% probability at 10 years in trans men).",
          "<strong>Hct >50%:</strong> Reduce dose. Consider switching from injectable to transdermal. Advise hydration.",
          "<strong>Hct >54%:</strong> Withhold testosterone. Therapeutic phlebotomy to bring Hct &lt;50%. Resume at reduced dose.",
          "<strong>Thrombosis risk:</strong> Hct ≥52% on testosterone → OR 1.35 for MACE/VTE (p&lt;.001). Aspirin if CV risk factors.",
          "<strong>Additional risks:</strong> Smoking, older age, pulmonary disease amplify risk — address all modifiable factors.",
        ]}
      />

      <PathwayCard icon={<Stethoscope size={14}/>} title="Post-Renal Transplant Erythrocytosis (PTE)"
        steps={[
          "<strong>Identify PTE:</strong> Hct rise typically in first 2 years post-transplant. Risk factors: male, high GFR, rejection-free course, polycystic kidney disease.",
          "<strong>First-line:</strong> ACE inhibitor (enalapril 2.5–5 mg) or ARB (losartan 50 mg). Both reduce Hct within 4–8 weeks.",
          "<strong>If ACE-I/ARB insufficient:</strong> Theophylline (reduces EPO by 85%+, eliminates phlebotomy need).",
          "<strong>Phlebotomy:</strong> Adjunct only if above measures insufficient or Hct acutely elevated.",
          "<strong>Spontaneous resolution:</strong> Occurs in 25% within 2 years — reassess at 2 years.",
          "<strong>Renal artery stenosis:</strong> Doppler USS of transplant kidney if resistant to treatment.",
        ]}
      />

      <PathwayCard icon={<Dna size={14}/>} title="High Oxygen Affinity Haemoglobin Variant (HOAV)"
        steps={[
          "<strong>Diagnosis:</strong> P50 &lt;24 mmHg on venous blood, confirmed by HPLC + capillary electrophoresis + mass spectrometry.",
          "<strong>Family screening:</strong> Autosomal dominant — screen first-degree relatives.",
          "<strong>Asymptomatic patients:</strong> Observation alone. Young patients without CV risk factors: surveillance only (up to 20 years without thrombosis in one series).",
          "<strong>Symptomatic patients:</strong> Trial of phlebotomy — document response. Only 42% improve; 30% develop new adverse symptoms. Discontinue if no benefit.",
          "<strong>Thrombosis prevention:</strong> Aspirin if CV risk factors. Risk is driven by CV risk, NOT Hct level.",
          "<strong>Established thrombosis:</strong> Arterial → antiplatelet agents. Venous → anticoagulation.",
        ]}
      />

      <PathwayCard icon={<FlaskConical size={14}/>} title="Oxygen Sensing Pathway Mutations (HIF2A / PHD2 / VHL)"
        steps={[
          "<strong>Suspect when:</strong> Longstanding erythrocytosis, normal P50, Epo normal or elevated, family history.",
          "<strong>Testing:</strong> Sanger/NGS panel: VHL (exons 1–3), EGLN1/PHD2 (exons 1–5), EPAS1/HIF2A (exons 9, 12). Note: HIF2A mosaicism possible — lower variant detection threshold.",
          "<strong>HIF2A confirmed:</strong> Screen for neuroendocrine tumours (24-hr urine catecholamines/metanephrines, CT/MRI). Echo for pulmonary arterial hypertension. HIGH thrombosis risk — not Hct-dependent.",
          "<strong>VHL (Chuvash):</strong> Aggressive CV risk modification. Aspirin. Do NOT rely on phlebotomy. Ruxolitinib (experimental).",
          "<strong>PHD2:</strong> Lower thrombotic risk. Close monitoring. CV risk modification.",
          "<strong>Belzutifan:</strong> HIF2A inhibitor — currently only in Pacak-Zhuang syndrome (somatic HIF2A mutations). Not yet standard for germline.",
        ]}
        callout="In one prospective study, 5 of 8 patients with HIF2A p.M535V variant had thrombotic events vs NONE of 17 wild-type patients (p=.001). Events occurred DESPITE phlebotomy keeping Hct <45%."
      />

      <PathwayCard icon={<Activity size={14}/>} title="SGLT-2 Inhibitor (Gliflozin)-Associated Erythrocytosis"
        steps={[
          "<strong>Identify:</strong> New erythrocytosis on canagliflozin, empagliflozin, dapagliflozin, or ertugliflozin. Average Hct rise +7.4% (range 2–14.1%).",
          "<strong>Epo level:</strong> Usually normal or modestly elevated (median 10.3 mIU/mL in Mayo series).",
          "<strong>Key decision:</strong> Do NOT routinely stop SGLT-2 inhibitor — erythrocytosis reflects cardioprotective HIF2A activation.",
          "<strong>Additional predispositions:</strong> 27% in Mayo series had OSA ± smoking. Address these to reduce erythrocytosis severity.",
          "<strong>If thrombosis concern:</strong> Aspirin for CV risk factors. Phlebotomy only if very high Hct with symptomatic hyperviscosity.",
          "<strong>Self-limiting:</strong> Erythrocytosis resolves completely on drug discontinuation — confirms diagnosis.",
        ]}
      />
    </div>
  );
}

/* ════════════════════════════════════════ PEARLS ═════════════════════ */
function PearlsTab() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-navy border-b-2 border-gold pb-2">Clinical Pearls & Exam Takeaways</h2>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <h3 className="font-bold text-teal flex items-center gap-2 mb-3"><Microscope size={16}/>Diagnostic Pearls</h3>
          {[
            ["Always test JAK2 exon 12 as well as V617F","Exon 12 mutations account for ~2% of PV with isolated erythrocytosis and subnormal Epo."],
            ["P50 must be VENOUS blood","Arterial P50 can miss HOAV — confirm venous saturation is 30–55%."],
            ["Phlebotomy lowers Epo","An 'inappropriately normal' Epo may reflect prior phlebotomy — interpret in context."],
            ["PIEZO1 mutations in up to 4%","Ask about hereditary xerocytosis features: iron overload, splenomegaly, haemolysis."],
            ["HFE in 45–55% of idiopathic erythrocytosis","Screen when other causes excluded. Ferritin may NOT be elevated in all patients."],
          ].map(([t,d]) => <Callout key={t} type="navy" title={t}>{d}</Callout>)}
        </div>

        <div className="space-y-2">
          <h3 className="font-bold text-red-700 flex items-center gap-2 mb-3"><AlertTriangle size={16}/>Management Pearls</h3>
          {[
            ["Do NOT cytoreduced non-clonal erythrocytosis","No evidence of benefit; significant harm from hydroxyurea in non-PV patients."],
            ["Hct target is not the goal","Erythrocytosis is physiological compensation in COPD, cyanotic HD, and hereditary causes."],
            ["HIF2A: thrombosis occurs at normal Hct","Events documented with Hct <45% despite ongoing phlebotomy."],
            ["Iron deficiency kills in cyanotic heart disease","Strong association of iron deficiency/microcytosis with cerebrovascular events — avoid phlebotomy-induced iron deficiency."],
            ["SGLT-2 inhibitors: don't stop for erythrocytosis","The erythrocytosis is a biomarker of cardioprotective mechanism."],
          ].map(([t,d]) => <Callout key={t} type="danger" title={t}>{d}</Callout>)}
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
        <h3 className="font-bold text-navy mb-3 flex items-center gap-2"><Star size={16}/>Key Numbers to Remember</h3>
        <div className="grid md:grid-cols-2 gap-2">
          {[
            ["HOAV thrombosis rate","24% (CV-driven, not Hct-driven)"],
            ["HOAV symptom relief from phlebotomy","42% improved"],
            ["HOAV adverse symptoms FROM phlebotomy","30%"],
            ["Chuvash mortality","47% vs 18.5% in PV, despite younger age"],
            ["Post-transplant erythrocytosis incidence","8–15%"],
            ["OSA erythrocytosis prevalence (severe)","6%"],
            ["SGLT-2i Hct rise (average)","+ 7.4% from baseline"],
            ["Testosterone Hct >50% incidence","11–23.5%"],
            ["PIEZO1 in idiopathic erythrocytosis","~4%"],
            ["HFE mutations in idiopathic erythrocytosis","45–55%"],
            ["COPD erythrocytosis prevalence (WHO 2016)","6.6%"],
            ["Non-PV erythrocytosis patients without full workup","58%"],
          ].map(([k,v]) => (
            <div key={k} className="flex gap-2 text-sm p-2 rounded bg-gray-50 border border-gray-100">
              <span className="font-medium text-navy flex-shrink-0">{k}:</span>
              <span className="text-gray-600 font-bold">{v}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
        <h3 className="font-bold text-navy mb-3 flex items-center gap-2"><BookOpen size={16}/>FRCPath / FCPS Viva Points</h3>
        <div className="grid md:grid-cols-2 gap-1 text-sm">
          {[
            "Distinguish primary vs secondary vs relative (apparent) erythrocytosis",
            "Explain the HIF-PHD2-VHL pathway and how mutations cause erythrocytosis",
            "Why P50 is normal in oxygen sensing mutations but low in HOAV",
            "EPOR mechanism — C-terminal truncation removes SOCS3/SHP1 docking sites",
            "Chuvash polycythaemia: VHL R200W homozygous, high thrombosis, NO tumours",
            "HIF2A Class 1 (tumours + erythrocytosis) vs Class 2 (erythrocytosis only)",
            "Phlebotomy evidence: no objective benefit in COPD; only some symptom relief",
            "Post-transplant erythrocytosis: mechanism (AngII), treatment (ACE-I first line)",
            "Idiopathic erythrocytosis: diagnosis of exclusion, not a final answer",
            "Why SGLT-2 inhibitor erythrocytosis should not prompt drug discontinuation",
          ].map(v => (
            <div key={v} className="flex items-start gap-2 p-2 rounded hover:bg-gray-50">
              <CheckCircle size={14} className="text-green-500 mt-0.5 flex-shrink-0"/>
              <span className="text-gray-700">{v}</span>
            </div>
          ))}
        </div>
      </div>

      <Callout type="success" title="Citation">
        Gangat N, Szuber N, Tefferi A. JAK2 unmutated erythrocytosis: 2023 Update on diagnosis and management. <em>Am J Hematol.</em> 2023;98(6):965–981. doi:10.1002/ajh.26920. Division of Hematology, Mayo Clinic, Rochester, Minnesota &amp; Université de Montréal, Montréal, Canada.
      </Callout>
    </div>
  );
}
