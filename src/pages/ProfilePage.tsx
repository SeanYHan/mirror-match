import React, { useState } from "react";
import { motion } from "framer-motion";
import { useApp } from "../context/AppContext";
import { User, Heart, Globe, RefreshCw, Save } from "lucide-react";

const ProfilePage: React.FC = () => {
  const { user, setUser, avatar, setAvatar } = useApp();
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(user);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-neutral-600">Please complete onboarding first.</p>
      </div>
    );
  }

  const handleEditToggle = () => {
    if (isEditing) {
      // Save changes
      setUser(editedUser!);
      setIsEditing(false);
    } else {
      // Enter edit mode
      setEditedUser({ ...user });
      setIsEditing(true);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setEditedUser({ ...editedUser!, [name]: value });
  };

  const handleInterestToggle = (interest: string) => {
    const currentInterests = [...editedUser!.interests];

    if (currentInterests.includes(interest)) {
      setEditedUser({
        ...editedUser!,
        interests: currentInterests.filter((i) => i !== interest),
      });
    } else {
      setEditedUser({
        ...editedUser!,
        interests: [...currentInterests, interest],
      });
    }
  };

  const regenerateAvatar = () => {
    if (avatar) {
      const newAvatar = {
        ...avatar,
        image: `https://api.dicebear.com/7.x/avataaars/svg?seed=${Math.random()}`,
      };
      setAvatar(newAvatar);
    }
  };

  // Sample interests for selection
  const interestCategories = {
    Music: [
      "Rock",
      "Pop",
      "Hip-hop",
      "Jazz",
      "Classical",
      "Electronic",
      "Country",
    ],
    Movies: [
      "Action",
      "Comedy",
      "Drama",
      "Sci-fi",
      "Horror",
      "Documentary",
      "Anime",
    ],
    Activities: [
      "Hiking",
      "Cooking",
      "Reading",
      "Gaming",
      "Fitness",
      "Travel",
      "Art",
    ],
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div
        className="max-w-3xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-neutral-900">Your Profile</h1>
          <button
            onClick={handleEditToggle}
            className={`btn ${
              isEditing ? "btn-primary" : "btn-outline"
            } flex items-center`}
          >
            {isEditing ? (
              <>
                <Save size={16} className="mr-2" /> Save Changes
              </>
            ) : (
              "Edit Profile"
            )}
          </button>
        </div>

        <div className="card overflow-hidden">
          {/* Header / Avatar section */}
          <div className="bg-gradient-to-r from-primary-600 to-secondary-500 p-6 md:p-8 text-white">
            <div className="flex flex-col md:flex-row items-center">
              <div className="relative mb-4 md:mb-0 md:mr-6">
                <img
                  src={avatar?.image}
                  alt="Your avatar"
                  className="w-24 h-24 rounded-full border-4 border-white"
                />
                {isEditing && (
                  <button
                    onClick={regenerateAvatar}
                    className="absolute bottom-0 right-0 bg-white text-primary-600 rounded-full p-1 shadow-md hover:bg-neutral-100"
                  >
                    <RefreshCw size={16} />
                  </button>
                )}
              </div>
              <div className="text-center md:text-left">
                <h2 className="text-2xl font-bold">
                  {isEditing ? (
                    <input
                      type="text"
                      name="name"
                      value={editedUser?.name}
                      onChange={handleInputChange}
                      className="bg-white/20 rounded px-2 py-1 text-white placeholder-white/70"
                    />
                  ) : (
                    user.name
                  )}
                </h2>
                <p className="text-white/80">IntroSpark Member</p>
              </div>
            </div>
          </div>

          {/* Profile details */}
          <div className="p-6 md:p-8">
            <div className="space-y-6">
              <section>
                <div className="flex items-center mb-4">
                  <User className="h-5 w-5 text-primary-600 mr-2" />
                  <h3 className="text-lg font-medium text-neutral-900">
                    Personal Information
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="input-label">Age</label>
                    {isEditing ? (
                      <div className="flex items-center">
                        <input
                          type="range"
                          name="age"
                          min="18"
                          max="80"
                          value={editedUser?.age}
                          onChange={handleInputChange}
                          className="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer"
                        />
                        <span className="ml-3 text-neutral-700 min-w-[30px]">
                          {editedUser?.age}
                        </span>
                      </div>
                    ) : (
                      <p className="text-neutral-700">{user.age}</p>
                    )}
                  </div>

                  <div>
                    <label className="input-label">Ethnicity</label>
                    {isEditing ? (
                      <select
                        name="ethnicity"
                        value={editedUser?.ethnicity}
                        onChange={handleInputChange}
                        className="form-input"
                      >
                        <option value="">Select ethnicity (optional)</option>
                        {[
                          "Asian",
                          "Black/African",
                          "Hispanic/Latino",
                          "Middle Eastern",
                          "White/Caucasian",
                          "Mixed",
                          "Other",
                        ].map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <p className="text-neutral-700">
                        {user.ethnicity || "Not specified"}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="input-label">Sexual Orientation</label>
                    {isEditing ? (
                      <select
                        name="orientation"
                        value={editedUser?.orientation}
                        onChange={handleInputChange}
                        className="form-input"
                      >
                        <option value="">Select orientation (optional)</option>
                        {[
                          "Straight",
                          "Gay",
                          "Lesbian",
                          "Bisexual",
                          "Pansexual",
                          "Asexual",
                          "Other",
                        ].map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <p className="text-neutral-700">
                        {user.orientation || "Not specified"}
                      </p>
                    )}
                  </div>
                </div>
              </section>

              <section>
                <div className="flex items-center mb-4">
                  <Globe className="h-5 w-5 text-primary-600 mr-2" />
                  <h3 className="text-lg font-medium text-neutral-900">
                    Language Preference
                  </h3>
                </div>

                {isEditing ? (
                  <select
                    name="language"
                    value={editedUser?.language}
                    onChange={handleInputChange}
                    className="form-input"
                  >
                    {[
                      "English",
                      "Spanish",
                      "French",
                      "German",
                      "Chinese",
                      "Japanese",
                      "Korean",
                    ].map((lang) => (
                      <option key={lang} value={lang}>
                        {lang}
                      </option>
                    ))}
                  </select>
                ) : (
                  <p className="text-neutral-700">{user.language}</p>
                )}
              </section>

              <section>
                <div className="flex items-center mb-4">
                  <Heart className="h-5 w-5 text-primary-600 mr-2" />
                  <h3 className="text-lg font-medium text-neutral-900">
                    Interests
                  </h3>
                </div>

                {isEditing ? (
                  <div className="space-y-4">
                    {Object.entries(interestCategories).map(
                      ([category, interests]) => (
                        <div key={category}>
                          <h4 className="text-sm font-medium text-neutral-700 mb-2">
                            {category}
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {interests.map((interest) => (
                              <button
                                key={interest}
                                onClick={() => handleInterestToggle(interest)}
                                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                                  editedUser?.interests.includes(interest)
                                    ? "bg-primary-600 text-white"
                                    : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
                                }`}
                              >
                                {interest}
                              </button>
                            ))}
                          </div>
                        </div>
                      )
                    )}
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {user.interests.map((interest) => (
                      <span
                        key={interest}
                        className="px-3 py-1.5 bg-primary-100 text-primary-700 rounded-full text-sm font-medium"
                      >
                        {interest}
                      </span>
                    ))}
                    {user.interests.length === 0 && (
                      <p className="text-neutral-500">No interests specified</p>
                    )}
                  </div>
                )}
              </section>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProfilePage;
