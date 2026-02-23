def generate_recommendations(student_row, predicted_risk):
    recommendations = []

    if predicted_risk == "At-risk":
        recommendations.append("Create a structured daily study schedule with fixed revision slots for each subject every evening.")
        recommendations.append("Practice past exam papers weekly to identify recurring weak areas and track your progress over time.")
        recommendations.append("Join a study group or find a tutor — peer learning dramatically improves retention for at-risk students.")
    elif predicted_risk == "Average":
        recommendations.append("Pinpoint 2-3 weak topics per subject and dedicate focused sessions to mastering them this week.")
        recommendations.append("Simulate exam conditions with timed mock tests weekly to build speed, stamina, and reduce test anxiety.")
        recommendations.append("Use spaced repetition (e.g. Anki flashcards) to keep older material fresh alongside new content.")
    elif predicted_risk == "High-performing":
        recommendations.append("Maintain your momentum — set stretch goals like aiming for the top percentile or exploring olympiad-style problems.")
        recommendations.append("Tackle advanced and cross-disciplinary problems to deepen conceptual understanding beyond the syllabus.")
        recommendations.append("Teaching peers is one of the best ways to solidify your own knowledge — consider informal tutoring.")

    if "studytime" in student_row:
        if student_row["studytime"] <= 1:
            recommendations.append("Your study time is very low (under 2 hrs/week). Aim for at least 1-2 dedicated hours daily to see real improvement.")
        elif student_row["studytime"] == 2:
            recommendations.append("You study 2-5 hrs/week — gradually increase to 1.5 hrs daily, especially in the weeks leading up to exams.")

    if "absences" in student_row:
        if student_row["absences"] > 15:
            recommendations.append(f"High absenteeism ({student_row['absences']} days) is significantly hurting your learning. Prioritize attending every class you can.")
        elif student_row["absences"] > 5:
            recommendations.append("Try to minimize absences — each missed class creates gaps that are hard to fill on your own.")

    if "failures" in student_row and student_row["failures"] > 0:
        recommendations.append(f"You've had {student_row['failures']} past failure(s) — revisit fundamentals in those subjects before moving to advanced topics.")

    internet = student_row.get("internet", "yes")
    if internet == "yes":
        recommendations.append("Leverage free online resources: Khan Academy, YouTube (3Blue1Brown for math), and Coursera for deeper learning.")
    else:
        recommendations.append("Without internet at home, make the most of your school library, textbooks, and offline practice problem sets.")

    famsup = student_row.get("famsup", "yes")
    schoolsup = student_row.get("schoolsup", "no")
    if famsup == "no" and schoolsup == "no":
        recommendations.append("You're navigating studies without extra support — consider asking a teacher for guidance or connecting with classmates for help.")

    dalc = student_row.get("Dalc", 1)
    walc = student_row.get("Walc", 1)
    if dalc >= 3 or walc >= 4:
        recommendations.append("High alcohol consumption is linked to lower academic performance. Reducing it can improve focus and memory significantly.")

    if student_row.get("goout", 1) >= 4:
        recommendations.append("Balance is key — try keeping weeknight outings short to protect your study routine and energy levels.")

    if student_row.get("health", 3) <= 2:
        recommendations.append("Your health score is low — prioritize 7-8 hours of sleep, regular exercise, and nutritious meals for better brain performance.")

    subject = student_row.get("subject", "math")
    if subject == "math":
        recommendations.append("For mathematics: don't just read solutions — practice solving problems from scratch daily, even if just 5 problems per session.")
    else:
        recommendations.append("For Portuguese: focus on reading comprehension, essay structure, and vocabulary by writing short paragraphs daily.")

    if student_row.get("higher") == "yes":
        recommendations.append("Since you're aiming for higher education, research entrance requirements early and align your study goals accordingly.")

    if len(recommendations) == 0:
        recommendations.append("Maintain regular study habits, track your academic progress weekly, and don't hesitate to seek help when needed.")

    return recommendations