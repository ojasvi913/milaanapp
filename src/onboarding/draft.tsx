import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

export type Draft = {
  email: string;
  password: string;
  ownership: string | null;
  fullName: string;
  dob: string;
  gender: string | null;
  phone: string;
  otp: string;
  phoneCodeSent: boolean;
  contactEmail: string;
  emailVerified: boolean;
  religion: string | null;
  motherTongue: string | null;
  languages: string | null;
  caste: string | null;
  subCaste: string | null;
  communityPreference: string | null;
  skipCommunity: boolean;
  city: string;
  state: string;
  country: string;
  hometown: string;
  residency: string | null;
  education: string;
  fieldOfStudy: string;
  occupation: string;
  employment: string | null;
  income: string | null;
  height: string;
  maritalStatus: string | null;
  children: string | null;
  familyType: string | null;
  familyValues: string | null;
  familyBackground: string;
  bio: string;
  interests: string[];
  diet: string | null;
  smoking: string | null;
  drinking: string | null;
  profilePhoto: string | null;
  extraPhotos: string[];
  photoVisibility: string | null;
  ageMin: string;
  ageMax: string;
  preferredLocation: string;
  preferredEducation: string;
  preferredOccupation: string | null;
  preferredCommunity: string | null;
  marriageTimeline: string | null;
  preferencesSaved: boolean;
};

const initialDraft: Draft = {
  email: "",
  password: "",
  ownership: null,
  fullName: "",
  dob: "",
  gender: null,
  phone: "",
  otp: "",
  phoneCodeSent: false,
  contactEmail: "",
  emailVerified: false,
  religion: null,
  motherTongue: null,
  languages: null,
  caste: null,
  subCaste: null,
  communityPreference: null,
  skipCommunity: false,
  city: "",
  state: "",
  country: "",
  hometown: "",
  residency: null,
  education: "",
  fieldOfStudy: "",
  occupation: "",
  employment: null,
  income: null,
  height: "",
  maritalStatus: null,
  children: null,
  familyType: null,
  familyValues: null,
  familyBackground: "",
  bio: "",
  interests: [],
  diet: null,
  smoking: null,
  drinking: null,
  profilePhoto: null,
  extraPhotos: [],
  photoVisibility: null,
  ageMin: "",
  ageMax: "",
  preferredLocation: "",
  preferredEducation: "",
  preferredOccupation: null,
  preferredCommunity: null,
  marriageTimeline: null,
  preferencesSaved: false,
};

type DraftContextValue = {
  draft: Draft;
  update: (patch: Partial<Draft>) => void;
  toggleList: (key: "interests", value: string) => void;
};

const DraftContext = createContext<DraftContextValue | null>(null);

export function DraftProvider({ children }: { children: ReactNode }) {
  const [draft, setDraft] = useState<Draft>(initialDraft);

  const value = useMemo<DraftContextValue>(
    () => ({
      draft,
      update: (patch) => setDraft((current) => ({ ...current, ...patch })),
      toggleList: (key, item) =>
        setDraft((current) => {
          const list = current[key];
          const next = list.includes(item) ? list.filter((entry) => entry !== item) : [...list, item];
          return { ...current, [key]: next };
        }),
    }),
    [draft],
  );

  return <DraftContext.Provider value={value}>{children}</DraftContext.Provider>;
}

export function useDraft() {
  const value = useContext(DraftContext);
  if (!value) {
    throw new Error("useDraft must be used within DraftProvider");
  }
  return value;
}

export function asksForChildren(maritalStatus: string | null) {
  return maritalStatus !== null && maritalStatus !== "Never married";
}
