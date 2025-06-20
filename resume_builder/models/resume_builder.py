from pylatex import Document, Section, Center, LineBreak
from pylatex.utils import NoEscape, bold
from models.education import Education
from models.experience import Experience
from models.research import Research
from models.job import Job
from typing import Dict, List, Any

class ResumeBuilder:
    def __init__(self, resume_data: Dict[str, Any]):
        self.resume_data = resume_data
        geometry_options = {"a4paper": True, "margin": "1cm"}
        self.doc = Document(documentclass='article', geometry_options=geometry_options, font_size='10pt')
        self._configure_preamble()

    def _configure_preamble(self):
        self.doc.packages.append(NoEscape(r'\usepackage{enumitem}'))
        self.doc.packages.append(NoEscape(r'\usepackage{titlesec}'))
        self.doc.packages.append(NoEscape(r'\usepackage{parskip}'))
        self.doc.packages.append(NoEscape(r'\usepackage[hidelinks]{hyperref}'))
        self.doc.preamble.append(NoEscape(r'\titlespacing*{\section}{0pt}{2ex}{1ex}'))
        self.doc.preamble.append(NoEscape(r'\titlespacing*{\subsection}{0pt}{1ex}{1ex}'))
        self.doc.append(NoEscape(r'\parindent=0pt'))

    def add_header(self):
        user_data = self.resume_data.get('user', {})
        
        with self.doc.create(Center()) as center:
            center.append(NoEscape(r'{\LARGE \textbf{%s}}' % user_data.get('name', 'Your Name')))
            center.append(LineBreak())
            center.append(user_data.get('title', 'Professional Title'))
            center.append(LineBreak())
            center.append(user_data.get('location', 'Location'))
            center.append(LineBreak())
            center.append(NoEscape(r'\href{mailto:%s}{%s} | %s' % (
                user_data.get('email', 'email@example.com'),
                user_data.get('email', 'email@example.com'),
                user_data.get('phone', 'Phone Number')
            )))
            center.append(LineBreak())
            
            # Add LinkedIn and website if available
            links = []
            if user_data.get('linkedin'):
                links.append(r'\href{%s}{linkedin.com/in/%s}' % (user_data['linkedin'], user_data['linkedin'].split('/')[-1]))
            if user_data.get('website'):
                links.append(r'\href{%s}{%s}' % (user_data['website'], user_data['website'].replace('https://', '')))
            if links:
                center.append(NoEscape(' | '.join(links)))

    def add_summary(self):
        user_data = self.resume_data.get('user', {})
        summary = user_data.get('summary', 'Professional summary not provided.')
        
        with self.doc.create(Section("Summary", numbering=False)):
            self.doc.append(summary)

    def add_experience(self):
        experiences = self.resume_data.get('experiences', [])
        if not experiences:
            return
            
        with self.doc.create(Section("Experience", numbering=False)):
            for exp in experiences:
                # Create job object
                job = Job(
                    company=exp.get('company', 'Company'),
                    title=exp.get('title', 'Title'),
                    dates=f"{exp.get('start_date', 'Start')} - {exp.get('end_date', 'End')}",
                    bullets=[exp.get('description', 'No description provided.')]
                )
                job.render(self.doc)

    def add_education(self):
        education = self.resume_data.get('education', [])
        if not education:
            return
            
        with self.doc.create(Section("Education", numbering=False)):
            for edu in education:
                self.doc.append(NoEscape(r'\textbf{%s}' % edu.get('institution', 'Institution')))
                self.doc.append(LineBreak())
                self.doc.append(NoEscape(r'\textit{%s} \hfill %s' % (
                    edu.get('degree', 'Degree'),
                    edu.get('graduation_date', 'Date')
                )))
                self.doc.append(LineBreak())
                if edu.get('gpa'):
                    self.doc.append(f"GPA: {edu.get('gpa')}")
                    self.doc.append(LineBreak())
                self.doc.append(LineBreak())

    def add_skills(self):
        skills = self.resume_data.get('skills', [])
        if not skills:
            return
            
        with self.doc.create(Section("Skills", numbering=False)):
            skill_categories = {}
            
            # Group skills by category
            for skill in skills:
                category = skill.get('category', 'Other')
                if category not in skill_categories:
                    skill_categories[category] = []
                skill_categories[category].append(skill.get('name', 'Skill'))
            
            # Render skills by category
            for category, skill_list in skill_categories.items():
                self.doc.append(NoEscape(r'\textbf{%s:}' % category))
                self.doc.append(' ' + ', '.join(skill_list))
                self.doc.append(LineBreak())
                self.doc.append(LineBreak())

    def generate_pdf(self, filename: str = "resume") -> str:
        """Generate PDF and return the file path"""
        self.add_header()
        self.add_summary()
        self.add_experience()
        self.add_education()
        self.add_skills()
        
        # Generate PDF
        self.doc.generate_pdf(filename, clean_tex=False)
        return f"{filename}.pdf"