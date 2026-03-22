from flask import Flask, request, jsonify
from flask_cors import CORS
from groq import Groq
from dotenv import load_dotenv
import os
import json

load_dotenv()

app = Flask(__name__)
CORS(app)

client = Groq(api_key=os.environ.get("GROQ_API_KEY"))

@app.route("/api/health")
def health():
    return jsonify({"status": "ok", "engine": "groq"})

@app.route("/api/translate", methods=["POST"])
def translate():
    data = request.get_json(force=True)
    raw_text = data.get("text", "").strip()
    if not raw_text:
        return jsonify({"error": "No text provided"}), 400
    try:
        response = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[
                {
                    "role": "system",
                    "content": """You are an expert career consultant specializing in translating Indian government and military service experience into corporate language. When given a description of someone's service (in ANY Indian language or English), return ONLY a valid JSON object with these fields:
- translated_profile: 2-3 paragraph corporate bio
- skills_tags: array of 6-10 corporate skill tags
- job_titles: array of 3 suitable corporate job titles
- experience_level: one of Executive, Senior, Mid-Level, Junior
No explanation. No markdown. Just JSON."""
                },
                {
                    "role": "user",
                    "content": f"Translate this service experience:\n\n{raw_text}"
                }
            ],
            temperature=0.7,
            max_tokens=1024,
        )
        result_text = response.choices[0].message.content.strip()
        if result_text.startswith("```"):
            result_text = result_text.split("```")[1]
            if result_text.startswith("json"):
                result_text = result_text[4:]
        result = json.loads(result_text)
        return jsonify(result)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/api/jobs")
def get_jobs():
    jobs = [
        {"id": "1", "title": "Chief Security Officer", "company": "Tata Consultancy Services", "type": "Full-time", "location": "Mumbai", "salary": "40L - 60L", "skills": ["Security Management", "Risk Assessment", "Team Leadership"], "match_score": 94, "rank_tier": "senior"},
        {"id": "2", "title": "Compliance Director", "company": "HDFC Bank", "type": "Full-time", "location": "Delhi", "salary": "35L - 50L", "skills": ["Regulatory Compliance", "Risk Management", "Governance"], "match_score": 88, "rank_tier": "senior"},
        {"id": "3", "title": "Operations Head", "company": "Mahindra Defence", "type": "Full-time", "location": "Pune", "salary": "25L - 40L", "skills": ["Operations Management", "Logistics", "Team Leadership"], "match_score": 82, "rank_tier": "mid"},
        {"id": "4", "title": "Security Supervisor", "company": "G4S India", "type": "Full-time", "location": "Bangalore", "salary": "8L - 14L", "skills": ["Physical Security", "Team Management", "Surveillance"], "match_score": 91, "rank_tier": "jco_or"},
        {"id": "5", "title": "Advisory Board Member", "company": "StartupIndia Ventures", "type": "Advisory", "location": "Remote", "salary": "5L - 10L per year", "skills": ["Strategic Planning", "Mentorship", "Governance"], "match_score": 79, "rank_tier": "senior"},
        {"id": "6", "title": "Logistics Manager", "company": "Blue Dart Express", "type": "Full-time", "location": "Chennai", "salary": "12L - 20L", "skills": ["Logistics", "Supply Chain", "Operations"], "match_score": 85, "rank_tier": "mid"}
    ]
    return jsonify(jobs)

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(debug=False, host="0.0.0.0", port=port)