from pylatex import Section, LineBreak
from pylatex.utils import NoEscape

class EducationEntry:
    def __init__(self, school, description, dates):
        self.school = school
        self.description = description
        self.dates = dates

    def render(self, doc):
        doc.append(NoEscape(r'\textbf{%s}' % self.school))
        doc.append(LineBreak())
        doc.append(self.description)
        doc.append(NoEscape(r'\hfill %s' % self.dates))
        doc.append(LineBreak())


class Education:
    def __init__(self):
        self.entries = []

    def add(self, entry):
        self.entries.append(entry)

    def render(self, doc):
        with doc.create(Section("Education", numbering=False)):
            for entry in self.entries:
                entry.render(doc)
