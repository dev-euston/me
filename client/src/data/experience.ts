import type { Experience } from '../types'

export const experience: Experience[] = [
  {
    id: 'govtech-customs',
    company: 'GovTech Singapore',
    role: 'Software Engineer (Singapore Customs)',
    startDate: 'Nov 2024',
    endDate: 'Present',
    bullets: [
      'Built a scalable notification service enabling internal applications to send email alerts to officers, designed for future expansion to external customers.',
      'Developed a case management system with a Next.js frontend and Spring Boot backend to streamline manual-processing workflows.',
      'Built a GovTech product recommendation chatbot for an internal hackathon using Next.js, Python, LangChain/LangGraph, and RAG via the Hugging Face API and Ollama.',
    ],
  },
  {
    id: 'govtech-mom',
    company: 'GovTech Singapore',
    role: 'Software Engineer (Ministry of Manpower)',
    startDate: 'Feb 2022',
    endDate: 'Nov 2024',
    bullets: [
      'Tech-led digitisation of a manual form submission process, cutting applicant effort and reducing Customer Officer data entry using Vue.js and Node.js/OutSystems.',
      'Drove full-stack development of an application assessment tool with Vue.js frontend, mentoring teammates on best practices and delivering a reusable PDF generation library with PDFMake.',
      'Built an AI-powered legacy code analysis chatbot (Vue.js + Python RAG backend using Ollama) deployed on-premise for security-sensitive environments.',
    ],
  },
  {
    id: 'eyeota',
    company: 'Eyeota',
    role: 'Software Engineer',
    startDate: 'May 2021',
    endDate: 'Feb 2022',
    bullets: [
      'Contributed to full-stack feature development in a data and audience intelligence platform.',
    ],
  },
  {
    id: 'myrepublic',
    company: 'MyRepublic',
    role: 'Software Engineer',
    startDate: 'Aug 2016',
    endDate: 'May 2021',
    bullets: [
      "Architected and implemented multiple microservices for the company's Business Support System.",
      'Leveraged BPM libraries to model complex business logic across core platform services.',
      'Acted as domain expert, providing technical consultation to support, development, and product teams.',
    ],
  },
  {
    id: 'gemalto',
    company: 'Gemalto',
    role: 'Software Engineer',
    startDate: 'Aug 2013',
    endDate: 'Aug 2016',
    bullets: [
      'Developed and validated applications for the Government Programs Business Unit.',
    ],
  },
]
