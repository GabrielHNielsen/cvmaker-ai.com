import Header from '../../components/Header'
import Link from 'next/link'

export default function PrivacyPage() {
  return (
    <div className="min-h-screen animated-bg">
      <Header />
      
      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
            <p className="text-lg text-gray-600">Last updated: {new Date().toLocaleDateString('da-DK')}</p>
          </div>
          
          <div className="prose prose-lg max-w-none">
            <div className="space-y-8">
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                  <span className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center text-white text-sm font-bold mr-3">1</span>
                  Information We Collect
                </h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  We collect information you provide directly to us, such as:
                </p>
                <div className="bg-gray-50 rounded-lg p-6">
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start">
                      <span className="text-primary-teal mr-2">•</span>
                      Personal information (name, email, phone number)
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary-teal mr-2">•</span>
                      Professional information (work experience, education, skills)
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary-teal mr-2">•</span>
                      Account information when you create an account
                    </li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                  <span className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center text-white text-sm font-bold mr-3">2</span>
                  How We Use Your Information
                </h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  We use the information we collect to:
                </p>
                <div className="bg-blue-50 rounded-lg p-6">
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start">
                      <span className="text-primary-teal mr-2">•</span>
                      Generate your CV using AI technology
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary-teal mr-2">•</span>
                      Provide and maintain our service
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary-teal mr-2">•</span>
                      Communicate with you about your account
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary-teal mr-2">•</span>
                      Improve our service and user experience
                    </li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                  <span className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center text-white text-sm font-bold mr-3">3</span>
                  Information Sharing
                </h2>
                <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded">
                  <p className="text-gray-700 leading-relaxed mb-4">
                    We do not sell, trade, or otherwise transfer your personal information to third parties except:
                  </p>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2">✓</span>
                      With your explicit consent
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2">✓</span>
                      To comply with legal obligations
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2">✓</span>
                      To protect our rights and safety
                    </li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                  <span className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center text-white text-sm font-bold mr-3">4</span>
                  Data Security
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. This includes encryption, secure servers, and regular security audits.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                  <span className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center text-white text-sm font-bold mr-3">5</span>
                  Data Retention
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  We retain your personal information only as long as necessary to provide our services and fulfill the purposes outlined in this privacy policy. You can request deletion of your data at any time.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                  <span className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center text-white text-sm font-bold mr-3">6</span>
                  Your Rights
                </h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  You have the right to:
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-purple-50 rounded-lg p-4">
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-start">
                        <span className="text-purple-600 mr-2">→</span>
                        Access your personal information
                      </li>
                      <li className="flex items-start">
                        <span className="text-purple-600 mr-2">→</span>
                        Correct inaccurate information
                      </li>
                    </ul>
                  </div>
                  <div className="bg-purple-50 rounded-lg p-4">
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-start">
                        <span className="text-purple-600 mr-2">→</span>
                        Request deletion of your information
                      </li>
                      <li className="flex items-start">
                        <span className="text-purple-600 mr-2">→</span>
                        Object to processing of your information
                      </li>
                    </ul>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                  <span className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center text-white text-sm font-bold mr-3">7</span>
                  Cookies
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  We use cookies to enhance your experience, analyze site usage, and assist in our marketing efforts. You can control cookie settings in your browser preferences.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                  <span className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center text-white text-sm font-bold mr-3">8</span>
                  Contact Us
                </h2>
                <div className="bg-blue-50 rounded-lg p-6">
                  <p className="text-gray-700 mb-4">
                    If you have any questions about this Privacy Policy, please contact us:
                  </p>
                  <div className="flex items-center text-primary-teal">
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                    </svg>
                    gabriel.helk.nielsen@outlook.dk
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-600 text-sm">
              © 2024 CVMaker.AI. All rights reserved.
            </div>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="/terms" className="text-gray-600 hover:text-gray-900 text-sm">
                Terms
              </Link>
              <Link href="/privacy" className="text-gray-600 hover:text-gray-900 text-sm">
                Privacy
              </Link>
              <Link href="/support" className="text-gray-600 hover:text-gray-900 text-sm">
                Support
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
} 