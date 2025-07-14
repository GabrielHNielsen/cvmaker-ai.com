import Header from '../../components/Header'
import Link from 'next/link'

export default function TermsPage() {
  return (
    <div className="min-h-screen animated-bg">
      <Header />
      
      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Terms of Service</h1>
            <p className="text-lg text-gray-600">Last updated: {new Date().toLocaleDateString('da-DK')}</p>
          </div>
          
          <div className="prose prose-lg max-w-none">
            <div className="space-y-8">
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                  <span className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center text-white text-sm font-bold mr-3">1</span>
                  Acceptance of Terms
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  By accessing and using CVMaker.AI, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to these terms, please do not use our service.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                  <span className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center text-white text-sm font-bold mr-3">2</span>
                  Service Description
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  CVMaker.AI is an AI-powered CV generation service that helps users create professional resumes using artificial intelligence and design templates. Our service enhances your career information to create compelling, professional CVs.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                  <span className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center text-white text-sm font-bold mr-3">3</span>
                  User Responsibilities
                </h2>
                <div className="bg-gray-50 rounded-lg p-6">
                  <p className="text-gray-700 mb-4">By using our service, you agree to:</p>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start">
                      <span className="text-primary-teal mr-2">•</span>
                      Provide accurate and truthful information
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary-teal mr-2">•</span>
                      Use the service for lawful purposes only
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary-teal mr-2">•</span>
                      Respect intellectual property rights
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary-teal mr-2">•</span>
                      Not attempt to reverse engineer or hack the service
                    </li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                  <span className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center text-white text-sm font-bold mr-3">4</span>
                  Privacy and Data
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  We collect and process personal data in accordance with our <Link href="/privacy" className="text-primary-teal hover:underline">Privacy Policy</Link>. Your CV data is used solely for generating your resume and is not shared with third parties.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                  <span className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center text-white text-sm font-bold mr-3">5</span>
                  Intellectual Property
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  The generated CVs belong to you. However, the underlying technology, templates, and service remain the property of CVMaker.AI. You may not reproduce, distribute, or create derivative works of our service.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                  <span className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center text-white text-sm font-bold mr-3">6</span>
                  Limitation of Liability
                </h2>
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
                  <p className="text-gray-700 leading-relaxed">
                    CVMaker.AI is provided "as is" without warranty of any kind. We are not liable for any damages arising from the use of our service, including but not limited to direct, indirect, incidental, or consequential damages.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                  <span className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center text-white text-sm font-bold mr-3">7</span>
                  Changes to Terms
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  We reserve the right to modify these terms at any time. Users will be notified of significant changes via email or through our service. Continued use of the service after changes constitutes acceptance of the new terms.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                  <span className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center text-white text-sm font-bold mr-3">8</span>
                  Contact Information
                </h2>
                <div className="bg-blue-50 rounded-lg p-6">
                  <p className="text-gray-700 mb-4">
                    If you have any questions about these Terms of Service, please contact us:
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