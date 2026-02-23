"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface StudentData {
  school: string; sex: string; age: number; address: string;
  famsize: string; Pstatus: string; Medu: number; Fedu: number;
  Mjob: string; Fjob: string; reason: string; guardian: string;
  traveltime: number; studytime: number; failures: number;
  schoolsup: string; famsup: string; paid: string; activities: string;
  nursery: string; higher: string; internet: string; romantic: string;
  famrel: number; freetime: number; goout: number; Dalc: number;
  Walc: number; health: number; absences: number; subject: string;
}

type Status = "good" | "average" | "needs-improvement";

// ── SVG Icon components ──────────────────────────────────────────────────────
const I = {
  Calendar: () => <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>,
  Clipboard: () => <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>,
  Users: () => <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
  TrendingUp: () => <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>,
  Repeat: () => <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>,
  Star: () => <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" /></svg>,
  Lightning: () => <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>,
  Bulb: () => <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>,
  Clock: () => <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
  Warning: () => <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>,
  BookOpen: () => <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>,
  Globe: () => <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" /></svg>,
  Home: () => <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>,
  Ban: () => <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" /></svg>,
  Moon: () => <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>,
  Heart: () => <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>,
  GradCap: () => <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5z" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" /></svg>,
  Calculator: () => <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>,
  Pencil: () => <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>,
  Sparkles: () => <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>,
  BarChart: () => <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>,
  School: () => <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>,
  Target: () => <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
  ChevronDown: () => <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>,
  ChevronLeft: () => <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>,
  Printer: () => <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" /></svg>,
};

type IconKey = keyof typeof I;

type RecItem = { text: string; icon: IconKey };

// ── Recommendation generation ─────────────────────────────────────────────────
function generateRecommendations(data: StudentData, risk: string): RecItem[] {
  const recs: RecItem[] = [];

  if (risk === "At-risk") {
    recs.push({ icon: "Calendar", text: "Create a structured daily study schedule — divide your time by subject with fixed revision slots each evening." });
    recs.push({ icon: "Clipboard", text: "Practice past exam papers weekly to identify recurring weak areas and track your progress over time." });
    recs.push({ icon: "Users", text: "Join a study group or find a tutor — peer learning dramatically improves retention for at-risk students." });
  } else if (risk === "Average") {
    recs.push({ icon: "TrendingUp", text: "Pinpoint 2–3 weak topics per subject and dedicate focused sessions to mastering them this week." });
    recs.push({ icon: "Clipboard", text: "Simulate exam conditions with timed mock tests weekly to build speed, stamina, and reduce test anxiety." });
    recs.push({ icon: "Repeat", text: "Use spaced repetition (e.g. Anki) to keep older material fresh alongside new content." });
  } else {
    recs.push({ icon: "Star", text: "Maintain your momentum — set stretch goals like aiming for the top percentile or exploring olympiad-style problems." });
    recs.push({ icon: "Lightning", text: "Tackle advanced and cross-disciplinary problems to deepen conceptual understanding beyond the syllabus." });
    recs.push({ icon: "Users", text: "Teaching peers is one of the most effective ways to consolidate your own knowledge — consider informal tutoring." });
  }

  if (data.studytime <= 1)
    recs.push({ icon: "Clock", text: "Your study time is very low (under 2 hrs/week). Aim for at least 1–2 dedicated hours daily to see real improvement." });
  else if (data.studytime === 2)
    recs.push({ icon: "Clock", text: "You study 2–5 hrs/week — gradually increase to 1.5 hrs daily, especially in the weeks before exams." });

  if (data.absences > 15)
    recs.push({ icon: "Warning", text: `High absenteeism (${data.absences} days) is significantly hurting your learning. Prioritize attending every class you can.` });
  else if (data.absences > 5)
    recs.push({ icon: "School", text: "Try to minimize absences — each missed class creates gaps that are very hard to fill on your own." });

  if (data.failures > 0)
    recs.push({ icon: "BookOpen", text: `You've had ${data.failures} past failure(s) — revisit fundamentals in those subjects before moving to advanced topics.` });

  if (data.internet === "yes")
    recs.push({ icon: "Globe", text: "Leverage free online resources: Khan Academy, YouTube (3Blue1Brown for math, CrashCourse), and Coursera for deeper learning." });
  else
    recs.push({ icon: "BookOpen", text: "Without internet at home, make the most of your school library, textbooks, and offline practice problem sets." });

  if (data.famsup === "no" && data.schoolsup === "no")
    recs.push({ icon: "Home", text: "You're navigating studies without extra support — consider asking a teacher for guidance or connecting with classmates." });

  if (data.Dalc >= 3 || data.Walc >= 4)
    recs.push({ icon: "Ban", text: "High alcohol consumption is linked to lower academic performance. Reducing it can improve your focus and memory significantly." });

  if (data.goout >= 4)
    recs.push({ icon: "Moon", text: "Socializing is great, but balance is key. Try keeping weeknight outings short to protect your study routine." });

  if (data.health <= 2)
    recs.push({ icon: "Heart", text: "Your health score is low — prioritize 7–8 hours of sleep, regular exercise, and nutritious meals for better brain performance." });

  if (data.romantic === "yes" && risk === "At-risk")
    recs.push({ icon: "Target", text: "While relationships are important, ensure your studies remain a priority — try setting shared academic goals with your partner." });

  if (data.higher === "yes")
    recs.push({ icon: "GradCap", text: "Since you're aiming for higher education, research entrance requirements early and align your study goals accordingly." });

  if (data.subject === "math")
    recs.push({ icon: "Calculator", text: "For mathematics: don't just read solutions — practice solving problems from scratch daily, even if just 5 problems per session." });
  else
    recs.push({ icon: "Pencil", text: "For Portuguese: focus on reading comprehension, essay structure, and vocabulary by writing short paragraphs daily." });

  return recs;
}

// ── Score thresholds ──────────────────────────────────────────────────────────
// ≥ 15 → High-performing | 10–14 → Average | < 10 → At-risk
function gradeToRisk(score: number): string {
  if (score >= 15) return "High-performing";
  if (score >= 10) return "Average";
  return "At-risk";
}

const mapRecs = (texts: string[]): RecItem[] => {
  return texts.map(text => {
    let icon: IconKey = "Sparkles";
    const lower = text.toLowerCase();
    if (lower.includes("study time") || lower.includes("hrs/week")) icon = "Clock";
    else if (lower.includes("schedule") || lower.includes("calendar")) icon = "Calendar";
    else if (lower.includes("exam") || lower.includes("practice")) icon = "Clipboard";
    else if (lower.includes("group") || lower.includes("peer") || lower.includes("tutor")) icon = "Users";
    else if (lower.includes("momentum") || lower.includes("percentile") || lower.includes("stretch")) icon = "Star";
    else if (lower.includes("absences") || lower.includes("class")) icon = "School";
    else if (lower.includes("fail") || lower.includes("fundamentals")) icon = "Warning";
    else if (lower.includes("internet") || lower.includes("online")) icon = "Globe";
    else if (lower.includes("health") || lower.includes("sleep")) icon = "Heart";
    else if (lower.includes("alcohol") || lower.includes("consumption")) icon = "Ban";
    else if (lower.includes("socializing") || lower.includes("outing")) icon = "Moon";
    else if (lower.includes("math")) icon = "Calculator";
    else if (lower.includes("portuguese") || lower.includes("vocabulary")) icon = "Pencil";
    return { text, icon };
  });
};

function calcRiskLocally(d: StudentData): string {
  let s = 0;
  if (d.failures > 0) s += d.failures * 3;
  if (d.absences > 10) s += 2;
  if (d.absences > 20) s += 2;
  if (d.studytime < 2) s += 3;
  if (d.Dalc > 2 || d.Walc > 3) s += 2;
  if (d.goout > 3) s += 1;
  if (d.higher === "yes") s -= 2;
  if (d.famsup === "yes") s -= 1;
  if (d.studytime >= 3) s -= 2;
  if (d.Medu >= 3 || d.Fedu >= 3) s -= 1;
  if (d.internet === "yes") s -= 1;
  if (d.paid === "yes") s -= 1;
  if (s >= 5) return "At-risk";
  if (s >= 0) return "Average";
  return "High-performing";
}

function calcGradeLocally(d: StudentData, risk: string): number {
  let base = risk === "High-performing" ? 16 : risk === "Average" ? 12 : 8;
  if (d.studytime >= 3) base += 1;
  if (d.failures > 0) base -= d.failures * 1.5;
  if (d.higher === "yes") base += 0.5;
  if (d.absences > 15) base -= 1.5;
  else if (d.absences > 5) base -= 0.5;
  return Math.max(0, Math.min(20, base));
}

// ── Component ─────────────────────────────────────────────────────────────────
export default function Recommendations() {
  const router = useRouter();
  const [data, setData] = useState<StudentData | null>(null);
  const [risk, setRisk] = useState("");
  const [score, setScore] = useState(0);
  const [recs, setRecs] = useState<RecItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState<number | null>(null);

  useEffect(() => {
    (async () => {
      const raw = sessionStorage.getItem("studentData");
      if (!raw) { router.push("/form"); return; }
      const sd: StudentData = JSON.parse(raw);
      setData(sd);

      let finalGrade: number;
      let finalRisk: string;

      // Try stored prediction
      const stored = sessionStorage.getItem("prediction");
      if (stored) {
        try {
          const pred = JSON.parse(stored);
          finalGrade = pred.predictedGrade ?? calcGradeLocally(sd, calcRiskLocally(sd));
          finalRisk = gradeToRisk(finalGrade);
          setScore(finalGrade); setRisk(finalRisk);
          if (pred.recommendations && Array.isArray(pred.recommendations)) {
            setRecs(mapRecs(pred.recommendations));
          } else {
            setRecs(generateRecommendations(sd, finalRisk));
          }
          setLoading(false); return;
        } catch { }
      }

      // Try API
      let apiRecs: string[] | null = null;
      try {
        const res = await fetch("/api/predict", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(sd) });
        if (!res.ok) throw new Error();
        const result = await res.json();
        finalGrade = result.predictedGrade ?? calcGradeLocally(sd, calcRiskLocally(sd));
        apiRecs = result.recommendations;
      } catch {
        const r = calcRiskLocally(sd);
        finalGrade = calcGradeLocally(sd, r);
      }

      finalRisk = gradeToRisk(finalGrade);
      setScore(finalGrade); setRisk(finalRisk);

      if (apiRecs && Array.isArray(apiRecs)) {
        setRecs(mapRecs(apiRecs));
      } else {
        setRecs(generateRecommendations(sd, finalRisk));
      }
      setLoading(false);
    })();
  }, [router]);

  if (loading || !data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-violet-50 to-fuchsia-50">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 mx-auto relative">
            <div className="absolute inset-0 rounded-full border-4 border-violet-200" />
            <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-violet-600 animate-spin" />
          </div>
          <p className="text-slate-500 font-medium">Analyzing your profile…</p>
        </div>
      </div>
    );
  }

  // ── Derived display values ───────────────────────────────────────────────
  const riskCfg = {
    "At-risk": { textColor: "text-red-600", bg: "bg-red-50", border: "border-red-200", dot: "bg-red-500", subtitle: "Needs focused improvement" },
    "Average": { textColor: "text-amber-600", bg: "bg-amber-50", border: "border-amber-200", dot: "bg-amber-500", subtitle: "Room to grow significantly" },
    "High-performing": { textColor: "text-emerald-600", bg: "bg-emerald-50", border: "border-emerald-200", dot: "bg-emerald-500", subtitle: "Excellent — keep it up!" },
  }[risk] ?? { textColor: "text-amber-600", bg: "bg-amber-50", border: "border-amber-200", dot: "bg-amber-500", subtitle: "" };

  const gaugeColor = score >= 15 ? "#10b981" : score >= 10 ? "#f59e0b" : "#ef4444";
  const circ = 2 * Math.PI * 52;
  const dash = (score / 20) * circ;

  const statusColors: Record<Status, { bar: string; badge: string }> = {
    "good": { bar: "from-emerald-400 to-emerald-500", badge: "bg-emerald-100 text-emerald-700" },
    "average": { bar: "from-amber-400 to-amber-500", badge: "bg-amber-100 text-amber-700" },
    "needs-improvement": { bar: "from-red-400 to-red-500", badge: "bg-red-100 text-red-700" },
  };

  type Factor = { label: string; value: number; max: number; status: Status; display: string; Icon: IconKey };
  const factors: Factor[] = [
    {
      label: "Study Time", value: data.studytime, max: 4,
      status: data.studytime >= 3 ? "good" : data.studytime >= 2 ? "average" : "needs-improvement",
      display: ["< 2 hrs", "2–5 hrs", "5–10 hrs", "> 10 hrs"][data.studytime - 1] ?? `${data.studytime}`, Icon: "BookOpen"
    },
    {
      label: "Past Failures", value: 4 - data.failures, max: 4,
      status: data.failures === 0 ? "good" : data.failures === 1 ? "average" : "needs-improvement",
      display: `${data.failures} failure${data.failures !== 1 ? "s" : ""}`, Icon: "Warning"
    },
    {
      label: "Absences", value: Math.max(0, 30 - Math.min(30, data.absences)), max: 30,
      status: data.absences < 5 ? "good" : data.absences < 15 ? "average" : "needs-improvement",
      display: `${data.absences} days`, Icon: "School"
    },
    {
      label: "Family Support", value: data.famsup === "yes" ? 5 : 1, max: 5,
      status: data.famsup === "yes" ? "good" : "needs-improvement",
      display: data.famsup === "yes" ? "Yes" : "No", Icon: "Home"
    },
    {
      label: "Higher Ed Goal", value: data.higher === "yes" ? 5 : 1, max: 5,
      status: data.higher === "yes" ? "good" : "needs-improvement",
      display: data.higher === "yes" ? "Yes" : "No", Icon: "GradCap"
    },
    {
      label: "Health", value: data.health, max: 5,
      status: data.health >= 4 ? "good" : data.health >= 3 ? "average" : "needs-improvement",
      display: `${data.health}/5`, Icon: "Heart"
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-violet-50 to-fuchsia-50 py-10 px-4">
      <div className="max-w-3xl mx-auto space-y-6">

        {/* Header */}
        <div className="text-center">
          <Link href="/" className="inline-block">
            <span className="text-3xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-fuchsia-600">
              LearnScope.ai
            </span>
          </Link>
          <h2 className="mt-3 text-xl font-bold text-slate-700">Your Personalized Study Plan</h2>
        </div>

        {/* Score + Risk */}
        <div className="bg-white rounded-3xl shadow-xl shadow-violet-100 border border-violet-100 p-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 items-center">

            {/* Gauge */}
            <div className="flex flex-col items-center gap-4">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Predicted Final Grade</p>
              <div className="relative w-36 h-36">
                <svg className="w-36 h-36 -rotate-90" viewBox="0 0 120 120">
                  <circle cx="60" cy="60" r="52" fill="none" stroke="#e2e8f0" strokeWidth="10" />
                  <circle cx="60" cy="60" r="52" fill="none" strokeWidth="10" strokeLinecap="round"
                    strokeDasharray={`${dash} ${circ}`}
                    style={{ stroke: gaugeColor, transition: "stroke-dasharray 1s ease" }}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-4xl font-black text-slate-800">{score.toFixed(1)}</span>
                  <span className="text-xs font-semibold text-slate-400">out of 20</span>
                </div>
              </div>
              {/* Legend */}
              <div className="flex gap-3 text-xs font-semibold text-slate-500">
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-red-400 inline-block" />Below 10</span>
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block" />10 – 14</span>
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-emerald-400 inline-block" />15+</span>
              </div>
            </div>

            {/* Level badge */}
            <div className="flex flex-col items-center gap-4">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Performance Level</p>
              <div className={`w-full px-6 py-6 rounded-2xl border-2 ${riskCfg.bg} ${riskCfg.border} flex flex-col items-center gap-2`}>
                <div className={`w-3 h-3 rounded-full ${riskCfg.dot} animate-pulse`} />
                <span className={`text-2xl font-black ${riskCfg.textColor}`}>{risk}</span>
                <p className="text-xs text-slate-500 text-center">{riskCfg.subtitle}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Factor Analysis */}
        <div className="bg-white rounded-3xl shadow-xl shadow-violet-100 border border-violet-100 p-8">
          <h3 className="text-lg font-black text-slate-800 mb-6 flex items-center gap-2.5">
            <span className="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center text-white">
              <I.BarChart />
            </span>
            Key Factor Analysis
          </h3>
          <div className="space-y-5">
            {factors.map((f, idx) => {
              const sc = statusColors[f.status];
              const Icon = I[f.Icon];
              return (
                <div key={idx} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                      <span className="text-slate-400"><Icon /></span>
                      {f.label}
                      <span className="text-slate-400 font-normal text-xs">({f.display})</span>
                    </span>
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${sc.badge}`}>
                      {f.status === "good" ? "Good" : f.status === "average" ? "Average" : "Needs Work"}
                    </span>
                  </div>
                  <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full bg-gradient-to-r ${sc.bar} transition-all duration-700`}
                      style={{ width: `${(f.value / f.max) * 100}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recommendations */}
        <div className="bg-white rounded-3xl shadow-xl shadow-violet-100 border border-violet-100 p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center text-white">
              <I.Sparkles />
            </div>
            <div>
              <h3 className="text-lg font-black text-slate-800">Personalized Recommendations</h3>
              <p className="text-xs text-slate-400">{recs.length} tailored suggestions for you</p>
            </div>
          </div>

          <div className="space-y-2.5">
            {recs.map((rec, idx) => {
              const isOpen = open === idx;
              const Icon = I[rec.icon];
              return (
                <button key={idx} type="button"
                  onClick={() => setOpen(isOpen ? null : idx)}
                  className={`w-full text-left p-4 rounded-2xl border-2 transition-all duration-200 ${isOpen ? "border-violet-300 bg-violet-50" : "border-slate-100 hover:border-violet-200 hover:bg-violet-50/50"
                    }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center transition-all ${isOpen ? "bg-violet-500 text-white" : "bg-slate-100 text-slate-500"
                      }`}>
                      <Icon />
                    </div>
                    <p className={`flex-1 text-sm font-semibold leading-snug ${isOpen ? "text-violet-700" : "text-slate-700"}`}>
                      {rec.text}
                    </p>
                    <span className={`flex-shrink-0 text-slate-400 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}>
                      <I.ChevronDown />
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 pb-6">
          <Link href="/form"
            className="flex-1 py-4 rounded-2xl border-2 border-slate-200 text-slate-600 font-bold text-center hover:bg-slate-50 transition-all flex items-center justify-center gap-2"
          >
            <I.ChevronLeft /> Edit Profile
          </Link>
          <button onClick={() => window.print()}
            className="flex-1 py-4 rounded-2xl bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-bold shadow-lg shadow-violet-200 hover:shadow-xl hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
          >
            <I.Printer /> Save Report
          </button>
        </div>

      </div>
    </div>
  );
}