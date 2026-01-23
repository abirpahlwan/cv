import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Me | Pahlwan Rabiul Islam',
  description: 'Learn about my professional background, skills, and interests in software engineering.',
}

export default function About() {
  const skills = {
    'Languages': ['JavaScript', 'Python', 'PHP', 'C#'],
    'Frontend': ['React', 'Next.js', 'Three.js', 'p5.js'],
    'Backend': ['Node.js', 'Express', 'Django', 'Laravel', 'Odoo'],
    'Mobile & XR': ['Unity3D', 'Android', 'ARCore', 'ARFoundation', 'Cocos'],
    'Blockchain': ['Solidity', 'Ethereum', 'Hardhat'],
    'AI/ML': ['TensorFlow', 'NLTK', 'Ollama', 'MediaPipe'],
    'Databases': ['PostgreSQL', 'MongoDB', 'MySQL', 'Firebase'],
    'Cloud & Tools': ['AWS', 'Google Cloud', 'Digital Ocean', 'Git', 'JIRA', 'Notion'],
  }

  const interests = [
    'Human Computer Interaction & Psychology',
    'UI/UX & Product Design',
    'AI, Robots, Drones, Space',
    'Film-making & Photography',
    'Music (Guitar, FL Studio)',
    'Philosophy & Political Economics',
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6 py-16 md:py-24">
        <div className="space-y-4">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-neutral-900">
            About Me
          </h1>
          <p className="text-xl text-neutral-600">
            Passionate software engineer with expertise across web, mobile, blockchain, and emerging technologies.
          </p>
        </div>
      </section>

      {/* Professional Background */}
      <section className="bg-neutral-50 py-20 md:py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="space-y-12">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold text-neutral-900">
                Professional Background
              </h2>
              <p className="text-lg text-neutral-600">
                I'm a full-stack software engineer based in Dhaka, Bangladesh, with over 5 years of professional experience building innovative solutions across various domains.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Current Role */}
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-neutral-900">Current Role</h3>
                <p className="text-neutral-600">
                  <strong>Software Engineer</strong> at Metamorphosis Ltd. (Apr 2025 - Present)
                </p>
                <p className="text-sm text-neutral-600">
                  Leading development of enterprise HR applications connected to Odoo ERP, managing team coordination, and establishing best practices in software development lifecycle.
                </p>
              </div>

              {/* Previous Experience */}
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-neutral-900">Previous Highlights</h3>
                <ul className="text-sm text-neutral-600 space-y-2">
                  <li>• <strong>Lead Software Engineer</strong> at Hootum IT Services (Blockchain/NFT)</li>
                  <li>• <strong>Technical Project Manager</strong> at Zufaa Inc (Digital Content)</li>
                  <li>• <strong>Game Developer</strong> at Ulka Games (5M+ DAU on Ludo Club)</li>
                  <li>• <strong>Lead Developer</strong> at Dreamerz Lab (AR/VR/Mobile)</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6 py-20 md:py-24">
        <div className="space-y-12">
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900">
            Technical Skills
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {Object.entries(skills).map(([category, items]) => (
              <div key={category} className="space-y-3">
                <h3 className="font-semibold text-neutral-900">{category}</h3>
                <div className="flex flex-wrap gap-2">
                  {items.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 bg-neutral-100 text-neutral-700 text-sm rounded-full font-medium hover:bg-neutral-200 transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Soft Skills */}
      <section className="bg-neutral-50 py-20 md:py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="space-y-12">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900">
              Soft Skills
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg p-6 border border-neutral-200">
                <h3 className="font-semibold text-neutral-900 mb-3">Communication</h3>
                <p className="text-neutral-600">
                  Excellent verbal and written communication skills with the ability to articulate complex technical concepts clearly.
                </p>
              </div>

              <div className="bg-white rounded-lg p-6 border border-neutral-200">
                <h3 className="font-semibold text-neutral-900 mb-3">Problem Solving</h3>
                <p className="text-neutral-600">
                  Independent, self-sufficient, and compulsive problem solver with a driven approach to overcoming technical challenges.
                </p>
              </div>

              <div className="bg-white rounded-lg p-6 border border-neutral-200">
                <h3 className="font-semibold text-neutral-900 mb-3">Learning & Growth</h3>
                <p className="text-neutral-600">
                  Self-motivated and naturally curious, always willing to learn new technologies and expand expertise in emerging fields.
                </p>
              </div>

              <div className="bg-white rounded-lg p-6 border border-neutral-200">
                <h3 className="font-semibold text-neutral-900 mb-3">Team Collaboration</h3>
                <p className="text-neutral-600">
                  Collaborative worker with strength in identifying team strengths and weaknesses, fostering effective team dynamics.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interests */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6 py-20 md:py-24">
        <div className="space-y-12">
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900">
            Interests & Passions
          </h2>

          <div className="grid md:grid-cols-2 gap-4">
            {interests.map((interest) => (
              <div
                key={interest}
                className="flex items-start p-4 bg-neutral-50 rounded-lg border border-neutral-200"
              >
                <span className="text-neutral-900 font-medium">{interest}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Education */}
      <section className="bg-neutral-50 py-20 md:py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="space-y-12">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900">
              Education
            </h2>

            <div className="space-y-6">
              <div className="border-l-4 border-neutral-900 pl-6">
                <h3 className="text-lg font-semibold text-neutral-900">
                  MSc Computer Science
                </h3>
                <p className="text-neutral-600">American International University-Bangladesh (AIUB)</p>
                <p className="text-sm text-neutral-600">January 2020 - December 2020</p>
                <p className="text-sm text-neutral-600 mt-2">
                  Concentrated on Artificial Intelligence, Machine Learning, and Natural Language Processing
                </p>
              </div>

              <div className="border-l-4 border-neutral-900 pl-6">
                <h3 className="text-lg font-semibold text-neutral-900">
                  BSc Computer Science & Software Engineering
                </h3>
                <p className="text-neutral-600">American International University-Bangladesh (AIUB)</p>
                <p className="text-sm text-neutral-600">January 2014 - December 2017</p>
                <p className="text-sm text-neutral-600 mt-2">
                  Concentrated on Android App Development, Web Development, Image Processing, and Virtual Reality
                </p>
              </div>

              <div className="border-l-4 border-neutral-900 pl-6">
                <h3 className="text-lg font-semibold text-neutral-900">
                  HSC & SSC (Science)
                </h3>
                <p className="text-neutral-600">Perfect GPA - 5.0 in both examinations</p>
                <p className="text-sm text-neutral-600">Dhaka Board</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
