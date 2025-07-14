import Header from '../../components/Header'
import Link from 'next/link'

export default function SupportPage() {
  return (
    <div className="min-h-screen animated-bg">
      <Header />
      
      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Support & Help</h1>
            <p className="text-lg text-gray-600">We're here to help you create amazing CVs!</p>
          </div>
          
          <div className="prose prose-lg max-w-none">
            <div className="space-y-8">
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
                  How can we help you?
                </h2>
                <p className="text-gray-700 leading-relaxed text-center mb-8">
                  Welcome to CVMaker.AI support! Here you'll find answers to common questions and ways to get help.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
                  <span className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center text-white text-sm font-bold mr-3">?</span>
                  Frequently Asked Questions
                </h2>
                
                <div className="space-y-6">
                  <div className="bg-blue-50 rounded-lg p-6">
                    <h3 className="font-semibold text-lg mb-3 text-gray-900">How does the AI CV generation work?</h3>
                    <p className="text-gray-700 leading-relaxed">
                      Our AI analyzes your input information and enhances it with professional language, 
                      relevant skills, and compelling descriptions to create a standout CV that gets noticed by employers.
                    </p>
                  </div>

                  <div className="bg-green-50 rounded-lg p-6">
                    <h3 className="font-semibold text-lg mb-3 text-gray-900">What information do I need to provide?</h3>
                    <p className="text-gray-700 leading-relaxed">
                      You'll need your basic contact information, work experience, education, 
                      skills, and any achievements you'd like to highlight. The more detail you provide, the better your CV will be.
                    </p>
                  </div>

                  <div className="bg-purple-50 rounded-lg p-6">
                    <h3 className="font-semibold text-lg mb-3 text-gray-900">Can I edit the generated CV?</h3>
                    <p className="text-gray-700 leading-relaxed">
                      Yes! You can review and edit all generated content before finalizing your CV. 
                      Our AI provides a great starting point, but you have full control over the final result.
                    </p>
                  </div>

                  <div className="bg-yellow-50 rounded-lg p-6">
                    <h3 className="font-semibold text-lg mb-3 text-gray-900">What formats are available for download?</h3>
                    <p className="text-gray-700 leading-relaxed">
                      Currently, we support PDF download with professional formatting. 
                      More formats may be added in the future based on user feedback.
                    </p>
                  </div>

                  <div className="bg-red-50 rounded-lg p-6">
                    <h3 className="font-semibold text-lg mb-3 text-gray-900">Is my data secure?</h3>
                    <p className="text-gray-700 leading-relaxed">
                      Yes, we take data security seriously. Your information is encrypted and 
                      never shared with third parties. See our <Link href="/privacy" className="text-primary-teal hover:underline">Privacy Policy</Link> for more details.
                    </p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
                  <span className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center text-white text-sm font-bold mr-3">📧</span>
                  Contact Support
                </h2>
                <p className="text-gray-700 leading-relaxed mb-6">
                  If you need additional help or have questions not covered here, please reach out to us:
                </p>
                
                <div className="bg-gradient-primary-light rounded-lg p-6 border border-primary-teal">
                  <h3 className="font-semibold mb-3 text-gray-900">Email Support</h3>
                  <div className="flex items-center text-primary-teal mb-2">
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                    </svg>
                    <span className="font-medium">gabriel.helk.nielsen@outlook.dk</span>
                  </div>
                  <p className="text-sm text-gray-600">
                    We typically respond within 24 hours during business days.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
                  <span className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center text-white text-sm font-bold mr-3">🔧</span>
                  Technical Issues
                </h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  If you're experiencing technical problems, try these steps:
                </p>
                <div className="bg-gray-50 rounded-lg p-6">
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start">
                      <span className="text-primary-teal mr-3 mt-1">1.</span>
                      <span>Try refreshing your browser</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary-teal mr-3 mt-1">2.</span>
                      <span>Clear your browser cache and cookies</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary-teal mr-3 mt-1">3.</span>
                      <span>Ensure you have a stable internet connection</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary-teal mr-3 mt-1">4.</span>
                      <span>Try using a different browser (Chrome, Firefox, Safari)</span>
                    </li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
                  <span className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center text-white text-sm font-bold mr-3">💡</span>
                  Feature Requests
                </h2>
                <div className="bg-gradient-primary-light rounded-lg p-6 border border-primary-teal">
                  <p className="text-gray-700 leading-relaxed">
                    We're always looking to improve CVMaker.AI! If you have suggestions for new features 
                    or improvements, please email us with your ideas. We value your feedback and consider 
                    all suggestions for future updates.
                  </p>
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