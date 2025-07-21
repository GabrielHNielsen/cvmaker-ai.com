'use client'

import React, { useEffect } from 'react'
import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import InteractiveSteps from '../../components/InteractiveSteps'
import Logo from '../../components/Logo'

export default function DashboardPage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'loading') return // Still loading

    if (!session) {
      router.push('/login')
    }
  }, [session, status, router])

  if (status === 'loading') {
    return (
      <div className="min-h-screen animated-bg flex items-center justify-center">
        <div className="text-center">
          <div className="spinner w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (!session) {
    return null // Will redirect to login
  }

  const handleSignOut = async () => {
    await signOut({ redirect: false })
    router.push('/')
  }

  return (
    <>
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Logo 
                className="h-8 w-auto" 
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              />
            </div>
            
            <div className="flex items-center space-x-4">
              <button className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-600 hover:text-gray-800 transition-colors">
                <svg className="w-4 h-4" viewBox="0 0 640 480">
                  <path fill="#012169" d="M0 0h640v480H0z"/>
                  <path fill="#FFF" d="m75 0 244 181L562 0h78v62L400 241l240 178v61h-80L320 301 81 480H0v-60l239-178L0 64V0h75z"/>
                  <path fill="#C8102E" d="m424 281 216 159v40L369 281h55zm-184 20 6 35L54 480H0l246-179zM640 0v3L391 191l2-44L590 0h50zM0 0l239 176h-60L0 42V0z"/>
                  <path fill="#FFF" d="M241 0v480h160V0H241zM0 160v160h640V160H0z"/>
                  <path fill="#C8102E" d="M0 193v96h640v-96H0zM273 0v480h96V0h-96z"/>
                </svg>
                <span>English</span>
              </button>
              <div className="text-sm text-gray-700">
                Welcome, {session.user?.name || session.user?.email}!
              </div>
              <button
                onClick={handleSignOut}
                className="btn-secondary text-sm px-4 py-2"
              >
                Sign out
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero bg-gradient-to-br from-teal-50 to-teal-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between">
            <div className="lg:w-1/2 mb-12 lg:mb-0">
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                From blank page to job-winning CV in minutes.
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl">
                Build a polished, recruiter-approved CV that gets noticed, tailored by AI to boost your chances and fast-track your job search.
              </p>
              {/* Service Unavailable Notice */}
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                <div className="flex items-center space-x-3">
                  <span className="text-red-600 text-xl">🚫</span>
                  <div>
                                         <h4 className="text-red-800 font-bold text-sm">CV Generator Unavailable</h4>
                     <p className="text-red-700 text-sm">The service is not working right now - We're working to fix the issue</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                                  <button 
                    disabled 
                    className="btn-secondary text-lg px-8 py-4 opacity-50 cursor-not-allowed"
                    onClick={() => alert('🚫 The service is temporarily unavailable')}
                  >
                    Improve my CV (Unavailable)
                  </button>
                  <button 
                    disabled 
                    className="btn-primary text-lg px-8 py-4 opacity-50 cursor-not-allowed"
                    onClick={() => alert('🚫 The service is temporarily unavailable')}
                  >
                    Create new CV (Unavailable)
                  </button>
              </div>
            </div>
            
            <div className="lg:w-1/2 flex justify-center">
              <div className="relative w-full max-w-lg h-96">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative w-72 h-96">
                    {/* Venstre CV - bag til venstre */}
                    <div className="floating-cv-1 absolute bg-white rounded-lg shadow-lg p-3 hover:scale-105 transition-transform duration-500" style={{ width: '280px', height: '380px', zIndex: 10, opacity: 0.85 }}>
                      <Image 
                        src="/Simple Professional CV Resume.svg" 
                        alt="CV 1" 
                        width={280} 
                        height={380} 
                        className="w-full h-full object-contain rounded" 
                        priority={false}
                        loading="lazy"
                      />
                    </div>
                    
                    {/* Midterste CV - forrest */}
                    <div className="floating-cv-2 absolute bg-white rounded-lg shadow-2xl p-3 hover:scale-105 transition-transform duration-500" style={{ width: '280px', height: '380px', zIndex: 30, opacity: 1 }}>
                      <Image 
                        src="/Blue and Gray Simple Professional CV Resume.svg" 
                        alt="CV 2" 
                        width={280} 
                        height={380} 
                        className="w-full h-full object-contain rounded" 
                        priority={true}
                      />
                    </div>
                    
                    {/* Højre CV - bag til højre */}
                    <div className="floating-cv-3 absolute bg-white rounded-lg shadow-xl p-3 hover:scale-105 transition-transform duration-500" style={{ width: '280px', height: '380px', zIndex: 20, opacity: 0.9 }}>
                      <Image 
                        src="/Modern Professional CV Resume.svg" 
                        alt="CV 3" 
                        width={280} 
                        height={380} 
                        className="w-full h-full object-contain rounded" 
                        priority={false}
                        loading="lazy"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section Separator */}
      <div className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center space-x-4">
            <div className="h-px bg-gradient-to-r from-transparent via-teal-500 to-transparent flex-1"></div>
            <div className="flex space-x-2">
              <div className="w-3 h-3 bg-teal-500 rounded-full animate-pulse"></div>
              <div className="w-3 h-3 bg-teal-500 rounded-full animate-pulse" style={{animationDelay: '0.6s'}}></div>
              <div className="w-3 h-3 bg-teal-500 rounded-full animate-pulse" style={{animationDelay: '1.2s'}}></div>
            </div>
            <div className="h-px bg-gradient-to-r from-transparent via-teal-500 to-transparent flex-1"></div>
          </div>
        </div>
      </div>

      {/* Interactive Steps */}
      <InteractiveSteps />

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-teal-500 to-teal-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to build your perfect CV?
          </h2>
          <p className="text-xl text-teal-100 mb-8">
            Join thousands of professionals who have already created their dream CVs
          </p>
                      <button 
              disabled 
              className="bg-gray-300 text-gray-500 px-8 py-4 rounded-lg font-semibold cursor-not-allowed inline-block"
              onClick={() => alert('🚫 The service is temporarily unavailable')}
            >
              🚫 Service Unavailable
            </button>
        </div>
      </section>
    </>
  )
} 