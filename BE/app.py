from flask import Flask, request, jsonify
from flask_cors import CORS
import google.generativeai as genai
import os

# Initialize Flask app and CORS
app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "*"}})

# Configure Gemini API (store API key securely)
genai.configure(api_key="AIzaSyD11x7YdsSrlBqmvq0TSHrnDaDNPenDkoQ")  # Use environment variables

# Set up model configuration
generation_config = {
    "temperature": 1,
    "top_p": 0.95,
    "top_k": 40,
    "max_output_tokens": 8192,
    "response_mime_type": "application/json",  # Change from "text/json" to "application/json"
}


# Initialize the model
model = genai.GenerativeModel(model_name="gemini-1.5-pro", generation_config=generation_config)

def analyze_resume(job_description, resume):
    try:
        # Construct the prompt for Gemini AI
        prompt = f"""
        Analyze the following resume against this job description:
        
        Job Description:
        {job_description}
        
        Resume:
        {resume}
        
        Return a JSON response with:
        - ATS score (percentage)
        - Keyword match percentage
        - Format score
        - Missing keywords
        - Strengths
        - Suggestions for improvement
        """

        # Start chat session and get response
        chat_session = model.start_chat(history=[])
        response = chat_session.send_message(prompt)

        if not response:
            return jsonify({'error': 'No response from AI model'}), 500

        # Attempt to parse the AI response into structured JSON
        print(response.text)
        return jsonify(response.text)  

    except Exception as e:
        print(f"Error: {str(e)}")
        return jsonify({'error': 'Failed to analyze resume'}), 500


# Define API route
@app.route('/api/analyze', methods=['POST'])
def analyze():
    try:
        data = request.get_json()
        job_description = data.get('jobDescription', '').strip()
        resume = data.get('resume', '').strip()

        if not job_description or not resume:
            return jsonify({'error': 'Both job description and resume are required.'}), 400

        # Call analysis function
        return analyze_resume(job_description, resume)

    except Exception as e:
        return jsonify({'error': str(e)}), 500


if __name__ == '__main__':
    app.run(debug=True, port=5000)
