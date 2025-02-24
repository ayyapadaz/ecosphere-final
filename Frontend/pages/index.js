export default function Home() {
  return (
    <main className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-mint-50 to-white">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -right-1/4 -top-1/4 w-1/2 h-1/2 bg-emerald-100 rounded-full blur-3xl opacity-20" />
          <div className="absolute -left-1/4 top-1/4 w-1/2 h-1/2 bg-emerald-200 rounded-full blur-3xl opacity-20" />
        </div>

        <div className="max-w-7xl mx-auto px-4 pt-24 pb-16 sm:pt-32 sm:pb-24 relative">
          {/* Hero Content */}
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-6">
              <span className="px-4 py-2 rounded-full bg-emerald-100 text-emerald-700 text-sm font-medium">
                Revolutionizing Waste Management
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              <span className="text-gray-900">Transform Waste into </span>
              <span className="text-emerald-600">Valuable Resources</span>
            </h1>
            <p className="text-gray-600 max-w-3xl mx-auto text-lg mb-8">
              Connect waste treatment facilities with innovative creators and eco-conscious buyers in a sustainable marketplace.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors">
                Get Started
              </button>
              <button className="px-8 py-4 bg-white text-emerald-600 rounded-lg border-2 border-emerald-600 hover:bg-emerald-50 transition-colors">
                Watch Demo
              </button>
            </div>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto mb-20">
            {[
              { number: "2M+", label: "Tons Recycled" },
              { number: "500+", label: "Active Plants" },
              { number: "1000+", label: "Manufacturers" },
              { number: "150K+", label: "Products Created" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold text-emerald-600">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Recycling Plants Card */}
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100 group hover:bg-gradient-to-br hover:from-emerald-50 hover:to-white">
              <div className="text-emerald-600 mb-4 bg-emerald-50 p-3 rounded-lg inline-block">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M21 8v12.993A1 1 0 0 1 20.007 22H3.993A.993.993 0 0 1 3 21.008V2.992C3 2.455 3.449 2 4.002 2h10.995L21 8zm-2 1h-5V4H5v16h14V9zM8 7h3v2H8V7zm0 4h8v2H8v-2zm0 4h8v2H8v-2z"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">Recycling Plants</h3>
              <p className="text-gray-700 mb-4 font-medium">
                List your processed materials and connect with manufacturers
              </p>
              <a href="#" className="text-emerald-600 flex items-center hover:text-emerald-700 group-hover:font-medium">
                Learn More
                <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>

            {/* Manufacturers Card */}
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100 group hover:bg-gradient-to-br hover:from-blue-50 hover:to-white">
              <div className="text-blue-600 mb-4 bg-blue-50 p-3 rounded-lg inline-block">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M21 13v7a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-7H2v-2l1-5h18l1 5v2h-1zM5 13v6h14v-6H5zm-.96-2h15.92l-.6-3H4.64l-.6 3zM6 14h8v3H6v-3z"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">Manufacturers</h3>
              <p className="text-gray-700 mb-4 font-medium">
                Source eco-friendly materials and sell sustainable products
              </p>
              <a href="#" className="text-blue-600 flex items-center hover:text-blue-700 group-hover:font-medium">
                Learn More
                <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>

            {/* Consumers Card */}
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100 group hover:bg-gradient-to-br hover:from-gray-50 hover:to-white">
              <div className="text-gray-800 mb-4 bg-gray-100 p-3 rounded-lg inline-block">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2a6 6 0 0 1 6 6v1h4v2h-1.167l-.757 9.083a1 1 0 0 1-.996.917H4.92a1 1 0 0 1-.996-.917L3.166 11H2V9h4V8a6 6 0 0 1 6-6zm6.826 9H5.173l.667 8h12.319l.667-8zM13 13v4h-2v-4h2zm-4 0v4H7v-4h2zm8 0v4h-2v-4h2zm-5-9a4 4 0 0 0-3.995 3.8L8 8v1h8V8a4 4 0 0 0-3.8-3.995L12 4z"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">American Raw Material</h3>
              <p className="text-gray-700 mb-4 font-medium">
                Shop certified eco-friendly raw materials and support American sustainability
              </p>
              <a href="#" className="text-gray-800 flex items-center hover:text-black group-hover:font-medium">
                Learn More
                <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our platform simplifies the process of connecting waste management facilities with manufacturers and consumers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                step: "01",
                title: "Register Your Facility",
                description: "Sign up and list your recycling capabilities and materials."
              },
              {
                step: "02",
                title: "Connect & Trade",
                description: "Match with manufacturers and trade materials efficiently."
              },
              {
                step: "03",
                title: "Track Impact",
                description: "Monitor your environmental impact and grow your network."
              }
            ].map((item, index) => (
              <div key={index} className="relative">
                <div className="text-5xl font-bold text-emerald-100 mb-4">{item.step}</div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-emerald-600 py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Join the Circular Economy?
          </h2>
          <p className="text-emerald-100 mb-8 max-w-2xl mx-auto">
            Start your journey towards sustainable waste management today.
          </p>
          <button className="px-8 py-4 bg-white text-emerald-600 rounded-lg hover:bg-emerald-50 transition-colors font-medium">
            Get Started Now
          </button>
        </div>
      </section>
    </main>
  );
} 