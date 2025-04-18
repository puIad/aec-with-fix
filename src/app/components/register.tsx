"use client";

import React, { useState } from "react";
import PersonalInfoForm from "./persoForm";

export default function Reg() {
  const sections = ["Team Leader", "Member 1", "Member 2", "Member 3"];
  const [currentFormIndex, setCurrentFormIndex] = useState(0);
  const [teamId, setTeamId] = useState<number | null>(null);

  // Shared state for each member's form data
  const [formStates, setFormStates] = useState(
    sections.map(() => ({
      full_name: "",
      email: "",
      university: "",
      linkedin: "",
      discord_id: "",
      year_of_study: "",
      phone: "",
      national_id: "",
      study_field: "",
      skills: "",
      team_name: "",
      hypscb: "",
      elaborate: "",
      experience: "",
      software: "",
      
    }))
  );

  const nextForm = () => {
    if (currentFormIndex < sections.length - 1) {
      setCurrentFormIndex((prev) => prev + 1);
    }
  };

  const prevForm = () => {
    if (currentFormIndex > 0) {
      setCurrentFormIndex((prev) => prev - 1);
    }
  };

  const handleFinalSubmit = () => {
    // Example: submit all members' data
    console.log("Submitting all data:", formStates);
  };

  return (
    <div className="relative flex flex-col items-center justify-center w-full h-full pt-30">
      {/* Arrows */}
      {/* Left Arrow */}
<div className="absolute top-1/2 left-4 transform -translate-y-1/2 z-10">
  <button
    onClick={prevForm}
    className="flex items-center justify-center text-xl sm:text-3xl text-white bg-indigo-900 bg-opacity-40 w-8 sm:w-10 aspect-square rounded-full hover:bg-[#FFC200] transition"
  >
    &lt;
  </button>
</div>

{/* Right Arrow */}
<div className="absolute top-1/2 right-4 transform -translate-y-1/2 z-10">
  <button
    onClick={nextForm}
    className="flex items-center justify-center text-xl sm:text-3xl text-white bg-indigo-900 bg-opacity-40 w-8 sm:w-10 aspect-square rounded-full hover:bg-[#FFC200] transition"
  >
    &gt;
  </button>
</div>


      {/* Form Slide Container */}
      <div className="w-full overflow-hidden">
        <div
          className="flex transition-transform duration-500"
          style={{ transform: `translateX(-${currentFormIndex * 100}%)` }}
        >
          {sections.map((title, idx) => (
            <div key={idx} className="w-full flex-shrink-0">
              <PersonalInfoForm
                title={title}
                isLastForm={idx === sections.length - 1}
                onSubmit={() => {
                  if (idx < sections.length - 1) {
                    nextForm();
                  } else {
                    handleFinalSubmit();
                  }
                }}
                formData={formStates[idx]}
                setFormData={(newData) => {
                  const updatedStates = [...formStates];
                  updatedStates[idx] = newData;
                  setFormStates(updatedStates);
                }}
                teamId={teamId}
                setTeamId={setTeamId}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
