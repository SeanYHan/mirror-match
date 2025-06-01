import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Heart, Star, MessageCircle, Globe } from "lucide-react";

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
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl shadow-xl">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center">
            <Heart className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
            {t.title}
          </CardTitle>
          <CardDescription className="text-lg">
            {t.description}
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Language Selection */}
            <div className="space-y-3">
              <Label className="text-base font-semibold flex items-center gap-2">
                <Globe className="w-4 h-4" />
                {t.language}
              </Label>
              <Select value={formData.language} onValueChange={(value) => setFormData(prev => ({ ...prev, language: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="es">Español (Spanish)</SelectItem>
                  <SelectItem value="fr">Français (French)</SelectItem>
                  <SelectItem value="de">Deutsch (German)</SelectItem>
                  <SelectItem value="it">Italiano (Italian)</SelectItem>
                  <SelectItem value="pt">Português (Portuguese)</SelectItem>
                  <SelectItem value="ru">Русский (Russian)</SelectItem>
                  <SelectItem value="zh">中文 (Chinese)</SelectItem>
                  <SelectItem value="ja">日本語 (Japanese)</SelectItem>
                  <SelectItem value="ko">한국어 (Korean)</SelectItem>
                  <SelectItem value="ar">العربية (Arabic)</SelectItem>
                  <SelectItem value="hi">हिन्दी (Hindi)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Rating */}
            <div className="space-y-3">
              <Label className="text-base font-semibold flex items-center gap-2">
                <Star className="w-4 h-4" />
                {t.rating}
              </Label>
              <RadioGroup
                value={formData.rating}
                onValueChange={(value) => setFormData(prev => ({ ...prev, rating: value }))}
                className="grid grid-cols-5 gap-4"
              >
                {[1, 2, 3, 4, 5].map((rating) => (
                  <div key={rating} className="flex flex-col items-center space-y-2">
                    <RadioGroupItem value={rating.toString()} id={`rating-${rating}`} />
                    <Label htmlFor={`rating-${rating}`} className="text-sm">
                      {rating} Star{rating !== 1 ? 's' : ''}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            {/* Relationship */}
            <div className="space-y-3">
              <Label className="text-base font-semibold">
                {t.relationship}
              </Label>
              <Select value={formData.relationship} onValueChange={(value) => setFormData(prev => ({ ...prev, relationship: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your relationship" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="date">{t.relationships.date}</SelectItem>
                  <SelectItem value="friend">{t.relationships.friend}</SelectItem>
                  <SelectItem value="family">{t.relationships.family}</SelectItem>
                  <SelectItem value="colleague">{t.relationships.colleague}</SelectItem>
                  <SelectItem value="other">{t.relationships.other}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Category */}
            <div className="space-y-3">
              <Label className="text-base font-semibold">
                {t.category}
              </Label>
              <Select value={formData.category} onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="conversation">{t.categories.conversation}</SelectItem>
                  <SelectItem value="confidence">{t.categories.confidence}</SelectItem>
                  <SelectItem value="appearance">{t.categories.appearance}</SelectItem>
                  <SelectItem value="social_skills">{t.categories.social_skills}</SelectItem>
                  <SelectItem value="listening">{t.categories.listening}</SelectItem>
                  <SelectItem value="humor">{t.categories.humor}</SelectItem>
                  <SelectItem value="overall">{t.categories.overall}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Feedback Content */}
            <div className="space-y-3">
              <Label className="text-base font-semibold flex items-center gap-2">
                <MessageCircle className="w-4 h-4" />
                {t.content}
              </Label>
              <Textarea
                value={formData.content}
                onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                placeholder={t.placeholder}
                className="min-h-[120px] resize-none"
              />
              <p className="text-sm text-muted-foreground">
                {t.privacy}
              </p>
            </div>

            {/* Submit Button */}
            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold py-3"
            >
              {t.submit}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
} 