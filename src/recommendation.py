import random

def generate_recommendations(student_row, predicted_risk):
    recommendations = []
    
    # 1. CORE ADVICE POOLS (BY RISK LEVEL)
    risk_pools = {
        "At-risk": [
            "Create a structured daily study schedule with fixed revision slots for each subject.",
            "Practice past exam papers weekly to identify recurring weak areas and track your progress.",
            "Join a study group or find a tutor — peer learning dramatically improves retention for at-risk students.",
            "Schedule a meeting with your academic advisor to discuss a personalized recovery plan.",
            "Use the 'Pomodoro Technique' (25 mins study, 5 mins break) to rebuild your focus and stamina.",
            "Break down large subjects into 15-minute 'micro-lessons' to make catching up less overwhelming.",
            "Focus on mastering the fundamentals of your weakest subject before moving to advanced topics."
        ],
        "Average": [
            "Pinpoint 2-3 weak topics per subject and dedicate focused sessions to mastering them this week.",
            "Simulate exam conditions with timed mock tests weekly to build speed and reduce test anxiety.",
            "Use spaced repetition (e.g. Anki flashcards) to keep older material fresh alongside new content.",
            "Try 'Active Recall' by testing yourself on topics immediately after reading about them.",
            "Mind mapping can help you visualize connections between complex concepts in your current syllabus.",
            "Record yourself explaining a concept out loud; listening back helps solidify memory.",
            "Increase your daily study time by just 20 minutes to transition from 'Average' to 'High-performing'."
        ],
        "High-performing": [
            "Maintain your momentum — set stretch goals like aiming for the top percentile or olympiad problems.",
            "Tackle advanced and cross-disciplinary problems to deepen conceptual understanding.",
            "Teaching peers is one of the best ways to solidify your own knowledge — consider informal tutoring.",
            "Look into academic research or personal projects related to your favorite subjects.",
            "Optimize your study environment further to enter 'Flow State' more quickly during deep work.",
            "Start preparing for university-level material in your strongest subjects to stay ahead of the curve.",
            "Apply for academic competitions or summer programs to challenge your skills against top students."
        ]
    }

    # Pick 3 random core tips
    core_pool = risk_pools.get(predicted_risk, risk_pools["Average"])
    recommendations.extend(random.sample(core_pool, min(len(core_pool), 3)))

    # 2. TRAIT-SPECIFIC POOLS (PICK ONE FROM RELEVANT POOLS)
    
    # Study Time
    st = student_row.get("studytime", 2)
    st_tips = []
    if st <= 1:
        st_tips = [
            "Your study time is very low (< 2 hrs/week). Aim for at least 1 hour daily to see a grade jump.",
            "Try a 'no-phone' study hour every evening to maximize the limited time you spend on books.",
            "Briefly review your class notes for 10 minutes every day; it's better than zero study time."
        ]
    elif st == 2:
        st_tips = [
            "Consistency is key — you're doing 2-5 hrs/week, but daily consistency will yield better results.",
            "Try to increase your study sessions by 15 minutes each to hit the next excellence tier.",
            "Use weekend mornings for deeper 'focus blocks' while your energy is highest."
        ]
    elif st >= 4:
        st_tips = [
            "You have elite study habits (> 10 hrs/week). Ensure you're getting 8 hours of sleep to match.",
            "To avoid burnout, schedule a 'complete rest day' where you don't look at any school work.",
            "Investigate 'Deep Work' techniques to make your 10+ hours even more efficient."
        ]
    if st_tips: recommendations.append(random.choice(st_tips))

    # Absences
    absences = student_row.get("absences", 0)
    if absences > 10:
        abs_tips = [
            f"High absenteeism ({absences} days) creates gaps. Ask teachers for missing handouts immediately.",
            "Prioritize attending Monday and Friday classes as these often bookend critical weekly topics.",
            "If you must miss class, ensure you have a 'notetaking buddy' to stay caught up in real-time."
        ]
        recommendations.append(random.choice(abs_tips))

    # Failures
    failures = student_row.get("failures", 0)
    if failures > 0:
        fail_tips = [
            f"You've had {failures} past failure(s). Don't be discouraged — focus on root cause analysis.",
            "Identify if your past failures were due to test anxiety or conceptual gaps, and target accordingly.",
            "Visit your teacher's office hours this week specifically to review the topics you failed previously."
        ]
        recommendations.append(random.choice(fail_tips))

    # Support / Internet / Health
    if student_row.get("internet") == "yes":
        recommendations.append(random.choice([
            "Check out 3Blue1Brown on YouTube for visual math concepts.",
            "Use Khan Academy to practice specific topics where your textbook is confusing.",
            "Download educational apps like Quizlet to study while you're on the go."
        ]))

    if student_row.get("health", 3) <= 2:
        recommendations.append("Priority: Your health is impacting your focus. Small walks and better hydration can change your productivity.")

    if student_row.get("higher") == "yes":
        recommendations.append(random.choice([
            "University entrance exams reward consistent performers. Keep your G3 score as high as possible.",
            "Dreaming of higher ed? Start a digital portfolio of your best academic work now."
        ]))

    # Final logic for Mathematics/Portuguese
    subject = student_row.get("subject", "math")
    if subject == "math":
        recommendations.append(random.choice([
            "Math Tip: Don't just watch videos. Solve 3 problems yourself for every 1 video you watch.",
            "Focus on the 'Why' behind the formulas — it helps with long-term memory."
        ]))
    else:
        recommendations.append(random.choice([
            "Portuguese Tip: Read diverse materials — news, poetry, and science — to widen your vocabulary.",
            "Practice writing short daily summaries of articles to improve your synthesis skills."
        ]))

    # Shuffling to make the output order feel different
    random.shuffle(recommendations)
    return recommendations