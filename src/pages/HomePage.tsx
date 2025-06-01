import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Heart, MessageCircle, BarChart, Book } from "lucide-react";

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 to-secondary-600 text-white py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h1
              className="text-4xl md:text-5xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Reflect, Learn, Connect
            </motion.h1>
            <motion.p
              className="text-xl mb-8 text-white/90"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              IntroSpark helps you become your best dating self through
              personalized coaching and real-time feedback.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Link
                to="/onboarding"
                className="btn bg-white text-primary-700 hover:bg-white/90 px-8 py-3 text-lg font-medium rounded-full inline-flex items-center"
              >
                Get Started <ArrowRight size={20} className="ml-2" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-neutral-900">
              How IntroSpark Works
            </h2>
            <p className="mt-4 text-lg text-neutral-600 max-w-2xl mx-auto">
              Our AI-powered platform provides personalized coaching to improve
              your dating skills through reflection and practice.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Heart className="h-10 w-10 text-secondary-500" />,
                title: "Personalized Avatar",
                description:
                  "Meet your AI dating coach tailored to your preferences and learning style.",
              },
              {
                icon: <MessageCircle className="h-10 w-10 text-primary-500" />,
                title: "Practice Conversations",
                description:
                  "Engage in realistic dating scenarios and receive immediate feedback.",
              },
              {
                icon: <BarChart className="h-10 w-10 text-accent-500" />,
                title: "Skill Analysis",
                description:
                  "Visualize your strengths and areas for improvement through detailed charts.",
              },
              {
                icon: <Book className="h-10 w-10 text-success-500" />,
                title: "Progress Reports",
                description:
                  "Track your growth with detailed reports and actionable recommendations.",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="bg-neutral-50 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
              >
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-white shadow-sm mx-auto mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-neutral-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/2 bg-gradient-to-br from-primary-600 to-secondary-500 p-10 text-white">
                <h2 className="text-3xl font-bold mb-4">
                  Ready to transform your dating life?
                </h2>
                <p className="mb-6">
                  Join IntroSpark today and start your journey to becoming more
                  confident and skilled in your dating interactions.
                </p>
                <Link
                  to="/onboarding"
                  className="btn bg-white text-primary-700 hover:bg-white/90"
                >
                  Create Your Profile
                </Link>
              </div>
              <div className="md:w-1/2 p-10">
                <h3 className="text-2xl font-semibold mb-4 text-neutral-900">
                  What our users are saying
                </h3>
                <div className="space-y-4">
                  {[
                    {
                      name: "Alex",
                      quote:
                        "IntroSpark helped me understand my communication patterns and improve my confidence.",
                    },
                    {
                      name: "Jordan",
                      quote:
                        "The personalized feedback was eye-opening. I've seen real improvement in my dating interactions.",
                    },
                  ].map((testimonial, index) => (
                    <div key={index} className="bg-neutral-50 p-4 rounded-lg">
                      <p className="italic text-neutral-700 mb-2">
                        "{testimonial.quote}"
                      </p>
                      <p className="text-sm font-medium text-neutral-900">
                        — {testimonial.name}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
