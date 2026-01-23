import { Metadata } from 'next'
import { Download } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Resume | Pahlwan Rabiul Islam',
  description: 'Professional resume and CV of Pahlwan Rabiul Islam, Software Engineer.',
}

interface WorkExperience {
  position: string
  company: string
  period: string
  description: string
  achievements: string[]
}

interface Education {
  degree: string
  institution: string
  period: string
  details?: string
}

const workExperience: WorkExperience[] = [
  {
    position: 'Software Engineer',
    company: 'Metamorphosis Ltd.',
    period: 'Apr 2025 - Present',
    description: 'Metamorphosis is the leading Odoo Silver Partner from Bangladesh, specializing in ERP consulting.',
    achievements: [
      'Developed HR App connected to Odoo as backend with role-based login and access',
      'Implemented attendance and leave management systems',
      'Providing enterprise-level customer support and Odoo system upgrades',
      'Streamlining company operations and bridging business needs with engineering tasks',
      'Coaching team members on SDLC and engineering best practices'
    ]
  },
  {
    position: 'Lead Software Engineer',
    company: 'Hootum IT Services Ltd.',
    period: 'Dec 2023 - Mar 2025',
    description: 'Blockchain technology startup developing NFT marketplace for creators and collectors.',
    achievements: [
      'Leading software development team with scrum management',
      'Overseeing development, release, and cloud services maintenance',
      'Conducting R&D for blockchain-based trading platform',
      'Managing DevOps and LiveOps infrastructure'
    ]
  },
  {
    position: 'Technical Project Manager',
    company: 'Zufaa Inc. (Brooklyn, New York)',
    period: 'Oct 2022 - Jul 2023',
    description: 'Digital content and marketing company specializing in creative solutions.',
    achievements: [
      'Project requirement analysis and technical documentation',
      'Team building and coordination across distributed teams',
      'Implementing Slack & JIRA workflow optimization',
      'Bridging technical and business stakeholders'
    ]
  },
  {
    position: 'Software Engineer / Game Developer',
    company: 'Ulka Games Ltd. / Moonfrog Labs (Subsidiary)',
    period: 'Jun 2020 - Jul 2022',
    description: 'Focus on mobile and instant games with enterprise-scale multiplayer infrastructure.',
    achievements: [
      'Developed Ludo Club - online multiplayer dice game with 5M+ daily active users',
      'Built NodeJS micro-services architecture',
      'Integrated Unity3D and Cocos frontends with backend services',
      'Optimized real-time multiplayer synchronization',
      'Managed live operations and player retention metrics'
    ]
  },
  {
    position: 'Freelance Unity Developer',
    company: 'Activation Ltd.',
    period: 'Oct 2019 - Mar 2020',
    description: 'IT solutions company with expertise in core business automation.',
    achievements: [
      'Developed Live Art - AR e-commerce app for UK-based artists and collectors',
      'Implemented ARFoundation for cross-platform AR experiences',
      'Created intuitive user interfaces for complex AR features'
    ]
  },
  {
    position: 'Senior Developer / Tech Lead',
    company: 'Dreamerz Lab Ltd.',
    period: 'Apr 2018 - Jul 2019',
    description: 'Startup offering mobile apps, web development, AR/VR, and game development services.',
    achievements: [
      'Developed AR furniture placement and visualization apps',
      'Created VR applications for interior painting and immersive experiences',
      'Built e-commerce platforms for artists with AR integration',
      'Led technical design and programming standards',
      'Developed business models and product strategy'
    ]
  },
  {
    position: 'Software Lead',
    company: 'AIUB Robotic Crew',
    period: 'Sep 2016 - Mar 2017',
    description: 'University team competing in international robotics championships.',
    achievements: [
      'Developed rover control software with automation capabilities',
      'Implemented image processing for autonomous navigation',
      'Built video streaming and wireless communication systems',
      'Created stability control and feedback systems'
    ]
  }
]

const education: Education[] = [
  {
    degree: 'MSc Computer Science',
    institution: 'American International University-Bangladesh (AIUB)',
    period: 'Jan 2020 - Dec 2020',
    details: 'Concentrated on Artificial Intelligence, Machine Learning, and Natural Language Processing'
  },
  {
    degree: 'BSc Computer Science & Software Engineering',
    institution: 'American International University-Bangladesh (AIUB)',
    period: 'Jan 2014 - Dec 2017',
    details: 'Concentrated on Android App Development, Web Development, Image Processing, and Virtual Reality'
  },
  {
    degree: 'HSC Science',
    institution: 'Gazipur Cantonment College, Gazipur',
    period: '2012',
    details: 'GPA 5.0 - Dhaka Board'
  },
  {
    degree: 'SSC Science',
    institution: 'BARI High School, Gazipur',
    period: '2010',
    details: 'GPA 5.0 - Dhaka Board'
  }
]

const technologies = {
  'Programming Languages': ['JavaScript', 'Python', 'PHP', 'C#', 'Java', 'C++'],
  'Frontend': ['React', 'Next.js', 'Three.js', 'p5.js', 'HTML/CSS', 'Tailwind CSS'],
  'Backend': ['Node.js', 'Express', 'Django', 'Laravel', 'Odoo', 'Firebase'],
  'Mobile & Gaming': ['Unity3D', 'Cocos', 'Android', 'Unreal Engine', 'ARCore', 'ARFoundation'],
  'Blockchain': ['Solidity', 'Ethereum', 'Hardhat', 'Smart Contracts', 'Web3'],
  'AI & ML': ['TensorFlow', 'NLTK', 'Ollama', 'MediaPipe', 'OpenCV', 'NumPy', 'SciPy'],
  'Databases': ['PostgreSQL', 'MongoDB', 'MySQL', 'SQLite', 'Firebase', 'PocketBase'],
  'Cloud & DevOps': ['AWS', 'Google Cloud Platform', 'Digital Ocean', 'Docker', 'CI/CD', 'Linux'],
  'Tools & Platforms': ['Git', 'JIRA', 'Notion', 'Slack', 'VS Code', 'Visual Studio', 'Figma', 'Blender']
}

export default function Resume() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6 py-16 md:py-24">
        <div className="space-y-4 mb-8">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-neutral-900">
            Resume & CV
          </h1>
          <p className="text-lg text-neutral-600">
            Comprehensive overview of my professional experience, education, and technical skills.
          </p>
        </div>

        {/* Download Button */}
        <a
          href="https://blobs.vusercontent.net/blob/Pahlwan%20Rabiul%20Islam%20CV%20-%20Full-A73fxgDkDbb9LpYWl0p4Wgzq7ztJax.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 bg-neutral-900 text-white font-medium rounded-lg hover:bg-neutral-800 transition-colors"
        >
          <Download className="h-4 w-4" />
          Download Full CV (PDF)
        </a>
      </section>

      {/* Work Experience */}
      <section className="bg-neutral-50 py-20 md:py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="space-y-12">
            <h2 className="text-4xl font-bold text-neutral-900">
              Work Experience
            </h2>

            <div className="space-y-8">
              {workExperience.map((job, index) => (
                <div key={index} className="border-l-4 border-neutral-900 pl-6 space-y-3">
                  <div className="space-y-1">
                    <h3 className="text-xl font-bold text-neutral-900">
                      {job.position}
                    </h3>
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                      <p className="text-neutral-600 font-medium">
                        {job.company}
                      </p>
                      <span className="text-sm text-neutral-600">
                        {job.period}
                      </span>
                    </div>
                  </div>

                  <p className="text-neutral-600">
                    {job.description}
                  </p>

                  <ul className="space-y-2">
                    {job.achievements.map((achievement, idx) => (
                      <li key={idx} className="text-neutral-600 flex items-start gap-3">
                        <span className="text-neutral-900 font-bold mt-0.5">•</span>
                        {achievement}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Education */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6 py-20 md:py-24">
        <div className="space-y-12">
          <h2 className="text-4xl font-bold text-neutral-900">
            Education
          </h2>

          <div className="space-y-6">
            {education.map((edu, index) => (
              <div key={index} className="bg-neutral-50 rounded-lg p-6 border border-neutral-200">
                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-neutral-900">
                    {edu.degree}
                  </h3>
                  <p className="text-neutral-600 font-medium">
                    {edu.institution}
                  </p>
                  <p className="text-sm text-neutral-600">
                    {edu.period}
                  </p>
                  {edu.details && (
                    <p className="text-neutral-600 text-sm pt-2">
                      {edu.details}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technologies */}
      <section className="bg-neutral-50 py-20 md:py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="space-y-12">
            <h2 className="text-4xl font-bold text-neutral-900">
              Technical Skills
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              {Object.entries(technologies).map(([category, skills]) => (
                <div key={category} className="space-y-4">
                  <h3 className="font-bold text-neutral-900">{category}</h3>
                  <div className="flex flex-wrap gap-2">
                    {skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1 bg-white border border-neutral-200 text-neutral-700 text-sm rounded-full font-medium hover:bg-neutral-100 transition-colors"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6 py-20 md:py-24">
        <div className="bg-neutral-900 text-white rounded-lg p-8 md:p-12 space-y-6">
          <h2 className="text-3xl font-bold">
            Get In Touch
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <p className="text-neutral-300">
                <strong>Email:</strong> abirpahlwan@gmail.com
              </p>
              <p className="text-neutral-300">
                <strong>Phone:</strong> +880 1521 107 487
              </p>
              <p className="text-neutral-300">
                <strong>Location:</strong> Rajuk Uttara Apartment, Uttara, Dhaka, Bangladesh
              </p>
            </div>

            <div className="space-y-3">
              <p className="text-neutral-300">
                <strong>Website:</strong>{' '}
                <a href="https://pahlwan.tech" className="hover:text-white transition-colors">
                  pahlwan.tech
                </a>
              </p>
              <p className="text-neutral-300">
                <strong>LinkedIn:</strong>{' '}
                <a href="https://linkedin.com/in/pahlwan" className="hover:text-white transition-colors">
                  linkedin.com/in/pahlwan
                </a>
              </p>
              <p className="text-neutral-300">
                <strong>GitHub:</strong>{' '}
                <a href="https://github.com/abirpahlwan" className="hover:text-white transition-colors">
                  github.com/abirpahlwan
                </a>
              </p>
            </div>
          </div>

          <a
            href="/contact"
            className="inline-block px-6 py-3 bg-white text-neutral-900 font-medium rounded-lg hover:bg-neutral-100 transition-colors mt-4"
          >
            Send Me a Message
          </a>
        </div>
      </section>
    </div>
  )
}
