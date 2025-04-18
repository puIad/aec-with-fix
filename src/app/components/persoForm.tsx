"use client";

import { Button, Input, Textarea } from "./elements";
import toast from "react-hot-toast";
import { supabase } from "../lib/supabaseClient";

type FormData = {
  full_name: string;
  email: string;
  university: string;
  linkedin: string;
  discord_id: string;
  year_of_study: string;
  phone: string;
  national_id: string;
  study_field: string;
  skills: string;
  team_name: string;
  hypscb: string;
  elaborate: string;
  experience: string;
  software: string;
};

type PersonalInfoFormProps = {
  title: string;
  isLastForm: boolean;
  onSubmit: () => void;
  formData: FormData;
  setFormData: (data: FormData) => void;
  teamId: number | null;
  setTeamId: (id: number) => void;
};

const PersonalInfoForm: React.FC<PersonalInfoFormProps> = ({
  title,
  isLastForm,
  onSubmit,
  formData,
  setFormData,
  teamId,
  setTeamId,
}) => {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      let currentTeamId: number | null = teamId;
      const isLeader = title.toLowerCase() === "team leader";

      // If leader and team doesn't exist, create team first
      if (isLeader && !currentTeamId) {
        if (!formData.team_name.trim()) {
          toast.error("Please enter a team name.");
          return;
        }

        const { data: teamData, error: teamError } = await supabase
          .from("teams")
          .insert([{ team_name: formData.team_name }])
          .select("id")
          .single();

        if (teamError || !teamData) {
          console.error("Team creation error:", teamError);
          toast.error(teamError?.message || "Failed to create team.");
          return;
        }

        currentTeamId = teamData.id;
        if (currentTeamId !== null) {
            setTeamId(currentTeamId);
          }
                }

      // Make sure we have a valid team ID before inserting member
      if (currentTeamId === null) {
        toast.error("Missing team ID. Please ensure the team was created.");
        return;
      }

      const { error: memberError } = await supabase.from("members").insert([
        {
          team_id: currentTeamId,
          full_name: formData.full_name,
          email: formData.email,
          university: formData.university,
          linkedin_link: formData.linkedin,
          discord_id: formData.discord_id,
          phone_number: formData.phone,
          national_id: formData.national_id,
          study_field: formData.study_field,
          year_of_study: formData.year_of_study,
          skills: formData.skills,
          hypscb: formData.hypscb,
          elaborate: formData.elaborate,
          experience: formData.experience,
          software: formData.software
        },
      ]);

      if (memberError) {
        console.error("Member insert error:", memberError);
        toast.error(memberError.message || "Failed to add member.");
        return;
      }

      toast.success("Info submitted successfully!");
      onSubmit();
    } catch (err) {
      console.error("Unexpected error:", err);
      toast.error("Something went wrong.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-3xl mx-auto space-y-4 bg-indigo-900/30 p-6 rounded-xl shadow-lg "
    >
      <h2 className="aec text-2xl font-semibold text-[#FFC200] text-center">{title}</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  <div className="flex flex-col">
    <label className="text-white mb-1">Full Name</label>
    <Input name="full_name" value={formData.full_name} onChange={handleChange} className="border border-white px-3 py-2 rounded" />
  </div>

  <div className="flex flex-col">
    <label className="text-white mb-1">Phone Number</label>
    <Input name="phone" value={formData.phone} onChange={handleChange} className="border border-white px-3 py-2 rounded" />
  </div>

  <div className="flex flex-col">
    <label className="text-white mb-1">Email</label>
    <Input name="email" value={formData.email} onChange={handleChange} className="border border-white px-3 py-2 rounded" />
  </div>

  <div className="flex flex-col">
    <label className="text-white mb-1">National ID</label>
    <Input name="national_id" value={formData.national_id} onChange={handleChange} className="border border-white px-3 py-2 rounded" />
  </div>

  <div className="flex flex-col">
    <label className="text-white mb-1">University</label>
    <Input name="university" value={formData.university} onChange={handleChange} className="border border-white px-3 py-2 rounded" />
  </div>

  <div className="flex flex-col">
    <label className="text-white mb-1">Study Field</label>
    <Input name="study_field" value={formData.study_field} onChange={handleChange} className="border border-white px-3 py-2 rounded" />
  </div>

  <div className="flex flex-col">
    <label className="text-white mb-1">Year of Study</label>
    <Input name="year_of_study" value={formData.year_of_study} onChange={handleChange} className="border border-white px-3 py-2 rounded" />
  </div>

  <div className="flex flex-col">
    <label className="text-white mb-1">Skills</label>
    <Input name="skills" value={formData.skills} onChange={handleChange} className="border border-white px-3 py-2 rounded" />
  </div>

  <div className="flex flex-col">
    <label className="text-white mb-1">LinkedIn</label>
    <Input name="linkedin" value={formData.linkedin} onChange={handleChange} className="border border-white px-3 py-2 rounded" />
  </div>

  <div className="flex flex-col">
    <label className="text-white mb-1">Discord ID</label>
    <Input name="discord_id" value={formData.discord_id} onChange={handleChange} className="border border-white px-3 py-2 rounded" />
  </div>

  <div className="flex flex-col col-span-2">
    <label className="text-white mb-1">Have you participated in similar competitions before?</label>
    <Input name="hypscb" value={formData.hypscb} onChange={handleChange} className="border border-white px-3 py-2 rounded" />
  </div>

  <div className="flex flex-col col-span-2">
    <label className="text-white mb-1">If so, can you please elaborate?</label>
    <Textarea name="elaborate" value={formData.elaborate} onChange={handleChange} className="border border-white px-3 py-2 rounded" />
  </div>

  <div className="flex flex-col col-span-2">
    <label className="text-white mb-1">Do you have experience with hands-on building and prototyping?</label>
    <Textarea name="experience" value={formData.experience} onChange={handleChange} className="border border-white px-3 py-2 rounded" />
  </div>

  <div className="flex flex-col col-span-2">
    <label className="text-white mb-1">What software or tools are you comfortable using? (Programming languages, CAD, Matlab, Arduino etc)</label>
    <Textarea name="software" value={formData.software} onChange={handleChange} className="border border-white px-3 py-2 rounded" />
  </div>

  {title === "Team Leader" && (
    <div className="flex flex-col col-span-2">
      <label className="text-white mb-1">Team Name</label>
      <Input name="team_name" value={formData.team_name} onChange={handleChange} className="border border-white px-3 py-2 rounded" />
    </div>
  )}
</div>


      <Button type="submit" className="w-full">
        {isLastForm ? "Submit All" : "Next"}
      </Button>
    </form>
  );
};

export default PersonalInfoForm;
