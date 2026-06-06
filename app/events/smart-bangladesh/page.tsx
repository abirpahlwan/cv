import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, MapPin, CalendarClock, Target } from 'lucide-react'
import { CountdownTimer } from '@/components/countdown-timer'

export const metadata: Metadata = {
  title: 'Countdown to Smart Bangladesh | Pahlwan Rabiul Islam',
  description:
    'Track the countdown to Smart Bangladesh 2041 — a vision for a digitally empowered, knowledge-based, and innovation-driven nation.',
}

const TARGET_DATE = '2041-01-01T00:00:00+06:00'

const pillars = [
  {
    title: 'Smart Citizen',
    description:
      'Empowering people with digital literacy, skills, and access to technology for a connected society.',
  },
  {
    title: 'Smart Economy',
    description:
      'Driving growth through innovation, startups, fintech, and a thriving digital marketplace.',
  },
  {
    title: 'Smart Government',
    description:
      'Delivering transparent, paperless, and efficient public services to every corner of the nation.',
  },
  {
    title: 'Smart Society',
    description:
      'Building inclusive, sustainable, and resilient communities powered by technology.',
  },
]

export default function SmartBangladesh() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero / Countdown */}
      <section className="bg-neutral-900 text-white py-16 md:py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 space-y-10">
          <Link
            href="/"
            className="inline-flex items-center text-sm font-medium text-neutral-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>

          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full text-sm font-medium text-white">
              <CalendarClock className="h-4 w-4" />
              Vision 2041
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-balance">
              Countdown to Smart Bangladesh
            </h1>
            <p className="text-lg md:text-xl text-neutral-300 max-w-2xl text-pretty">
              A national vision to transform Bangladesh into a digitally empowered, knowledge-based, and innovation-driven nation by 2041.
            </p>
          </div>

          <CountdownTimer targetDate={TARGET_DATE} />

          <div className="flex flex-wrap gap-6 text-sm text-neutral-400">
            <span className="inline-flex items-center gap-2">
              <CalendarClock className="h-4 w-4" />
              Target: 2041
            </span>
            <span className="inline-flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Bangladesh
            </span>
          </div>
        </div>
      </section>

      {/* Pillars */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6 py-20 md:py-32">
        <div className="space-y-12">
          <div className="space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-neutral-900">
              The Four Pillars
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl">
              Smart Bangladesh is built on four foundational pillars working together to shape the future.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {pillars.map((pillar) => (
              <div
                key={pillar.title}
                className="bg-neutral-50 rounded-lg p-6 border border-neutral-200 hover:shadow-lg transition-shadow"
              >
                <div className="space-y-3">
                  <div className="w-12 h-12 bg-neutral-900 rounded-lg flex items-center justify-center">
                    <Target className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-neutral-900">{pillar.title}</h3>
                  <p className="text-neutral-600">{pillar.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-neutral-50 py-20 md:py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="space-y-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-neutral-900">
              Want to build the future together?
            </h2>
            <p className="text-lg text-neutral-600">
              I&apos;m passionate about technology that drives national progress. Let&apos;s collaborate.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-3 bg-neutral-900 text-white font-medium rounded-lg hover:bg-neutral-800 transition-colors"
            >
              Get In Touch
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
