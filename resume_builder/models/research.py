from pylatex import Section,  LineBreak
from pylatex.utils import NoEscape, bold


class ResearchProject:
    def __init__(self, title, bullets):
        self.title = title
        self.bullets = bullets

    def render(self, doc):
        doc.append(NoEscape(r'\textbf{%s}' % self.title))
        doc.append(LineBreak())
        for bullet in self.bullets:
            doc.append("- " + bullet)
            doc.append(LineBreak())


class Research:
    def __init__(self):
        self.projects = []

    def add(self, project):
        self.projects.append(project)

    def render(self, doc):
        with doc.create(Section("Research", numbering=False)):
            for project in self.projects:
                project.render(doc)
