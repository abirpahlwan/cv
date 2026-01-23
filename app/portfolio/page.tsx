import { Metadata } from 'next'
import { ExternalLink, Github } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Portfolio | Pahlwan Rabiul Islam',
  description: 'Browse my professional projects including Ludo Club, AR/VR apps, blockchain projects, and more.',
}

interface Project {
  title: string
  description: string
  year: string
  company?: string
  technologies: string[]
  highlights: string[]
  link?: string
  github?: string
}

const projects: Project[] = [
  {
    title: 'Ludo Club',
    description: 'Online multiplayer version of the hit dice game with enterprise-scale infrastructure',
    year: '2020-2022',
    company: 'Ulka Games / Moonfrog Labs',
    technologies: ['NodeJS', 'Unity3D', 'Cocos', 'Multiplayer', 'Real-time'],
    highlights: [
      '5M+ daily active users',
      'Micro-services architecture',
      'Real-time multiplayer synchronization',
      'Cross-platform deployment'
    ],
    link: 'https://ludoclub.com'
  },
  {
    title: 'HR App (Enterprise)',
    description: 'Comprehensive human resource management system integrated with Odoo ERP',
    year: '2025',
    company: 'Metamorphosis Ltd.',
    technologies: ['React', 'Next.js', 'Odoo', 'REST API', 'Role-based Access'],
    highlights: [
      'Odoo backend integration',
      'Role-based login and access control',
      'Attendance management system',
      'Leave management system',
      'Enterprise-level scalability'
    ]
  },
  {
    title: 'AR Furniture Placement',
    description: 'Augmented reality application for visualizing furniture in real spaces',
    year: '2019',
    company: 'Dreamerz Lab Ltd.',
    technologies: ['ARCore', 'ARFoundation', 'Unity3D', 'C#', 'Mobile'],
    highlights: [
      'Real-time AR visualization',
      'Mobile platform optimization',
      '3D model rendering',
      'User-friendly interface'
    ]
  },
  {
    title: 'Live Art',
    description: 'Augmented reality e-commerce platform for artists and collectors',
    year: '2019-2020',
    company: 'Activation Ltd.',
    technologies: ['ARFoundation', 'Unity3D', 'React', 'E-commerce', 'AR Tech'],
    highlights: [
      'AR product visualization',
      'E-commerce integration',
      'Artist marketplace',
      'Digital asset management'
    ],
    link: 'https://liveartapp.com'
  },
  {
    title: 'NFT Marketplace Platform',
    description: 'Research & development of blockchain-based trading platform for NFT marketplace',
    year: '2023-2025',
    company: 'Hootum IT Services Ltd.',
    technologies: ['Solidity', 'Ethereum', 'Hardhat', 'Smart Contracts', 'Web3'],
    highlights: [
      'Blockchain infrastructure design',
      'Smart contract development',
      'NFT marketplace architecture',
      'Trading platform research'
    ]
  },
  {
    title: 'Our Gazipur',
    description: 'Community-focused Android application for reporting and tracking city issues',
    year: '2018',
    company: 'Personal Project',
    technologies: ['Android', 'Java', 'Firebase', 'Real-time Updates', 'Mobile'],
    highlights: [
      'Issue tracking system',
      'Community engagement',
      'Real-time notifications',
      'Location-based services'
    ]
  },
  {
    title: 'Hand Gesture Recognition',
    description: 'Deep learning-based 3D hand gesture recognition and real-time tracking system',
    year: '2020',
    company: 'Academic Research',
    technologies: ['TensorFlow', 'MediaPipe', 'Unity3D', 'Deep Learning', 'Computer Vision'],
    highlights: [
      'Real-time gesture recognition',
      'MediaPipe integration',
      'VR/AR implementation',
      'Mobile AR support'
    ]
  },
  {
    title: 'Virtual Reality Painting App',
    description: 'Immersive 3D painting application with inertial system and monocular vision',
    year: '2018',
    company: 'Dreamerz Lab Ltd.',
    technologies: ['Unity3D', 'C#', 'MEMS Sensors', 'Signal Processing', 'Computer Vision'],
    highlights: [
      'VR application development',
      'Inertial measurement unit integration',
      'Real-time tracking',
      'Handheld controller localization'
    ]
  },
  {
    title: '24x7 Live Streaming Server',
    description: 'YouTube live video streaming infrastructure running 24/7',
    year: '2020',
    company: 'Personal Project',
    technologies: ['Ant Media Server', 'Google Cloud Platform', 'Node.js', 'Video Streaming'],
    highlights: [
      'Cloud-based video streaming',
      'Reliable uptime infrastructure',
      'Scalable streaming architecture',
      'Multi-platform support'
    ]
  },
  {
    title: '3D Game Projects',
    description: 'Multiple interactive 3D games with real-time graphics and physics',
    year: '2015-2016',
    company: 'Academic Projects',
    technologies: ['C++', 'OpenGL', 'Game Development', '3D Graphics'],
    highlights: [
      'Coin Seeker - Multi-stage adventure game',
      'Wreck It Bashir - Multiplayer game mechanics',
      'Spooder-Pal - Procedural city generation',
      'Advanced graphics programming'
    ]
  }
]

export default function Portfolio() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6 py-16 md:py-24">
        <div className="space-y-4">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-neutral-900">
            Portfolio
          </h1>
          <p className="text-xl text-neutral-600">
            A selection of my professional projects spanning web, mobile, blockchain, and emerging technologies.
          </p>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6 py-12 md:py-16">
        <div className="space-y-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="border border-neutral-200 rounded-lg p-6 md:p-8 hover:shadow-lg transition-shadow bg-white"
            >
              <div className="space-y-4">
                {/* Header */}
                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="text-2xl md:text-3xl font-bold text-neutral-900">
                        {project.title}
                      </h3>
                      {project.company && (
                        <p className="text-sm text-neutral-600 mt-1">
                          {project.company}
                        </p>
                      )}
                    </div>
                    <span className="text-sm font-medium text-neutral-600 whitespace-nowrap">
                      {project.year}
                    </span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-neutral-600">
                  {project.description}
                </p>

                {/* Highlights */}
                <div className="space-y-2">
                  <h4 className="text-sm font-semibold text-neutral-900">Key Features & Achievements</h4>
                  <ul className="grid md:grid-cols-2 gap-2">
                    {project.highlights.map((highlight, idx) => (
                      <li key={idx} className="text-sm text-neutral-600 flex items-start">
                        <span className="mr-2 text-neutral-900">•</span>
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Technologies */}
                <div className="space-y-2">
                  <h4 className="text-sm font-semibold text-neutral-900">Technologies</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-neutral-100 text-neutral-700 text-xs rounded-full font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Links */}
                {(project.link || project.github) && (
                  <div className="flex gap-3 pt-2">
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-neutral-900 hover:text-neutral-600 transition-colors text-sm font-medium"
                      >
                        <ExternalLink className="h-4 w-4" />
                        Visit Project
                      </a>
                    )}
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-neutral-900 hover:text-neutral-600 transition-colors text-sm font-medium"
                      >
                        <Github className="h-4 w-4" />
                        Source Code
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Achievements Section */}
      <section className="bg-neutral-50 py-20 md:py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="space-y-12">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900">
              Achievements & Recognition
            </h2>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg p-6 border border-neutral-200">
                <h3 className="text-lg font-bold text-neutral-900 mb-2">
                  University Rover Challenge
                </h3>
                <p className="text-sm text-neutral-600">
                  <strong>Finalist (2017)</strong> at Mars Desert Research Station, Utah, USA. Led the Rover Control Software team.
                </p>
              </div>

              <div className="bg-white rounded-lg p-6 border border-neutral-200">
                <h3 className="text-lg font-bold text-neutral-900 mb-2">
                  NASA Space Apps Challenge
                </h3>
                <p className="text-sm text-neutral-600">
                  <strong>Finalist (2017)</strong> in the international hackathon competition with innovative solutions.
                </p>
              </div>

              <div className="bg-white rounded-lg p-6 border border-neutral-200">
                <h3 className="text-lg font-bold text-neutral-900 mb-2">
                  IT Noesis Quiz Champion
                </h3>
                <p className="text-sm text-neutral-600">
                  <strong>Champion (2015)</strong> at Dhaka University IT Society 4th National Campus IT Fest.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6 py-20 md:py-24">
        <div className="bg-neutral-900 text-white rounded-lg p-8 md:p-12 text-center space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold">
            Interested in Collaborating?
          </h2>
          <p className="text-neutral-300">
            Have an idea or project in mind? Let's discuss how I can help bring your vision to life.
          </p>
          <a
            href="/contact"
            className="inline-block px-6 py-3 bg-white text-neutral-900 font-medium rounded-lg hover:bg-neutral-100 transition-colors"
          >
            Get In Touch
          </a>
        </div>
      </section>
    </div>
  )
}
