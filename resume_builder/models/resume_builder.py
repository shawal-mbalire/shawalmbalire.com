from pylatex import Document, Section, Center, LineBreak
from pylatex.utils import NoEscape, bold
from models.education import Education
from models.experience import Experience
from models.research import Research

class ResumeBuilder:
    summary:str = """
        Aspiring electrical engineer passionate about automation, IoT, and software engineering.
        Hands-on experience with Python development, embedded systems, and web development. 
        Proven leadership in organizing technical events and driving innovative projects.
    """
    def __init__(self):
        geometry_options = {"a4paper": True, "margin": "1cm"}
        self.doc = Document(documentclass='article', geometry_options=geometry_options, font_size='10pt')
        self._configure_preamble()

        self.experience = Experience()
        self.education = Education()
        self.skills = None
        self.research = Research()

    def _configure_preamble(self):
        self.doc.packages.append(NoEscape(r'\usepackage{enumitem}'))
        self.doc.packages.append(NoEscape(r'\usepackage{titlesec}'))
        self.doc.packages.append(NoEscape(r'\usepackage{parskip}'))
        self.doc.packages.append(NoEscape(r'\usepackage[hidelinks]{hyperref}'))
        self.doc.preamble.append(NoEscape(r'\titlespacing*{\section}{0pt}{2ex}{1ex}'))
        self.doc.preamble.append(NoEscape(r'\titlespacing*{\subsection}{0pt}{1ex}{1ex}'))
        self.doc.append(NoEscape(r'\parindent=0pt'))

    def add_header(self):
        with self.doc.create(Center()) as center:
            center.append(NoEscape(r'{\LARGE \textbf{Shawal Mbalire}}'))
            center.append(LineBreak())
            center.append("Electrical and Software Engineering Student")
            center.append(LineBreak())
            center.append("Kampala, Central Region, Uganda")
            center.append(LineBreak())
            center.append(NoEscape(r'\href{mailto:mbalireshawal@gmail.com}{mbalireshawal@gmail.com} | +256760044705'))
            center.append(LineBreak())
            center.append(NoEscape(
                r'\href{https://www.linkedin.com/in/mbalireshawal}{linkedin.com/in/mbalireshawal} | \href{https://shawalmbalire.com}{shawalmbalire.com}'))

    def add_summary(self):
        with self.doc.create(Section("Summary", numbering=False)):
            self.doc.append(self.summary)

    def build(self, filename="shawal_mbalire_cv"):
        self.add_header()
        self.add_summary()
        self.experience.render(self.doc)
        self.education.render(self.doc)
        if self.skills:
            self.skills.render(self.doc)
        self.research.render(self.doc)
        self.doc.generate_pdf(filename, clean_tex=False)