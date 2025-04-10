from pylatex import LineBreak
from pylatex.utils import NoEscape, bold

class Job:
    def __init__(self, company, title, dates, bullets):
        self.company = company
        self.title = title
        self.dates = dates
        self.bullets = bullets

    def render(self, doc):
        doc.append(NoEscape(r'\textbf{%s}' % self.company))
        doc.append(LineBreak())
        doc.append(NoEscape(r'\textit{%s} \hfill %s' % (self.title, self.dates)))
        doc.append(LineBreak())
        for bullet in self.bullets:
            doc.append(f"- {bullet}")
            doc.append(LineBreak())
        doc.append(LineBreak())