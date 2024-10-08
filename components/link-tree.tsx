'use client'

import React from 'react'
import { Linkedin, Twitter, Instagram, Mail, Music, Gamepad, Youtube } from 'lucide-react'

interface LinkItem {
  type: 'category' | 'link' | 'youtube'
  title: string
  url?: string
  youtubeId?: string
}

const profileImage = "/placeholder.svg?height=200&width=200"
const name = "@anthonysistilli"
const description = "Tech founder & senior software engineer"

const socialLinks = [
  { platform: 'LinkedIn', url: 'https://linkedin.com/in/example' },
  { platform: 'Twitter', url: 'https://twitter.com/example' },
  { platform: 'Mail', url: 'mailto:example@example.com' },
  { platform: 'Music', url: 'https://music.example.com' },
  { platform: 'Youtube', url: 'https://youtube.com/@example' },
  { platform: 'Gamepad', url: 'https://game.example.com' },
  { platform: 'Instagram', url: 'https://instagram.com/example' },
]

const items: LinkItem[] = [
  { type: 'youtube', title: 'Latest Youtube Video', youtubeId: 'dQw4w9WgXcQ' },
  { type: 'link', title: "Join Hyrd's waitlist - My company", url: 'https://hyrd.dev' },
  { type: 'link', title: 'Hyrd.dev - Find a tech job in minutes, not months', url: 'https://hyrd.dev' },
  { type: 'category', title: 'Resources' },
  { type: 'link', title: 'Buy me a coffee :)', url: 'https://buymeacoffee.com/example' },
  { type: 'link', title: 'Startup notes & coding resources (mind map)', url: 'https://example.com/mindmap' },
  { type: 'link', title: 'My saas landing page boilerplate on Github', url: 'https://github.com/example/repo' },
]

export function LinkTree() {
  return (
    <div className="min-h-screen bg-red-50 py-8 px-4 relative overflow-hidden">
      {/* Cloud background pattern */}
      <div className="absolute inset-0 z-0 opacity-20">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000" preserveAspectRatio="none">
          <path d="M0,200 Q200,100 400,200 T800,200 T1200,200 T1600,200 V1000 H0 Z" fill="#FFCCCB" />
          <path d="M0,400 Q200,300 400,400 T800,400 T1200,400 T1600,400 V1000 H0 Z" fill="#FFCCCB" />
          <path d="M0,600 Q200,500 400,600 T800,600 T1200,600 T1600,600 V1000 H0 Z" fill="#FFCCCB" />
          <path d="M0,800 Q200,700 400,800 T800,800 T1200,800 T1600,800 V1000 H0 Z" fill="#FFCCCB" />
        </svg>
      </div>
      
      <div className="max-w-md mx-auto space-y-6 relative z-10">
        <div className="text-center">
          <img
            src={profileImage}
            alt={name}
            className="w-24 h-24 rounded-full mx-auto mb-4 border-2 border-red-200 shadow-sm"
          />
          <h1 className="text-2xl font-bold text-gray-800">{name}</h1>
          <p className="text-gray-600">{description}</p>
        </div>

        <div className="flex justify-center space-x-4">
          {socialLinks.map((link, index) => (
            <a
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-red-500 hover:text-red-600 transition-colors"
            >
              <span className="sr-only">{link.platform}</span>
              {getSocialIcon(link.platform)}
            </a>
          ))}
        </div>

        <div className="space-y-4">
          {items.map((item, index) => (
            <div key={index}>
              {item.type === 'category' && (
                <h2 className="text-lg font-semibold text-red-500 mb-2">{item.title}</h2>
              )}
              {item.type === 'link' && (
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-white rounded-full shadow hover:shadow-md transition-shadow p-4 border border-red-400 hover:border-red-500 text-center"
                  style={{
                    boxShadow: '0 0 5px rgba(255, 0, 0, 0.2)',
                  }}
                >
                  <span className="text-gray-800 font-medium">{item.title}</span>
                </a>
              )}
              {item.type === 'youtube' && (
                <div>
                  <h2 className="text-lg font-semibold text-red-500 mb-2">{item.title}</h2>
                  <div className="aspect-video">
                    <iframe
                      width="100%"
                      height="100%"
                      src={`https://www.youtube.com/embed/${item.youtubeId}`}
                      title={item.title}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function getSocialIcon(platform: string) {
  switch (platform.toLowerCase()) {
    case 'twitter':
      return <Twitter className="w-6 h-6" />
    case 'linkedin':
      return <Linkedin className="w-6 h-6" />
    case 'youtube':
      return <Youtube className="w-6 h-6" />
    case 'instagram':
      return <Instagram className="w-6 h-6" />
    case 'mail':
      return <Mail className="w-6 h-6" />
    case 'music':
      return <Music className="w-6 h-6" />
    case 'gamepad':
      return <Gamepad className="w-6 h-6" />
    default:
      return null
  }
}