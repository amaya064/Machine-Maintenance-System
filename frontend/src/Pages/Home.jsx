import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaTools, FaCogs, FaQuoteLeft } from "react-icons/fa";
import axios from "axios";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  // Fetch products when the Home page is loaded
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/products");
        setProducts(response.data.products);
      } catch (error) {
        setError("Error fetching products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();

    // Auto-scroll to Introduction section after 3 seconds
    setTimeout(() => {
      window.scrollTo({
        top: document.getElementById("introduction").offsetTop,
        behavior: "smooth",
      });
    }, 3000); // Adjust time as needed
  }, []);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentStep(1);
  };

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const finishGuide = () => {
    closeModal();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-teal-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-300">Loading machine data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center p-8 bg-gray-800 rounded-xl">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <p className="text-xl text-gray-300">{error}</p>
          <button 
            className="mt-6 bg-teal-600 hover:bg-teal-700 text-white py-2 px-6 rounded-lg"
            onClick={() => window.location.reload()}
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const testimonials = [
    {
      quote:
        "The predictive maintenance system has reduced our downtime by 45%. The real-time monitoring is incredibly accurate!",
      name: "Sarah Miller",
      role: "Maintenance Supervisor",
    },
    {
      quote:
        "This system makes managing our equipment so much easier. The alerts help us address issues before they become problems.",
      name: "David Roberts",
      role: "Plant Manager",
    },
    {
      quote:
        "The detailed analytics have transformed how we approach equipment maintenance. We've extended machine life by 30%!",
      name: "Emma Johnson",
      role: "Operations Director",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-800 to-gray-900 py-24 h-screen">
        {/* Video Background */}
        <div className="absolute inset-0 overflow-hidden">
          <video
            className="absolute inset-0 w-full h-full object-cover brightness-50"
            src="src/videos/machinery-video.mp4"
            autoPlay
            muted
            loop
            playsInline
            aria-label="Industrial machinery in operation"
          ></video>
        </div>

        {/* Animated grid overlay for industrial feel */}
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>

        {/* Hero Content */}
        <div className="relative z-10 container mx-auto flex flex-col items-center justify-center h-full text-center space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold text-white drop-shadow-lg">
            Industrial <span className="text-teal-400">Machine Maintenance</span> System
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl">
            Predictive maintenance and real-time monitoring for industrial equipment
          </p>
          <button
            onClick={openModal}
            className="flex items-center bg-teal-600 hover:bg-teal-700 text-white py-3 px-6 rounded-lg text-lg shadow-lg transform hover:scale-105 transition duration-300 mt-6"
          >
            <FaTools className="inline mr-2" /> Get Started
          </button>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-10 right-10 w-32 h-32 bg-teal-500 rounded-full opacity-10 blur-2xl animate-pulse"></div>
        <div className="absolute bottom-20 left-10 w-40 h-40 bg-cyan-500 rounded-full opacity-10 blur-2xl animate-pulse"></div>
      </section>

      {/* Modal for Get Started */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 w-full max-w-md">
            <div className="flex justify-between items-center border-b border-gray-700 pb-3">
              <h2 className="text-xl font-bold text-teal-400">System Guide</h2>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-white text-xl"
              >
                &times;
              </button>
            </div>

            {/* Step Content */}
            <div className="my-6">
              {currentStep === 1 && (
                <div>
                  <div className="flex justify-center mb-4">
                    <div className="w-16 h-16 bg-teal-900 rounded-full flex items-center justify-center">
                      <FaCogs className="text-3xl text-teal-400" />
                    </div>
                  </div>
                  <p className="text-gray-300">
                    Welcome to the Industrial Maintenance System. This guide will help you navigate the platform and utilize all maintenance features effectively.
                  </p>
                </div>
              )}

              {currentStep === 2 && (
                <div>
                  <div className="flex justify-center mb-4">
                    <div className="w-16 h-16 bg-teal-900 rounded-full flex items-center justify-center">
                      <FaTools className="text-3xl text-teal-400" />
                    </div>
                  </div>
                  <p className="text-gray-300">
                    Access the machine dashboard to view real-time status, schedule maintenance, and receive predictive alerts for potential issues.
                  </p>
                </div>
              )}

              {currentStep === 3 && (
                <div>
                  <div className="flex justify-center mb-4">
                    <div className="w-16 h-16 bg-teal-900 rounded-full flex items-center justify-center">
                      <svg className="w-8 h-8 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                      </svg>
                    </div>
                  </div>
                  <p className="text-gray-300">
                    View analytics and reports to track equipment performance, maintenance history, and operational efficiency metrics.
                  </p>
                </div>
              )}

              {currentStep === 4 && (
                <div>
                  <div className="flex justify-center mb-4">
                    <div className="w-16 h-16 bg-teal-900 rounded-full flex items-center justify-center">
                      <svg className="w-8 h-8 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                    </div>
                  </div>
                  <p className="text-gray-300">
                    You're all set! Start monitoring your equipment and managing maintenance schedules. Revisit this guide anytime from the help section.
                  </p>
                </div>
              )}
            </div>

            {/* Progress indicator */}
            <div className="flex justify-center mb-6">
              {[1, 2, 3, 4].map(step => (
                <div 
                  key={step} 
                  className={`w-3 h-3 rounded-full mx-1 ${currentStep >= step ? 'bg-teal-500' : 'bg-gray-600'}`}
                ></div>
              ))}
            </div>

            {/* Navigation buttons */}
            <div className="flex justify-between">
              {currentStep > 1 ? (
                <button
                  onClick={() => setCurrentStep(currentStep - 1)}
                  className="bg-gray-700 hover:bg-gray-600 text-white py-2 px-5 rounded-lg"
                >
                  Back
                </button>
              ) : (
                <div></div>
              )}
              
              {currentStep < 4 ? (
                <button
                  onClick={nextStep}
                  className="bg-teal-600 hover:bg-teal-700 text-white py-2 px-5 rounded-lg"
                >
                  Next
                </button>
              ) : (
                <button
                  onClick={finishGuide}
                  className="bg-teal-600 hover:bg-teal-700 text-white py-2 px-5 rounded-lg"
                >
                  Get Started
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Machine Pool Section */}
      <section className="relative py-20 bg-gray-850">
        <div className="absolute inset-0 bg-circuit-pattern opacity-5"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Equipment <span className="text-teal-400">Monitoring</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Real-time status and predictive maintenance for all your industrial equipment
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Predictive Maintenance",
                image: "src/images/predictive-maintenance.jpg",
                description: "AI-powered predictions to identify potential failures before they occur, minimizing downtime.",
                status: "Active",
                statusColor: "bg-green-500",
                link: "/predictive_maintenance",
              },
              {
                title: "Equipment Health Monitoring",
                image: "src/images/equipment-health.jpg",
                description: "Comprehensive monitoring of machine vitals including temperature, vibration, and performance metrics.",
                status: "Active",
                statusColor: "bg-green-500",
                link: "/equipment_health",
              },
              {
                title: "Maintenance Scheduling",
                image: "src/images/maintenance-scheduling.jpg",
                description: "Automated scheduling of routine maintenance tasks with notifications and tracking.",
                status: "Active",
                statusColor: "bg-green-500",
                link: "/maintenance_scheduling",
              },
            ].map((machine, index) => (
              <div key={index} className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700 hover:border-teal-500 transition-colors duration-300">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={machine.image} 
                    alt={machine.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute top-4 right-4">
                    <span className={`${machine.statusColor} text-xs text-white py-1 px-2 rounded-full`}>
                      {machine.status}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-2">{machine.title}</h3>
                  <p className="text-gray-400 mb-4">{machine.description}</p>
                  
                  <Link
                    to={machine.link}
                    className="inline-flex items-center text-teal-400 hover:text-teal-300 font-medium"
                  >
                    View Details
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gray-900">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-white mb-2">
            Trusted by <span className="text-teal-400">Industry Leaders</span>
          </h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            See what maintenance professionals are saying about our system
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gray-800 p-6 rounded-xl border border-gray-700 hover:border-teal-500 transition-colors duration-300">
                <div className="flex mb-4 text-teal-400">
                  <FaQuoteLeft className="text-2xl opacity-80" />
                </div>
                <p className="text-gray-300 italic mb-6">
                  "{testimonial.quote}"
                </p>
                <div>
                  <p className="font-semibold text-white">{testimonial.name}</p>
                  <p className="text-sm text-gray-400">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-850">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { value: "98%", label: "Uptime" },
              { value: "45%", label: "Downtime Reduction" },
              { value: "30%", label: "Extended Machine Life" },
              { value: "24/7", label: "Monitoring" },
            ].map((stat, index) => (
              <div key={index} className="bg-gray-800 p-6 rounded-xl border border-gray-700">
                <div className="text-3xl font-bold text-teal-400 mb-2">{stat.value}</div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}