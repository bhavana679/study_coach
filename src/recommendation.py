def generate_recommendations(student_row, predicted_risk):

    recommendations = []

    if predicted_risk == "At-risk":
        recommendations.append("Follow a structured weekly study plan.")
        recommendations.append("Practice previous year question papers regularly.")

    elif predicted_risk == "Average":
        recommendations.append("Focus on improving weak areas to move to high-performing level.")
        recommendations.append("Increase mock test practice.")

    elif predicted_risk == "High-performing":
        recommendations.append("Maintain consistency in preparation.")
        recommendations.append("Attempt advanced practice problems.")

    if len(recommendations) == 0:
        recommendations.append("Maintain regular study habits and track your progress.")

    return recommendations



    