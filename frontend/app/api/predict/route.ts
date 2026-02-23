import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const studentData = await request.json();

    // Call Python backend API
    const pythonBackendUrl = process.env.PYTHON_BACKEND_URL || 'http://localhost:5000/predict';

    try {
      const response = await fetch(pythonBackendUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(studentData),
      });

      if (!response.ok) {
        throw new Error(`Backend returned ${response.status}`);
      }

      const prediction = await response.json();

      return NextResponse.json({
        predictedGrade: prediction.predicted_grade,
        riskLevel: prediction.risk_level,
        confidence: prediction.confidence,
        recommendations: prediction.recommendations,
        fromModel: true,
      });
    } catch (backendError) {
      // Fallback: use mock predictions if backend is not available
      if (process.env.NODE_ENV === 'development') {
        console.debug('Python backend unavailable, using fallback predictions');
      }

      const mockPrediction = {
        predictedGrade: calculateMockGrade(studentData),
        riskLevel: calculateMockRisk(studentData),
        confidence: 0.85,
        recommendations: generateMockRecommendations(studentData),
        fromModel: false,
      };

      return NextResponse.json(mockPrediction);
    }
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to process prediction' },
      { status: 500 }
    );
  }
}

function calculateMockGrade(data: any): number {
  let score = 12;

  // Positive factors
  if (data.studytime >= 3) score += 2;
  if (data.higher === 'yes') score += 1;
  if (data.famsup === 'yes') score += 1;
  if (data.internet === 'yes') score += 0.5;

  // Negative factors
  if (data.failures > 0) score -= data.failures * 2;
  if (data.absences > 10) score -= 2;
  if (data.goout > 3) score -= 1;

  return Math.max(0, Math.min(20, score));
}

function calculateMockRisk(data: any): string {
  const grade = calculateMockGrade(data);

  if (grade < 10) return 'At-risk';
  if (grade < 15) return 'Average';
  return 'High-performing';
}

function generateMockRecommendations(data: any): string[] {
  const recs: string[] = [];

  if (data.studytime < 2) {
    recs.push('Increase daily study time to at least 2-3 hours');
  }

  if (data.failures > 0) {
    recs.push('Focus on subjects where you have had past failures');
  }

  if (data.absences > 10) {
    recs.push('Improve attendance - regular class participation is crucial');
  }

  return recs;
}
