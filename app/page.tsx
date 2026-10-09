'use client'

import Link from 'next/link'
import { ArrowRight, Code2, Zap, Users, CalendarClock } from 'lucide-react'
import { HeroDonutBackground } from '@/components/hero-donut-background'
import { MotionCard, Reveal, Stagger, StaggerItem, motion } from '@/components/motion/reveal'

const projects = [
  { title: 'Ludo Club', description: 'Online multiplayer version of the hit dice game with 5M+ daily active users', tags: ['NodeJS', 'Unity3D', 'Multiplayer'] },
  { title: 'HR App', description: 'Enterprise HR management system with Odoo integration, role-based access, and leave management', tags: ['React', 'Odoo', 'Enterprise'] },
  { title: 'AR Furniture Placement', description: 'Augmented reality app for visualizing furniture in real spaces', tags: ['ARCore', 'Unity3D', 'Mobile'] },
  { title: 'Live Art', description: 'Augmented reality e-commerce platform for artists and collectors', tags: ['ARFoundation', 'E-commerce', 'React'] },
]

const expertise = [
  { icon: Code2, title: 'Web Development', description: 'Full-stack expertise with React, Next.js, Node.js, and modern web technologies' },
  { icon: Zap, title: 'Mobile & Emerging Tech', description: 'Android, AR/VR development with Unity3D, and blockchain expertise' },
  { icon: Users, title: 'AI & Leadership', description: 'Machine learning, team leadership, and enterprise system architecture' },
]

export default function Home() {
  return (
    <div className="min-h-screen overflow-hidden bg-white">
      <section className="relative flex min-h-[calc(100vh-4rem)] flex-col justify-center">
        <HeroDonutBackground />
        <div className="pointer-events-none absolute inset-0 opacity-40 motion-pulse [background:radial-gradient(circle_at_20%_30%,rgba(0,0,0,.08),transparent_30%),radial-gradient(circle_at_80%_70%,rgba(0,0,0,.06),transparent_25%)]" />
        <Reveal className="relative mx-auto w-full max-w-5xl px-4 py-12 sm:px-6">
          <div className="flex flex-col gap-8">
            <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}>
              <div className="flex flex-col gap-4">
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.25, duration: 0.5 }} className="inline-block w-fit rounded-full bg-neutral-100 px-3 py-1 text-sm font-medium text-neutral-600">
                  Welcome to my portfolio
                </motion.div>
                <h1 className="max-w-4xl text-5xl font-bold tracking-tight text-neutral-900 text-balance md:text-7xl">Full-Stack Software Engineer</h1>
                <p className="max-w-3xl text-xl text-neutral-600 text-balance md:text-2xl">Building innovative solutions with web, mobile, blockchain, AR/VR, and AI/ML technologies.</p>
              </div>
            </motion.div>

            <motion.div className="flex flex-col gap-4 sm:flex-row" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.6 }}>
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} transition={{ type: 'spring', stiffness: 350, damping: 20 }}>
                <Link href="/portfolio" className="inline-flex items-center justify-center rounded-lg bg-neutral-900 px-6 py-3 font-medium text-white transition-colors hover:bg-neutral-800">View My Work <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </motion.div>
              <motion.div whileHover={{ y: -3 }} whileTap={{ scale: 0.98 }}>
                <Link href="/contact" className="inline-flex items-center justify-center rounded-lg border border-neutral-200 px-6 py-3 font-medium text-neutral-900 transition-colors hover:bg-neutral-50">Get In Touch</Link>
              </motion.div>
            </motion.div>

            <Stagger className="grid gap-6 border-t border-neutral-200/70 pt-8 md:grid-cols-3">
              {['5+|Years of Professional Experience', '20+|Projects Completed', '5M+|DAU on Ludo Club'].map((stat) => {
                const [value, label] = stat.split('|')
                return <StaggerItem key={value} className="flex flex-col gap-2"><motion.div whileHover={{ x: 6 }} transition={{ type: 'spring', stiffness: 300 }} className="text-3xl font-bold text-neutral-900">{value}</motion.div><p className="text-neutral-600">{label}</p></StaggerItem>
              })}
            </Stagger>
          </div>
        </Reveal>
      </section>

      <div className="overflow-hidden border-y border-neutral-200 bg-neutral-50 py-4 text-xs font-medium uppercase tracking-[0.25em] text-neutral-500">
        <div className="motion-marquee flex w-max gap-10 whitespace-nowrap">{Array.from({ length: 2 }).flatMap((_, index) => ['Web', 'Mobile', 'AI/ML', 'Blockchain', 'AR/VR', 'Product Engineering'].map((item) => <span key={`${index}-${item}`}>{item} <span className="mx-4 text-neutral-300">/</span></span>))}</div>
      </div>

      <section className="bg-neutral-50 py-20 md:py-32">
        <div className="mx-auto max-w-5xl px-4 sm:px-6"><div className="flex flex-col gap-12">
          <Reveal><div className="flex flex-col gap-4"><h2 className="text-4xl font-bold tracking-tight text-neutral-900 md:text-5xl">Featured Work</h2><p className="text-lg text-neutral-600">Highlighting some of my most impactful projects</p></div></Reveal>
          <Stagger className="grid gap-6 md:grid-cols-2">
            {projects.map((project) => <StaggerItem key={project.title}><MotionCard className="group h-full rounded-lg border border-neutral-200 bg-white p-6"><div className="flex h-full flex-col justify-between gap-8"><div className="flex flex-col gap-2"><h3 className="text-xl font-bold text-neutral-900 transition-transform duration-300 group-hover:translate-x-1">{project.title}</h3><p className="text-sm text-neutral-600">{project.description}</p></div><div className="flex flex-wrap gap-2">{project.tags.map((tag) => <span key={tag} className="rounded bg-neutral-100 px-2 py-1 text-xs font-medium text-neutral-700 transition-colors group-hover:bg-neutral-900 group-hover:text-white">{tag}</span>)}</div></div></MotionCard></StaggerItem>)}
          </Stagger>
          <Reveal delay={0.1}><Link href="/portfolio" className="inline-flex items-center px-4 py-2 font-medium text-neutral-900 transition-transform hover:translate-x-1 hover:text-neutral-600">View All Projects <ArrowRight className="ml-2 h-4 w-4" /></Link></Reveal>
        </div></div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-20 sm:px-6 md:py-32"><div className="flex flex-col gap-12"><Reveal><h2 className="text-4xl font-bold tracking-tight text-neutral-900 md:text-5xl">Key Expertise</h2></Reveal><Stagger className="grid gap-8 md:grid-cols-3">{expertise.map(({ icon: Icon, title, description }) => <StaggerItem key={title}><motion.div whileHover={{ y: -8 }} transition={{ type: 'spring', stiffness: 300, damping: 22 }} className="group flex h-full flex-col gap-3 rounded-xl border border-transparent p-5 transition-colors hover:border-neutral-200 hover:bg-neutral-50"><div className="flex size-12 items-center justify-center rounded-lg bg-neutral-100 transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110"><Icon className="h-6 w-6 text-neutral-900" /></div><h3 className="text-lg font-semibold text-neutral-900">{title}</h3><p className="text-neutral-600">{description}</p></motion.div></StaggerItem>)}</Stagger></div></section>

      <section className="bg-neutral-900 py-20 text-white md:py-32"><Reveal><div className="mx-auto flex max-w-5xl flex-col gap-6 px-4 text-center sm:px-6"><h2 className="text-4xl font-bold tracking-tight md:text-5xl">Let&apos;s Work Together</h2><p className="text-lg text-neutral-300">Interested in collaborating? I&apos;d love to hear about your project.</p><motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.98 }} className="mx-auto"><Link href="/contact" className="inline-flex items-center justify-center rounded-lg bg-white px-6 py-3 font-medium text-neutral-900 transition-colors hover:bg-neutral-100">Contact Me <ArrowRight className="ml-2 h-4 w-4" /></Link></motion.div></div></Reveal></section>

      <section className="bg-white py-20 md:py-32"><Reveal><div className="mx-auto max-w-5xl px-4 sm:px-6"><motion.div whileHover={{ y: -4 }} transition={{ type: 'spring', stiffness: 280 }} className="rounded-2xl border border-neutral-200 bg-neutral-50 p-8 md:p-12"><div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between"><div className="flex flex-col gap-3"><div className="inline-flex w-fit items-center gap-2 rounded-full bg-neutral-900 px-3 py-1 text-sm font-medium text-white"><CalendarClock className="h-4 w-4" />Upcoming Event</div><h2 className="text-3xl font-bold tracking-tight text-neutral-900 text-balance md:text-4xl">Countdown to Smart Bangladesh</h2><p className="text-lg text-neutral-600 text-pretty">Join the journey toward a digitally empowered nation. Track the countdown and explore the vision.</p></div><Link href="/events/smart-bangladesh" className="inline-flex items-center justify-center whitespace-nowrap rounded-lg bg-neutral-900 px-6 py-3 font-medium text-white transition-transform hover:-translate-y-1 hover:bg-neutral-800">View Countdown <ArrowRight className="ml-2 h-4 w-4" /></Link></div></motion.div></div></Reveal></section>
    </div>
  )
}
