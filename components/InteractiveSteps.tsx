'use client'

import React, { useState, useEffect } from 'react'

const InteractiveSteps = () => {
  // Typewriter effect state
  const [currentText, setCurrentText] = useState('')
  const [isTyping, setIsTyping] = useState(true)
  const [animationKey, setAnimationKey] = useState(0) // For at genstart animationen

  // Template slideshow state
  const [currentSlide, setCurrentSlide] = useState(0)

  const aiText = 'Passionate professional with a strong background in [your field]. Experienced in [relevant skills], eager to contribute to innovative teams and grow in dynamic work environments.'

  const templates = [
    { name: 'Simple Professional', image: '/Simple Professional CV Resume.svg' },
    { name: 'Blue & Gray', image: '/Blue and Gray Simple Professional CV Resume.svg' },
    { name: 'Modern Professional', image: '/Modern Professional CV Resume.svg' }
  ]

  // Typewriter effect
  useEffect(() => {
    let charIndex = 0
    setCurrentText('')
    setIsTyping(true)

    const typeInterval = setInterval(() => {
      if (charIndex < aiText.length) {
        setCurrentText(aiText.substring(0, charIndex + 1))
        charIndex++
      } else {
        setIsTyping(false)
        clearInterval(typeInterval)
        
        // Restart after 3 seconds
        setTimeout(() => {
          setAnimationKey(prev => prev + 1) // Trigger restart
        }, 3000)
      }
    }, 40)

    return () => clearInterval(typeInterval)
  }, [animationKey]) // Depends on animationKey to restart

  // Template slideshow
  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 3)
    }, 3000)

    return () => clearInterval(slideInterval)
  }, [])

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-16">
          Create Your Perfect CV in 3 Simple Steps
        </h2>
        
        <div className="space-y-20">
          {/* Step 1: AI Writing */}
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-teal-500 to-teal-600 rounded-full flex items-center justify-center text-white font-bold text-xl mr-4">
                  1
                </div>
                <h3 className="text-2xl font-semibold text-gray-900">
                  Let AI Write Your CV or Fill It Yourself
                </h3>
              </div>
              <p className="text-gray-600 text-lg">
                Our advanced AI can generate professional content instantly, or you can input your own information.
              </p>
            </div>
            <div className="lg:w-1/2">
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="text-center mb-4">
                  <span className="text-2xl">🤖</span>
                  <span className="ml-2 font-semibold">AI Writing Your CV...</span>
                </div>
                <div className="bg-white rounded p-4 text-sm min-h-[120px] border-l-4 border-teal-500">
                  <div className="text-gray-800 leading-relaxed">
                    {currentText}
                    {isTyping && <span className="animate-pulse bg-teal-500 w-2 h-5 inline-block ml-1 rounded-sm"></span>}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Step 2: Template Selection */}
          <div className="flex flex-col lg:flex-row-reverse items-center gap-12">
            <div className="lg:w-1/2">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-teal-500 to-teal-600 rounded-full flex items-center justify-center text-white font-bold text-xl mr-4">
                  2
                </div>
                <h3 className="text-2xl font-semibold text-gray-900">
                  Choose Your Preferred CV Style
                </h3>
              </div>
              <p className="text-gray-600 text-lg">
                Browse through our collection of professional templates and pick the one that fits your personality.
              </p>
            </div>
            <div className="lg:w-1/2">
              <div className="relative h-64 overflow-hidden rounded-lg">
                <div 
                  className="flex transition-transform duration-1000 ease-in-out h-full"
                  style={{ transform: `translateX(-${currentSlide * 50}%)` }}
                >
                  {templates.map((template, index) => (
                    <div key={index} className="flex-shrink-0 w-1/2 px-2">
                      <div className="bg-white rounded-lg shadow-lg p-4 h-full">
                        <div className="w-full h-40 bg-gray-100 rounded mb-2 flex items-center justify-center overflow-hidden">
                          <img 
                            src={template.image} 
                            alt={template.name}
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <div className="text-xs text-center font-semibold text-gray-700">
                          {template.name}
                        </div>
                      </div>
                    </div>
                  ))}
                  {/* Duplicate for seamless loop */}
                  {templates.map((template, index) => (
                    <div key={`duplicate-${index}`} className="flex-shrink-0 w-1/2 px-2">
                      <div className="bg-white rounded-lg shadow-lg p-4 h-full">
                        <div className="w-full h-40 bg-gray-100 rounded mb-2 flex items-center justify-center overflow-hidden">
                          <img 
                            src={template.image} 
                            alt={template.name}
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <div className="text-xs text-center font-semibold text-gray-700">
                          {template.name}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Step 3: Download & Edit */}
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-teal-500 to-teal-600 rounded-full flex items-center justify-center text-white font-bold text-xl mr-4">
                  3
                </div>
                <h3 className="text-2xl font-semibold text-gray-900">
                  Download & Edit Anytime
                </h3>
              </div>
              <p className="text-gray-600 text-lg">
                Export your CV as PDF and make quick edits whenever you need to update your information.
              </p>
            </div>
            <div className="lg:w-1/2">
              <div className="bg-gray-50 rounded-lg p-6 text-center">
                <div className="bg-white rounded-lg p-4 mb-4 mx-auto w-32 h-40 relative overflow-hidden">
                  <div className="w-full h-3 bg-gray-300 rounded mb-3 animate-pulse"></div>
                  <div className="w-3/4 h-2 bg-gray-200 rounded mb-2"></div>
                  <div className="w-full h-2 bg-gray-300 rounded mb-2"></div>
                  <div className="w-2/3 h-2 bg-gray-200 rounded mb-3"></div>
                  <div className="w-full h-2 bg-gray-300 rounded mb-2"></div>
                  <div className="w-4/5 h-2 bg-gray-200 rounded"></div>
                  
                  {/* Animated edit indicators */}
                  <div className="absolute top-2 right-2 flex space-x-1">
                    <div className="w-2 h-2 bg-teal-500 rounded-full animate-ping"></div>
                    <div className="w-2 h-2 bg-teal-500 rounded-full animate-ping" style={{animationDelay: '0.3s'}}></div>
                    <div className="w-2 h-2 bg-teal-500 rounded-full animate-ping" style={{animationDelay: '0.6s'}}></div>
                  </div>
                </div>
                <button className="bg-teal-500 text-white px-6 py-3 rounded-lg hover:bg-teal-600 transition-all duration-300 transform hover:scale-105 shadow-lg">
                  ⬇ Download PDF
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default InteractiveSteps 