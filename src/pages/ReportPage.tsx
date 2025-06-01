import React from "react";
import { motion } from "framer-motion";
import { useApp } from "../context/AppContext";
import { FileText, ThumbsUp, ThumbsDown, ArrowUp } from "lucide-react";
import SkillsRadarChart from "../components/dashboard/SkillsRadarChart";

const ReportPage: React.FC = () => {
  const { user } = useApp();

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-neutral-600">Please complete onboarding first.</p>
      </div>
    );
  }

  // Calculate the user's strongest and weakest skills
  const skills = Object.entries(user.skills).sort((a, b) => b[1] - a[1]);
  const strongestSkill = skills[0];
  const weakestSkill = skills[skills.length - 1];

  // Generate report sections
  const overallPerformance = `
    Based on your interactions and self-assessment, your dating skills profile shows a 
    ${
      skills[0][1] > 7 ? "strong" : "developing"
    } foundation. You demonstrate particular strength 
    in ${strongestSkill[0]} (${
    strongestSkill[1]
  }/10), which places you above average in this area.
    Your overall communication style appears to be ${
      user.skills.communication > 6
        ? "confident and engaging"
        : "thoughtful and considerate"
    }, and you're making good progress in developing your dating abilities.
  `;

  const strengths = `
    You excel at ${strongestSkill[0]}. This is evident in how you ${
    strongestSkill[0] === "communication"
      ? "express yourself clearly and engage others in conversation"
      : strongestSkill[0] === "confidence"
      ? "present yourself with self-assurance and positive body language"
      : strongestSkill[0] === "empathy"
      ? "understand and respond to others' emotions and perspectives"
      : strongestSkill[0] === "complimenting"
      ? "offer genuine and specific praise that makes others feel valued"
      : "actively listen and show interest in what others are sharing"
  }. This skill creates a positive impression and helps establish connection in dating scenarios.
    Your interest in ${
      user.interests[0] || "your hobbies"
    } also provides good conversation starters.
  `;

  const weaknesses = `
    One area to focus on improving is ${weakestSkill[0]} (${
    weakestSkill[1]
  }/10). 
    ${
      weakestSkill[0] === "communication"
        ? "Try practicing more open-ended questions and varying your conversation topics. Consider preparing a few interesting stories or questions beforehand."
        : weakestSkill[0] === "confidence"
        ? "Work on maintaining eye contact and speaking at a steady pace. Remember that confidence comes from preparation and positive self-talk."
        : weakestSkill[0] === "empathy"
        ? "Practice active listening and reflecting back what you hear. Try to understand perspectives different from your own."
        : weakestSkill[0] === "complimenting"
        ? "Focus on giving specific, genuine compliments rather than generic ones. Notice and comment on unique qualities or efforts."
        : "Improve your listening skills by focusing fully on the speaker, asking follow-up questions, and avoiding interrupting."
    }
    Small improvements in this area can have a significant impact on your dating success.
  `;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div
        className="max-w-3xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="card p-6 md:p-8">
          <div className="flex items-center mb-6">
            <div className="h-12 w-12 rounded-full bg-primary-100 flex items-center justify-center mr-4">
              <FileText className="h-6 w-6 text-primary-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-neutral-900">
                Your Dating Skills Report
              </h1>
              <p className="text-neutral-600">
                Based on your profile and interactions with IntroSpark
              </p>
            </div>
          </div>

          <div className="mb-8">
            <SkillsRadarChart skills={user.skills} />
          </div>

          <div className="space-y-6">
            <section>
              <h2 className="text-xl font-semibold text-neutral-900 mb-3">
                Overall Performance
              </h2>
              <p className="text-neutral-700 leading-relaxed">
                {overallPerformance}
              </p>
            </section>

            <section>
              <h2 className="flex items-center text-xl font-semibold text-neutral-900 mb-3">
                <ThumbsUp className="h-5 w-5 text-success-500 mr-2" /> Strengths
              </h2>
              <p className="text-neutral-700 leading-relaxed">{strengths}</p>
            </section>

            <section>
              <h2 className="flex items-center text-xl font-semibold text-neutral-900 mb-3">
                <ThumbsDown className="h-5 w-5 text-error-500 mr-2" /> Areas to
                Improve
              </h2>
              <p className="text-neutral-700 leading-relaxed">{weaknesses}</p>
            </section>
          </div>

          <div className="mt-10 pt-6 border-t border-neutral-200">
            <h3 className="text-lg font-semibold text-neutral-900 mb-3">
              Next Steps
            </h3>
            <div className="bg-primary-50 rounded-lg p-4">
              <div className="flex">
                <div className="mr-4">
                  <ArrowUp className="h-5 w-5 text-primary-600" />
                </div>
                <div>
                  <p className="text-neutral-800">
                    Based on your report, we recommend focusing on improving
                    your {weakestSkill[0]} skills. Chat with your coach to get
                    personalized exercises and feedback.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ReportPage;
