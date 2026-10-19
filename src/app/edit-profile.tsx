import { useState } from "react";

import { AppScreen, Banner } from "@/components/app-screen";
import { PrimaryButton } from "@/components/buttons";
import { Field } from "@/components/field";
import { me } from "@/main/data";

export default function EditProfileScreen() {
  const [name, setName] = useState(me.name);
  const [city, setCity] = useState(me.city);
  const [about, setAbout] = useState(me.about);
  const [education, setEducation] = useState(me.education);
  const [work, setWork] = useState(me.work);
  const [family, setFamily] = useState(me.family);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  return (
    <AppScreen back title="Edit profile">
      {saved ? <Banner tone="ok">Saved for this visit. It is not stored yet.</Banner> : null}
      {error ? <Banner tone="error">{error}</Banner> : null}
      <Field label="Name" onChangeText={setName} value={name} />
      <Field label="City" onChangeText={setCity} value={city} />
      <Field label="About me" multiline onChangeText={setAbout} value={about} />
      <Field label="Education" onChangeText={setEducation} value={education} />
      <Field label="Work" onChangeText={setWork} value={work} />
      <Field label="Family" multiline onChangeText={setFamily} value={family} />
      <PrimaryButton
        label="Save profile"
        onPress={() => {
          if (name.trim().length < 2) {
            setSaved(false);
            setError("Enter a name before saving.");
            return;
          }
          setError(null);
          setSaved(true);
        }}
      />
    </AppScreen>
  );
}
