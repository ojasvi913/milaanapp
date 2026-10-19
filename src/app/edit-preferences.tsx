import { useState } from "react";

import { AppScreen, Banner } from "@/components/app-screen";
import { PrimaryButton } from "@/components/buttons";
import { Field } from "@/components/field";

export default function EditPreferencesScreen() {
  const [age, setAge] = useState("27–34");
  const [location, setLocation] = useState("Bengaluru, open to other cities");
  const [community, setCommunity] = useState("Open beyond my community");
  const [education, setEducation] = useState("Bachelor's or above");
  const [timeline, setTimeline] = useState("Within two years");
  const [saved, setSaved] = useState(false);

  return (
    <AppScreen back title="Partner preferences">
      {saved ? <Banner tone="ok">Preferences saved for this visit.</Banner> : null}
      <Field label="Age range" onChangeText={setAge} value={age} />
      <Field label="Location" onChangeText={setLocation} value={location} />
      <Field label="Community" onChangeText={setCommunity} value={community} />
      <Field label="Education" onChangeText={setEducation} value={education} />
      <Field label="Timeline" onChangeText={setTimeline} value={timeline} />
      <PrimaryButton
        label="Save preferences"
        onPress={() => {
          setSaved(true);
        }}
      />
    </AppScreen>
  );
}
