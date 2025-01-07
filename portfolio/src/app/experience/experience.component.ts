import { Component } from '@angular/core';
import { WorkEntryComponent } from "../work-entry/work-entry.component";
import { CommonModule } from "@angular/common";
import { WorkEntry } from "../workEntry";

@Component({
  selector: 'app-experience',
  imports: [
    WorkEntryComponent,
    CommonModule,
  ],
  templateUrl: './experience.component.html',
  styleUrl: './experience.component.css'
})
export class ExperienceComponent {
  workEntryList: WorkEntry[] =
  [
    {
      "title": "Generation Connect Youth Envoy",
      "company": "International Telecommunication Union",
      "type": "Part-time",
      "location": "Kampala, Central Region, Uganda",
      "startDate": "May 2024",
      "endDate": "Present",
      "description": "Aranged Internship",
      "duration": "8 mos",
      "workMode": "Hybrid"
    },
    {
      "title": "Embedded System Intern",
      "company": "IoT-ra (Internet of Things - Research & Applications) Lab",
      "type": "Internship",
      "description": "Aranged Internship",
      "location": "Kampala, Central Region, Uganda",
      "startDate": "Mar 2024",
      "endDate": "Present",
      "duration": "10 mos",
      "workMode": "On-site"
    },
    {
      "title": "Engineering Intern, E waste Recycling Project",
      "company": "netLabs!UG",
      "type": "Internship",
      "location": "Kampala, Central Region, Uganda",
      "startDate": "Feb 2023",
      "endDate": "Present",
      "duration": "1 yr 11 mos",
      "description": "Part of a team working on repurposing e-waste to create functional computers for underprivileged communities. Responsible for woodworking and operating systems.",
      "skills": [
        "Autodesk Fusion 360",
        "Woodworking",
        "PC building",
        "Operating Systems",
        "Computer Hardware"
      ]
    },
    {
      "title": "Computer Trainer",
      "company": "Freelance",
      "type": "Freelance",
      "startDate": "Feb 2024",
      "endDate": "Feb 2024",
      "duration": "1 mo",
      "description": "Tutored students at netlabs in computer repair, hardware diagnostics, and operating system installation.",
      "skills": [
        "Operating Systems",
        "PC building",
        "Computer Repair"
      ]
    },
    {
      "title": "Engineering, Software Development and Data analysis intern",
      "company": "Green Hub East Africa Ltd",
      "description": "Aranged Internship",
      "type": "Internship",
      "location": "Kampala, Central Region, Uganda",
      "startDate": "Jan 2024",
      "endDate": "Sep 2024",
      "duration": "9 mos",
      "workMode": "Hybrid",
      "responsibilities": [
        "Support in Data Analysis and Database Creation",
        "Support in Development of Battery Swapping Infrastructure",
        "Support in Analysis and Development of innovative Automation Solutions",
        "Web Page Development"
      ],
      "skills": [
        "PostgreSQL",
        "Agile Project Management",
        "Electronics"
      ]
    },
    {
      "title": "Chairperson Makerere University Student Branch",
      "company": "IEEE",
      "location": "Kampala, Central Region, Uganda",
      "startDate": "Sep 2022",
      "endDate": "Sep 2024",
      "duration": "2 yrs 1 mo",
      "description": "Led a team of 9 students in organizing technology and engineering education initiatives, including Arduino training, solar training, programming competition, and leadership training.",
      "skills": [
        "Team Leadership",
        "Educational Leadership",
        "Nonprofit Volunteering"
      ]
    },
    {
      "title": "Project Assistant 'Green Hub Kampala – e-mobility'",
      "company": "Access2innovation",
      "type": "Contract",
      "location": "Aalborg, North Denmark Region, Denmark",
      "description": "Aranged Internship",
      "startDate": "Jun 2024",
      "endDate": "Aug 2024",
      "duration": "3 mos",
      "workMode": "Hybrid"
    },
    {
      "title": "Undergraduate Researcher",
      "company": "The Marconi Research and Innovations Laboratory",
      "description": "Aranged Internship",
      "type": "Internship",
      "location": "Kampala, Central Region, Uganda",
      "startDate": "Feb 2024",
      "endDate": "Aug 2024",
      "duration": "7 mos",
      "workMode": "Hybrid"
    },
    {
      "title": "Communication and Participation Lead",
      "company": "Makerere AI Lab",
      "type": "Contract",
      "location": "Kampala, Central Region, Uganda",
      "description": "Aranged Internship",
      "startDate": "Feb 2024",
      "endDate": "May 2024",
      "duration": "4 mos",
      "workMode": "On-site",
      "responsibilities": [
        "Lead for Makerere AI Lab Hackathon",
        "Forwarding communication to Ugandan students",
        "Ensuring participation",
        "Creating network of volunteers",
        "Creating hackathon website"
      ],
      "skills": [
        "Project Management",
        "Web Development"
      ]
    },
    {
      "title": "Vice Chairperson, Makerere University Redcross Chapter",
      "company": "Uganda Red Cross Society",
      "location": "Kampala, Central Region, Uganda",
      "startDate": "Oct 2022",
      "endDate": "Sep 2023",
      "duration": "1 yr",
      "workMode": "Hybrid",
      "description": "Worked with team in organizing initiatives to provide relief to communities affected by disasters and emergencies.",
      "skills": [
        "Educational Leadership",
        "Nonprofit Volunteering"
      ]
    },
    {
      "title": "CEDAT Coordinator",
      "company": "Uganda Red Cross Society",
      "type": "Contract",
      "startDate": "Feb 2022",
      "endDate": "Oct 2022",
      "duration": "9 mos",
      "workMode": "On-site",
      "description": "Awarded most active coordinator during guild health week for largest blood donation call-out. Responsible for publicizing and encouraging students to attend Red Cross events.",
      "skills": [
        "Nonprofit Volunteering"
      ]
    },
    {
      "title": "Internship Coordinator",
      "company": "Dojo Hub (SMC) Ltd",
      "type": "Part-time",
      "location": "Kampala, Central Region, Uganda",
      "startDate": "Jun 2023",
      "description": "Aranged Internship",
      "endDate": "Aug 2023",
      "duration": "3 mos",
      "workMode": "On-site",
      "responsibilities": [
        "Ensuring activities have necessary resources",
        "Managing spaces for interns",
        "Monitoring intern progress",
        "Reporting challenges to supervisor",
        "Suggesting program improvements",
        "Collecting logbooks and assessment forms"
      ]
    },
    {
      "title": "Research Team Member, Low-cost Cloud-based Solution for Black Soldier Fly Rearing",
      "company": "Self-employed",
      "location": "Kampala, Central Region, Uganda",
      "startDate": "Jan 2023",
      "endDate": "Jul 2023",
      "duration": "7 mos",
      "workMode": "On-site",
      "description": "Conducted research on developing a low-cost cloud-based solution for black soldier fly rearing. Research paper accepted to IEEE AFRICON 2023.",
      "skills": [
        "Web Hosting",
        "Python",
        "Overleaf",
        "Render",
        "Internet of Things (IoT)",
        "LaTeX",
        "Cloud Firestore",
        "Research Skills",
        "Firebase"
      ]
    },
    {
      "title": "IEEE PES Day Ambassador",
      "company": "IEEE PES DAY 2023",
      "location": "Kampala, Central Region, Uganda",
      "startDate": "Apr 2023",
      "endDate": "May 2023",
      "duration": "2 mos",
      "description": "Participated in global campaign to promote awareness of sustainable energy. Organized panel session about power and energy in Uganda.",
      "skills": [
        "Event Planning"
      ]
    },
    {
      "title": "Bount Hack Attendee",
      "company": "Reach Platform",
      "type": "Freelance",
      "workMode": "Remote",
      "startDate": "Sep 2022",
      "endDate": "Oct 2022",
      "duration": "2 mos",
      "description": "Participated in Decentralized Umoja Bount Hack, developing a blockchain-based solution for micropayments in a game.",
      "skills": [
        "JavaScript",
        "React.js",
        "Blockchain",
        "REACH"
      ]
    },
    {
      "title": "Retail Salesworker",
      "company": "Zenith Auto Spare Parts Limited",
      "type": "Apprenticeship",
      "location": "Uganda",
      "workMode": "On-site",
      "startDate": "Aug 2018",
      "endDate": "Feb 2022",
      "duration": "3 yrs 7 mos",
      "description": "Worked as an apprentice in a retail shop selling car spare parts. Responsible for increasing sales, handling customers, providing advice on spare parts, and managing inventory.",
      "skills": [
        "Sales",
        "Communication",
        "Marketing Management",
        "Retail"
      ]
    }
  ];
}
