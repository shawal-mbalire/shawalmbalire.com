from pylatex import Section, Subsection

class Experience:
    def __init__(self):
        self.work_jobs = []
        self.volunteer_jobs = []

    def add_work(self, job):
        self.work_jobs.append(job)

    def add_volunteer(self, job):
        self.volunteer_jobs.append(job)

    def render(self, doc):
        with doc.create(Section("Experience", numbering=False)):
            with doc.create(Subsection("Work", numbering=False)):
                for job in self.work_jobs:
                    job.render(doc)
            with doc.create(Subsection("Volunteership", numbering=False)):
                for job in self.volunteer_jobs:
                    job.render(doc)

