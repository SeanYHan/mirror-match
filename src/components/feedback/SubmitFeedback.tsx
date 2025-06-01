import { useState } from "react";
import { Heart, Star, MessageCircle, Globe } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Language translations
const translations = {
  en: {
    title: "Share Your Dating Experience",
    description: "Help someone improve their dating skills by sharing your honest experience. Your feedback will help their dating coach provide better guidance.",
    language: "Choose your preferred language",
    rating: "How would you rate your recent experience?",
    relationship: "How do you know this person?",
    category: "What aspect would you like to share feedback about?",
    content: "Share your thoughts and experiences",
    placeholder: "Share your honest thoughts about your experience with this person. What went well? What could they improve? Your feedback helps them become better at dating and relationships.",
    submit: "Submit Feedback",
    privacy: "Your privacy is protected. This feedback is submitted anonymously and securely.",
    relationships: {
      date: "I went on a date with them",
      friend: "I'm a friend", 
      family: "I'm family",
      colleague: "I'm a colleague/acquaintance",
      other: "Other"
    },
    categories: {
      conversation: "Conversation & Communication",
      confidence: "Confidence & Energy",
      appearance: "Appearance & Presentation",
      social_skills: "Social Skills & Manners",
      listening: "Listening & Attention",
      humor: "Humor & Personality",
      overall: "Overall Experience"
    }
  }
};

export default function SubmitFeedback() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    rating: "",
    category: "",
    content: "",
    language: "en",
    relationship: "",
    anonymous: true
  });

  const t = translations[formData.language as keyof typeof translations] || translations.en;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.rating || !formData.category || !formData.content || !formData.relationship) {
      alert("Please fill in all fields");
      return;
    }
    console.log("Form submitted:", formData);
    // Here you would typically send the data to your backend
    navigate('/feedback-complete');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-xl overflow-hidden">
        <div className="p-6 text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center">
            <Heart className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
            {t.title}
          </h1>
          <p className="text-lg text-neutral-600">
            {t.description}
          </p>
        </div>

        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Language Selection */}
            <div className="space-y-3">
              <label className="text-base font-semibold flex items-center gap-2">
                <Globe className="w-4 h-4" />
                {t.language}
              </label>
              <select
                value={formData.language}
                onChange={(e) => setFormData(prev => ({ ...prev, language: e.target.value }))}
                className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="en">English</option>
                <option value="es">Español (Spanish)</option>
                <option value="fr">Français (French)</option>
                <option value="de">Deutsch (German)</option>
                <option value="it">Italiano (Italian)</option>
                <option value="pt">Português (Portuguese)</option>
                <option value="ru">Русский (Russian)</option>
                <option value="zh">中文 (Chinese)</option>
                <option value="ja">日本語 (Japanese)</option>
                <option value="ko">한국어 (Korean)</option>
                <option value="ar">العربية (Arabic)</option>
                <option value="hi">हिन्दी (Hindi)</option>
              </select>
            </div>

            {/* Rating */}
            <div className="space-y-3">
              <label className="text-base font-semibold flex items-center gap-2">
                <Star className="w-4 h-4" />
                {t.rating}
              </label>
              <div className="grid grid-cols-5 gap-4">
                {[1, 2, 3, 4, 5].map((rating) => (
                  <div key={rating} className="flex flex-col items-center space-y-2">
                    <input
                      type="radio"
                      name="rating"
                      value={rating}
                      id={`rating-${rating}`}
                      checked={formData.rating === rating.toString()}
                      onChange={(e) => setFormData(prev => ({ ...prev, rating: e.target.value }))}
                      className="w-4 h-4 text-primary-600 focus:ring-primary-500"
                    />
                    <label htmlFor={`rating-${rating}`} className="text-sm">
                      {rating} Star{rating !== 1 ? 's' : ''}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Relationship */}
            <div className="space-y-3">
              <label className="text-base font-semibold">
                {t.relationship}
              </label>
              <select
                value={formData.relationship}
                onChange={(e) => setFormData(prev => ({ ...prev, relationship: e.target.value }))}
                className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="">Select your relationship</option>
                <option value="date">{t.relationships.date}</option>
                <option value="friend">{t.relationships.friend}</option>
                <option value="family">{t.relationships.family}</option>
                <option value="colleague">{t.relationships.colleague}</option>
                <option value="other">{t.relationships.other}</option>
              </select>
            </div>

            {/* Category */}
            <div className="space-y-3">
              <label className="text-base font-semibold">
                {t.category}
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="">Select a category</option>
                <option value="conversation">{t.categories.conversation}</option>
                <option value="confidence">{t.categories.confidence}</option>
                <option value="appearance">{t.categories.appearance}</option>
                <option value="social_skills">{t.categories.social_skills}</option>
                <option value="listening">{t.categories.listening}</option>
                <option value="humor">{t.categories.humor}</option>
                <option value="overall">{t.categories.overall}</option>
              </select>
            </div>

            {/* Feedback Content */}
            <div className="space-y-3">
              <label className="text-base font-semibold flex items-center gap-2">
                <MessageCircle className="w-4 h-4" />
                {t.content}
              </label>
              <textarea
                value={formData.content}
                onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                placeholder={t.placeholder}
                className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 min-h-[120px] resize-none"
              />
              <p className="text-sm text-neutral-500">
                {t.privacy}
              </p>
            </div>

            {/* Submit Button */}
            <button 
              type="submit" 
              className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold py-3 rounded-lg transition-colors duration-200"
            >
              {t.submit}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
} 