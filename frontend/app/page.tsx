import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 relative overflow-hidden">
      {/* Animated gradient background effect */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 animate-gradient-x"></div>
      </div>
      <main className="flex flex-col items-center justify-center text-center px-6 relative z-10">
        <div className="mb-8">
          <h1 className="text-6xl md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 mb-4">
            LearnScope.ai
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
            Personalized AI-powered study recommendations to help you achieve your academic goals
          </p>
        </div>
        
        <div className="mt-12">
          <Link
            href="/form"
            className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-blue-600 rounded-full hover:bg-blue-700 transform transition-all hover:scale-105 shadow-lg hover:shadow-xl"
          >
            Fill the Form
            <svg 
              className="ml-2 w-5 h-5" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </Link>
        </div>
        
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl">
          <div className="p-6 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg shadow-md hover:shadow-xl transition-shadow">
            <div className="mb-3 flex justify-center">
              <svg className="w-12 h-12 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Data-Driven Insights
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Get recommendations based on proven academic patterns
            </p>
          </div>
          
          <div className="p-6 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg shadow-md hover:shadow-xl transition-shadow">
            <div className="mb-3 flex justify-center">
              <svg className="w-12 h-12 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Personalized Plan
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Tailored study strategies that fit your unique profile
            </p>
          </div>
          
          <div className="p-6 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg shadow-md hover:shadow-xl transition-shadow">
            <div className="mb-3 flex justify-center">
              <svg className="w-12 h-12 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Achieve Success
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Improve your academic performance with smart guidance
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
