import Link from 'next/link'
import { ArrowRight, Code2, Zap, Users } from 'lucide-react'
import { HeroDonutBackground } from '@/components/hero-donut-background'

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6 py-20 md:py-32">
        <HeroDonutBackground />
        <div className="space-y-8">
          <div className="space-y-4">
            <div className="inline-block px-3 py-1 bg-neutral-100 rounded-full text-sm font-medium text-neutral-600">
              Welcome to my portfolio
            </div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-neutral-900 text-balance">
              Full-Stack Software Engineer
            </h1>
            <p className="text-xl md:text-2xl text-neutral-600 text-balance">
              Building innovative solutions with web, mobile, blockchain, AR/VR, and AI/ML technologies.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/portfolio"
              className="inline-flex items-center justify-center px-6 py-3 bg-neutral-900 text-white font-medium rounded-lg hover:bg-neutral-800 transition-colors"
            >
              View My Work
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-3 border border-neutral-200 text-neutral-900 font-medium rounded-lg hover:bg-neutral-50 transition-colors"
            >
              Get In Touch
            </Link>
          </div>

          {/* Stats */}
          <div className="grid md:grid-cols-3 gap-6 pt-8">
            <div className="space-y-2">
              <div className="text-3xl font-bold text-neutral-900">5+</div>
              <p className="text-neutral-600">Years of Professional Experience</p>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-neutral-900">20+</div>
              <p className="text-neutral-600">Projects Completed</p>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-neutral-900">5M+</div>
              <p className="text-neutral-600">DAU on Ludo Club</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="bg-neutral-50 py-20 md:py-32">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="space-y-12">
            <div className="space-y-4">
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-neutral-900">
                Featured Work
              </h2>
              <p className="text-lg text-neutral-600">
                Highlighting some of my most impactful projects
              </p>
            </div>

            {/* Project Cards */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Ludo Club */}
              <div className="bg-white rounded-lg p-6 border border-neutral-200 hover:shadow-lg transition-shadow">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-neutral-900">Ludo Club</h3>
                    <p className="text-sm text-neutral-600">
                      Online multiplayer version of the hit dice game with 5M+ daily active users
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-2 py-1 bg-neutral-100 rounded text-xs font-medium text-neutral-700">
                      NodeJS
                    </span>
                    <span className="px-2 py-1 bg-neutral-100 rounded text-xs font-medium text-neutral-700">
                      Unity3D
                    </span>
                    <span className="px-2 py-1 bg-neutral-100 rounded text-xs font-medium text-neutral-700">
                      Multiplayer
                    </span>
                  </div>
                </div>
              </div>

              {/* HR App */}
              <div className="bg-white rounded-lg p-6 border border-neutral-200 hover:shadow-lg transition-shadow">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-neutral-900">HR App</h3>
                    <p className="text-sm text-neutral-600">
                      Enterprise HR management system with Odoo integration, role-based access, and leave management
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-2 py-1 bg-neutral-100 rounded text-xs font-medium text-neutral-700">
                      React
                    </span>
                    <span className="px-2 py-1 bg-neutral-100 rounded text-xs font-medium text-neutral-700">
                      Odoo
                    </span>
                    <span className="px-2 py-1 bg-neutral-100 rounded text-xs font-medium text-neutral-700">
                      Enterprise
                    </span>
                  </div>
                </div>
              </div>

              {/* AR Furniture App */}
              <div className="bg-white rounded-lg p-6 border border-neutral-200 hover:shadow-lg transition-shadow">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-neutral-900">AR Furniture Placement</h3>
                    <p className="text-sm text-neutral-600">
                      Augmented reality app for visualizing furniture in real spaces
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-2 py-1 bg-neutral-100 rounded text-xs font-medium text-neutral-700">
                      ARCore
                    </span>
                    <span className="px-2 py-1 bg-neutral-100 rounded text-xs font-medium text-neutral-700">
                      Unity3D
                    </span>
                    <span className="px-2 py-1 bg-neutral-100 rounded text-xs font-medium text-neutral-700">
                      Mobile
                    </span>
                  </div>
                </div>
              </div>

              {/* Live Art */}
              <div className="bg-white rounded-lg p-6 border border-neutral-200 hover:shadow-lg transition-shadow">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-neutral-900">Live Art</h3>
                    <p className="text-sm text-neutral-600">
                      Augmented reality e-commerce platform for artists and collectors
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-2 py-1 bg-neutral-100 rounded text-xs font-medium text-neutral-700">
                      ARFoundation
                    </span>
                    <span className="px-2 py-1 bg-neutral-100 rounded text-xs font-medium text-neutral-700">
                      E-commerce
                    </span>
                    <span className="px-2 py-1 bg-neutral-100 rounded text-xs font-medium text-neutral-700">
                      React
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <Link
              href="/portfolio"
              className="inline-flex items-center px-4 py-2 text-neutral-900 font-medium hover:text-neutral-600 transition-colors"
            >
              View All Projects
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6 py-20 md:py-32">
        <div className="space-y-12">
          <div className="space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-neutral-900">
              Key Expertise
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Web Development */}
            <div className="space-y-3">
              <div className="w-12 h-12 bg-neutral-100 rounded-lg flex items-center justify-center">
                <Code2 className="h-6 w-6 text-neutral-900" />
              </div>
              <h3 className="text-lg font-semibold text-neutral-900">Web Development</h3>
              <p className="text-neutral-600">
                Full-stack expertise with React, Next.js, Node.js, and modern web technologies
              </p>
            </div>

            {/* Mobile & AR/VR */}
            <div className="space-y-3">
              <div className="w-12 h-12 bg-neutral-100 rounded-lg flex items-center justify-center">
                <Zap className="h-6 w-6 text-neutral-900" />
              </div>
              <h3 className="text-lg font-semibold text-neutral-900">Mobile & Emerging Tech</h3>
              <p className="text-neutral-600">
                Android, AR/VR development with Unity3D, and blockchain expertise
              </p>
            </div>

            {/* AI & Leadership */}
            <div className="space-y-3">
              <div className="w-12 h-12 bg-neutral-100 rounded-lg flex items-center justify-center">
                <Users className="h-6 w-6 text-neutral-900" />
              </div>
              <h3 className="text-lg font-semibold text-neutral-900">AI & Leadership</h3>
              <p className="text-neutral-600">
                Machine learning, team leadership, and enterprise system architecture
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-neutral-900 text-white py-20 md:py-32">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="space-y-6 text-center">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
              Let's Work Together
            </h2>
            <p className="text-lg text-neutral-300">
              Interested in collaborating? I'd love to hear about your project.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-3 bg-white text-neutral-900 font-medium rounded-lg hover:bg-neutral-100 transition-colors"
            >
              Contact Me
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
