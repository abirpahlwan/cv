'use client'

import React from "react"

import { Metadata } from 'next'
import { useState } from 'react'
import { Mail, Phone, MapPin, Github, Linkedin, Globe } from 'lucide-react'

// Note: Using 'use client' so metadata export is removed for this page
// Client component for form handling

interface FormData {
  name: string
  email: string
  subject: string
  message: string
}

export default function Contact() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      // Here you would typically send the form data to your backend
      // For now, we'll just simulate a successful submission
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Construct mailto link as fallback
      const mailtoLink = `mailto:abirpahlwan@gmail.com?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
      )}`

      console.log('[v0] Form submitted:', formData)
      setSubmitted(true)
      setFormData({ name: '', email: '', subject: '', message: '' })

      // Show success message
      setTimeout(() => {
        setSubmitted(false)
        // Optional: Open email client
        // window.location.href = mailtoLink
      }, 3000)
    } catch (err) {
      setError('Failed to submit form. Please try again.')
      console.error('[v0] Form submission error:', err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6 py-16 md:py-24">
        <div className="space-y-4">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-neutral-900">
            Get In Touch
          </h1>
          <p className="text-xl text-neutral-600">
            Have a question or want to collaborate? I'd love to hear from you.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6 py-12 md:py-16">
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {/* Contact Info */}
          <div className="space-y-8">
            {/* Email */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-neutral-900" />
                <h3 className="font-semibold text-neutral-900">Email</h3>
              </div>
              <a
                href="mailto:abirpahlwan@gmail.com"
                className="text-neutral-600 hover:text-neutral-900 transition-colors"
              >
                abirpahlwan@gmail.com
              </a>
            </div>

            {/* Phone */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-neutral-900" />
                <h3 className="font-semibold text-neutral-900">Phone</h3>
              </div>
              <a
                href="tel:+8801521107487"
                className="text-neutral-600 hover:text-neutral-900 transition-colors"
              >
                +880 1521 107 487
              </a>
            </div>

            {/* Location */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-neutral-900" />
                <h3 className="font-semibold text-neutral-900">Location</h3>
              </div>
              <p className="text-neutral-600">
                Rajuk Uttara Apartment,
                <br />
                Uttara, Dhaka
                <br />
                Bangladesh
              </p>
            </div>
          </div>

          {/* Social Links */}
          <div className="md:col-span-2 space-y-8">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-neutral-900">Connect With Me</h3>
              <div className="grid md:grid-cols-3 gap-4">
                <a
                  href="https://linkedin.com/in/pahlwan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-4 border border-neutral-200 rounded-lg hover:bg-neutral-50 transition-colors"
                >
                  <Linkedin className="h-5 w-5 text-neutral-900" />
                  <span className="font-medium text-neutral-900">LinkedIn</span>
                </a>

                <a
                  href="https://github.com/abirpahlwan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-4 border border-neutral-200 rounded-lg hover:bg-neutral-50 transition-colors"
                >
                  <Github className="h-5 w-5 text-neutral-900" />
                  <span className="font-medium text-neutral-900">GitHub</span>
                </a>

                <a
                  href="https://pahlwan.tech"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-4 border border-neutral-200 rounded-lg hover:bg-neutral-50 transition-colors"
                >
                  <Globe className="h-5 w-5 text-neutral-900" />
                  <span className="font-medium text-neutral-900">Website</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-neutral-50 rounded-lg p-8 md:p-12">
          <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-8">
            Send Me a Message
          </h2>

          {submitted && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-green-800 font-medium">
                Thank you for your message! I'll get back to you soon.
              </p>
            </div>
          )}

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-800 font-medium">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div className="space-y-2">
              <label htmlFor="name" className="block text-sm font-medium text-neutral-900">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent transition-all"
                placeholder="Your name"
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-neutral-900">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent transition-all"
                placeholder="your.email@example.com"
              />
            </div>

            {/* Subject */}
            <div className="space-y-2">
              <label htmlFor="subject" className="block text-sm font-medium text-neutral-900">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent transition-all"
                placeholder="What is this about?"
              />
            </div>

            {/* Message */}
            <div className="space-y-2">
              <label htmlFor="message" className="block text-sm font-medium text-neutral-900">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={6}
                className="w-full px-4 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent transition-all resize-none"
                placeholder="Your message here..."
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full px-6 py-3 bg-neutral-900 text-white font-medium rounded-lg hover:bg-neutral-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? 'Sending...' : 'Send Message'}
            </button>
          </form>

          <p className="text-sm text-neutral-600 mt-6 text-center">
            I typically respond within 24-48 hours. Looking forward to connecting with you!
          </p>
        </div>
      </section>

      {/* Additional Info */}
      <section className="bg-neutral-50 py-20 md:py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <h3 className="text-lg font-bold text-neutral-900 mb-2">Response Time</h3>
              <p className="text-neutral-600">
                I aim to respond to all inquiries within 24-48 hours
              </p>
            </div>

            <div className="text-center">
              <h3 className="text-lg font-bold text-neutral-900 mb-2">Availability</h3>
              <p className="text-neutral-600">
                Open to freelance projects, consulting, and full-time opportunities
              </p>
            </div>

            <div className="text-center">
              <h3 className="text-lg font-bold text-neutral-900 mb-2">Timezone</h3>
              <p className="text-neutral-600">
                Bangladesh Standard Time (BST, UTC+6)
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
