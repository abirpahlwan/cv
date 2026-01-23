import { Github, Linkedin, Mail, Globe } from 'lucide-react'
import Link from 'next/link'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-neutral-200 bg-neutral-50 py-12">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="font-semibold text-neutral-900 mb-2">Pahlwan Rabiul Islam</h3>
            <p className="text-sm text-neutral-600">
              Full-stack Software Engineer. Passionate about building innovative solutions.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-neutral-900 mb-3">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-neutral-600 hover:text-neutral-900 transition-colors">
                  About Me
                </Link>
              </li>
              <li>
                <Link href="/portfolio" className="text-neutral-600 hover:text-neutral-900 transition-colors">
                  Portfolio
                </Link>
              </li>
              <li>
                <Link href="/resume" className="text-neutral-600 hover:text-neutral-900 transition-colors">
                  Resume
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-neutral-600 hover:text-neutral-900 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="font-semibold text-neutral-900 mb-3">Connect</h4>
            <div className="flex gap-4">
              <a
                href="https://linkedin.com/in/pahlwan"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-600 hover:text-neutral-900 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="https://github.com/abirpahlwan"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-600 hover:text-neutral-900 transition-colors"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="mailto:abirpahlwan@gmail.com"
                className="text-neutral-600 hover:text-neutral-900 transition-colors"
                aria-label="Email"
              >
                <Mail className="h-5 w-5" />
              </a>
              <a
                href="https://pahlwan.tech"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-600 hover:text-neutral-900 transition-colors"
                aria-label="Website"
              >
                <Globe className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-neutral-200 pt-8 flex justify-between items-center text-sm text-neutral-600">
          <p>&copy; {currentYear} Pahlwan Rabiul Islam. All rights reserved.</p>
          <p>Designed & Built with Next.js</p>
        </div>
      </div>
    </footer>
  )
}
