import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const studentData = await request.json();

    // Try Python backend first
    const pythonBackendUrl = process.env.PYTHON_BACKEND_URL || 'http://localhost:5000/predict';
    try {
      const response = await fetch(pythonBackendUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(studentData),
        // Short timeout so we fallback quickly if backend is down
        signal: AbortSignal.timeout(3000),
      });

      if (!response.ok) throw new Error(`Backend returned ${response.status}`);

      const prediction = await response.json();
      const risk = prediction.risk_level || calculateMockRisk(studentData);
      return NextResponse.json({
        predictedGrade: prediction.predicted_grade ?? calculateMockGrade(studentData),
        riskLevel: risk,
        confidence: prediction.confidence ?? 0.85,
        recommendations: generateRichRecommendations(studentData, risk),
        fromModel: true,
      });
    } catch {
      // Fallback to local calculation
      if (process.env.NODE_ENV === 'development') {
        console.debug('Python backend unavailable, using fallback predictions');
      }
    }

    const risk = calculateMockRisk(studentData);
    return NextResponse.json({
      predictedGrade: calculateMockGrade(studentData),
      riskLevel: risk,
      confidence: 0.75,
      recommendations: generateRichRecommendations(studentData, risk),
      fromModel: false,
    });

  } catch (error) {
    return NextResponse.json({ error: 'Failed to process prediction' }, { status: 500 });
  }
}

function calculateMockGrade(data: Record<string, any>): number {
  let score = 12;
  if (data.studytime >= 3) score += 2;
  else if (data.studytime === 2) score += 0.5;
  if (data.higher === 'yes') score += 1;
  if (data.famsup === 'yes') score += 0.5;
  if (data.internet === 'yes') score += 0.5;
  if (data.failures > 0) score -= data.failures * 2;
  if (data.absences > 15) score -= 2;
  else if (data.absences > 5) score -= 0.5;
  if (data.goout > 3) score -= 1;
  if (data.Dalc > 2) score -= 1;
  if (data.Walc > 3) score -= 1;
  return Math.max(0, Math.min(20, score));
}

function calculateMockRisk(data: Record<string, any>): string {
  let riskScore = 0;
  if (data.failures > 0) riskScore += data.failures * 3;
  if (data.absences > 10) riskScore += 2;
  if (data.absences > 20) riskScore += 2;
  if (data.studytime < 2) riskScore += 3;
  if (data.Dalc > 2 || data.Walc > 3) riskScore += 2;
  if (data.goout > 3) riskScore += 1;
  if (data.higher === 'yes') riskScore -= 2;
  if (data.famsup === 'yes') riskScore -= 1;
  if (data.studytime >= 3) riskScore -= 2;
  if ((data.Medu ?? 0) >= 3 || (data.Fedu ?? 0) >= 3) riskScore -= 1;
  if (data.internet === 'yes') riskScore -= 1;
  if (data.paid === 'yes') riskScore -= 1;
  if (riskScore >= 5) return 'At-risk';
  if (riskScore >= 0) return 'Average';
  return 'High-performing';
}

function generateRichRecommendations(data: Record<string, any>, risk: string): string[] {
  const recs: string[] = [];

  // Risk-level base
  if (risk === 'At-risk') {
    recs.push("⚠️ Create a structured daily study schedule — divide your time by subject with fixed revision slots each evening.");
    recs.push("📋 Practice past exam papers weekly to identify recurring weak areas and track your progress over time.");
    recs.push("🤝 Join a study group or find a tutor — peer learning dramatically improves retention for at-risk students.");
  } else if (risk === 'Average') {
    recs.push("📈 You're on the right path — pinpoint 2–3 weak topics per subject and dedicate focused sessions to mastering them.");
    recs.push("⏱️ Simulate exam conditions with timed mock tests weekly to build speed, stamina, and reduce test anxiety.");
    recs.push("🔁 Use spaced repetition (e.g. Anki) to review older material so it stays fresh alongside new content.");
  } else {
    recs.push("🌟 Maintain your momentum — set stretch goals like aiming for top percentile or exploring olympiad-style problems.");
    recs.push("🧩 Tackle advanced and cross-disciplinary problems to deepen conceptual understanding beyond the syllabus.");
    recs.push("💡 Teaching peers is one of the best ways to solidify your own knowledge — consider informal tutoring sessions.");
  }

  // Study time
  if (data.studytime <= 1) {
    recs.push("⏰ Your study time is very low (under 2 hrs/week). Aim for at least 1–2 dedicated hours daily to see real improvement.");
  } else if (data.studytime === 2) {
    recs.push("📚 You study 2–5 hrs/week — gradually increase to 1.5 hrs daily, especially in the weeks leading up to exams.");
  }

  // Absences
  if (data.absences > 15) {
    recs.push(`🚨 High absenteeism (${data.absences} days) is significantly hurting your learning. Prioritize attending every class you can.`);
  } else if (data.absences > 5) {
    recs.push("🏫 Try to minimize absences — each missed class creates gaps that are hard to fill on your own.");
  }

  // Failures
  if (data.failures > 0) {
    recs.push(`📖 You've had ${data.failures} past failure(s) — revisit fundamentals in those subjects before moving to advanced topics.`);
  }

  // Internet (using raw value, not encoded)
  if (data.internet === 'yes') {
    recs.push("💻 Leverage free online resources: Khan Academy, YouTube (3Blue1Brown for math, CrashCourse), and Coursera for deeper learning.");
  } else {
    recs.push("📕 Without internet at home, make the most of your school library, textbooks, and offline practice problem sets.");
  }

  // Family support
  if (data.famsup === 'no' && data.schoolsup === 'no') {
    recs.push("🏠 You're navigating studies without extra support — consider asking a teacher for guidance or connecting with classmates for help.");
  }

  // Alcohol
  if ((data.Dalc ?? 1) >= 3 || (data.Walc ?? 1) >= 4) {
    recs.push("🔴 High alcohol consumption is linked to lower academic performance. Reducing consumption can improve focus and memory significantly.");
  }

  // Social life
  if ((data.goout ?? 1) >= 4) {
    recs.push("🌙 Socializing is great, but balance is key. Try keeping weeknight outings short to protect your study routine.");
  }

  // Health
  if ((data.health ?? 3) <= 2) {
    recs.push("💚 Your health score is low — prioritize 7–8 hours of sleep, regular exercise, and nutritious meals for better brain performance.");
  }

  // Subject-specific
  if (data.subject === 'math') {
    recs.push("🔢 For mathematics: don't just read solutions — practice solving problems from scratch daily, even if just 5 problems per session.");
  } else {
    recs.push("📝 For Portuguese: focus on reading comprehension, essay structure, and vocabulary by writing short paragraphs daily.");
  }

  // Higher education
  if (data.higher === 'yes') {
    recs.push("🎓 Since you're aiming for higher education, start researching entrance requirements early and align your study goals accordingly.");
  }

  return recs;
}