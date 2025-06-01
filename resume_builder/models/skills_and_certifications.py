from pylatex import Section, LineBreak
from pylatex.utils import NoEscape, bold


class SkillSet:
    def __init__(self, skills, certifications):
        self.skills = skills
        self.certifications = certifications

    def render(self, doc):
        with doc.create(Section("Skills and Certifications", numbering=False)):
            doc.append(bold('Top Skills: ') + self.skills)
            doc.append(LineBreak())
            doc.append(NoEscape(r'\textbf{Certifications:} ' + self.certifications))
