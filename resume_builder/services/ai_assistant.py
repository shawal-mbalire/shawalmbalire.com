import google.generativeai as genai
import os
from typing import List, Dict, Any
import logging

logger = logging.getLogger(__name__)

class AIAssistant:
    def __init__(self):
        """Initialize the AI Assistant with Gemini Flash model"""
        api_key = os.getenv('GEMINI_API_KEY')
        if not api_key:
            raise ValueError("GEMINI_API_KEY environment variable is required")
        
        genai.configure(api_key=api_key)
        # Use Gemini 2.5 Flash model for faster responses
        self.model = genai.GenerativeModel('gemini-2.0-flash-exp')
        
    def generate_questions(self, user_profile: Dict[str, Any]) -> List[str]:
        """
        Generate personalized questions based on user profile
        
        Args:
            user_profile: Dictionary containing user information
            
        Returns:
            List of questions to help improve the resume
        """
        try:
            prompt = f"""
            Based on this professional profile, generate 5 specific questions to help improve their resume:
            
            Name: {user_profile.get('name', 'N/A')}
            Title: {user_profile.get('title', 'N/A')}
            Summary: {user_profile.get('summary', 'N/A')}
            
            Generate questions that will help:
            1. Expand on their achievements and impact
            2. Add specific metrics and quantifiable results
            3. Improve their professional summary
            4. Identify missing skills or experiences
            5. Optimize their resume for their target roles
            
            Return only the questions, one per line, without numbering.
            """
            
            response = self.model.generate_content(prompt)
            questions = [q.strip() for q in response.text.strip().split('\n') if q.strip()]
            
            # Ensure we have exactly 5 questions
            if len(questions) > 5:
                questions = questions[:5]
            elif len(questions) < 5:
                # Add default questions if not enough were generated
                default_questions = [
                    "What are your key achievements in your most recent role?",
                    "Can you quantify any of your accomplishments with specific metrics?",
                    "What skills have you developed that are most relevant to your target roles?",
                    "What challenges have you overcome that demonstrate your problem-solving abilities?",
                    "What are your career goals for the next 2-3 years?"
                ]
                questions.extend(default_questions[len(questions):])
            
            return questions
            
        except Exception as e:
            logger.error(f"Error generating questions: {e}")
            # Return default questions if AI fails
            return [
                "What are your key achievements in your most recent role?",
                "Can you quantify any of your accomplishments with specific metrics?",
                "What skills have you developed that are most relevant to your target roles?",
                "What challenges have you overcome that demonstrate your problem-solving abilities?",
                "What are your career goals for the next 2-3 years?"
            ]
    
    def improve_experience_description(self, experience: Dict[str, Any]) -> str:
        """
        Improve an experience description using AI
        
        Args:
            experience: Dictionary containing experience information
            
        Returns:
            Improved description
        """
        try:
            prompt = f"""
            Improve this job experience description to be more impactful and professional:
            
            Company: {experience.get('company', 'N/A')}
            Title: {experience.get('title', 'N/A')}
            Current Description: {experience.get('description', 'N/A')}
            
            Make it:
            - More action-oriented with strong verbs
            - Quantified with specific metrics where possible
            - Focused on achievements and impact
            - Professional and concise
            
            Return only the improved description.
            """
            
            response = self.model.generate_content(prompt)
            return response.text.strip()
            
        except Exception as e:
            logger.error(f"Error improving experience description: {e}")
            return experience.get('description', '')
    
    def generate_skills_suggestions(self, user_profile: Dict[str, Any], target_role: str = None) -> List[str]:
        """
        Generate skill suggestions based on user profile and target role
        
        Args:
            user_profile: Dictionary containing user information
            target_role: Target job role (optional)
            
        Returns:
            List of suggested skills
        """
        try:
            prompt = f"""
            Based on this professional profile, suggest relevant skills that would strengthen their resume:
            
            Name: {user_profile.get('name', 'N/A')}
            Title: {user_profile.get('title', 'N/A')}
            Summary: {user_profile.get('summary', 'N/A')}
            Target Role: {target_role or 'Similar to current role'}
            
            Suggest:
            - Technical skills relevant to their field
            - Soft skills that complement their experience
            - Emerging technologies or methodologies
            - Industry-specific skills
            
            Return only the skill names, one per line, without categories.
            """
            
            response = self.model.generate_content(prompt)
            skills = [s.strip() for s in response.text.strip().split('\n') if s.strip()]
            
            return skills[:10]  # Limit to 10 suggestions
            
        except Exception as e:
            logger.error(f"Error generating skills suggestions: {e}")
            return []
    
    def optimize_summary(self, current_summary: str, target_role: str = None) -> str:
        """
        Optimize the professional summary
        
        Args:
            current_summary: Current professional summary
            target_role: Target job role (optional)
            
        Returns:
            Optimized summary
        """
        try:
            prompt = f"""
            Optimize this professional summary to be more compelling and targeted:
            
            Current Summary: {current_summary}
            Target Role: {target_role or 'Similar to current role'}
            
            Make it:
            - More engaging and impactful
            - Focused on key achievements and value proposition
            - Tailored to the target role
            - Concise but comprehensive (2-3 sentences)
            
            Return only the optimized summary.
            """
            
            response = self.model.generate_content(prompt)
            return response.text.strip()
            
        except Exception as e:
            logger.error(f"Error optimizing summary: {e}")
            return current_summary
    
    def generate_resume_feedback(self, resume_data: Dict[str, Any]) -> Dict[str, Any]:
        """
        Generate comprehensive feedback for the resume
        
        Args:
            resume_data: Complete resume data
            
        Returns:
            Dictionary containing feedback and suggestions
        """
        try:
            prompt = f"""
            Provide comprehensive feedback for this resume:
            
            Profile: {resume_data.get('user', {})}
            Experiences: {resume_data.get('experiences', [])}
            Education: {resume_data.get('education', [])}
            Skills: {resume_data.get('skills', [])}
            
            Provide feedback on:
            1. Overall structure and flow
            2. Content quality and impact
            3. Missing elements or opportunities
            4. Specific improvements for each section
            5. ATS optimization suggestions
            
            Return the feedback in a structured format.
            """
            
            response = self.model.generate_content(prompt)
            
            return {
                "feedback": response.text.strip(),
                "score": self._calculate_resume_score(resume_data),
                "suggestions": self._extract_suggestions(response.text)
            }
            
        except Exception as e:
            logger.error(f"Error generating resume feedback: {e}")
            return {
                "feedback": "Unable to generate feedback at this time.",
                "score": 0,
                "suggestions": []
            }
    
    def _calculate_resume_score(self, resume_data: Dict[str, Any]) -> int:
        """Calculate a basic resume score based on completeness"""
        score = 0
        
        # Check profile completeness
        user = resume_data.get('user', {})
        if user.get('name'): score += 10
        if user.get('title'): score += 10
        if user.get('email'): score += 5
        if user.get('summary'): score += 15
        
        # Check experiences
        experiences = resume_data.get('experiences', [])
        if experiences:
            score += min(len(experiences) * 10, 30)
        
        # Check education
        education = resume_data.get('education', [])
        if education:
            score += min(len(education) * 5, 15)
        
        # Check skills
        skills = resume_data.get('skills', [])
        if skills:
            score += min(len(skills) * 2, 15)
        
        return min(score, 100)
    
    def _extract_suggestions(self, feedback_text: str) -> List[str]:
        """Extract actionable suggestions from feedback text"""
        try:
            # Simple extraction - look for lines that start with common suggestion indicators
            suggestions = []
            lines = feedback_text.split('\n')
            
            for line in lines:
                line = line.strip()
                if any(line.startswith(indicator) for indicator in ['•', '-', '*', '1.', '2.', '3.', '4.', '5.']):
                    suggestions.append(line)
            
            return suggestions[:5]  # Limit to 5 suggestions
            
        except Exception as e:
            logger.error(f"Error extracting suggestions: {e}")
            return [] 