export type Gender = "f" | "m";

export type Person = {
  id: string;
  name: string;
  age: number;
  gender: Gender;
  city: string;
  height: string;
  community: string;
  education: string;
  occupation: string;
  income: string;
  religion: string;
  tongue: string;
  marital: string;
  managedBy: string;
  status: string;
  about: string;
  family: string;
  lifestyle: string;
  lookingFor: string;
  photoUrl?: string;
};

export const me = {
  name: "Ojasvu Tomar",
  profileId: "SAUW1019",
  age: 28,
  gender: "m" as const,
  city: "Delhi",
  height: "5'10\"",
  managedBy: "Self",
  about: "Evenings are for family, and Sundays for a long walk. Looking for a kind, steady, and genuine partnership.",
  education: "B.Tech, Computer Science",
  work: "Software Engineer",
  family: "Nuclear family based in Delhi. Parents and one younger sister.",
  preferences: "24–30 · Delhi / NCR · Open beyond community",
};

export const people: Person[] = [
  {
    id: "lovely",
    name: "Lovely Singh",
    age: 26,
    gender: "f",
    city: "Delhi",
    height: "5'4\"",
    community: "Sikh",
    education: "MBA",
    occupation: "HR Manager",
    income: "₹10–12 Lakh",
    religion: "Sikh",
    tongue: "Punjabi",
    marital: "Never married",
    managedBy: "Self",
    status: "Active today",
    about: "Warm, grounded, and focused on family values and career.",
    family: "Parents in Delhi. Younger sister.",
    lifestyle: "Vegetarian. Travel and photography.",
    lookingFor: "26–31 in Delhi NCR.",
  },
  {
    id: "yashika",
    name: "Yashika Chauhan",
    age: 27,
    gender: "f",
    city: "Delhi",
    height: "5'5\"",
    community: "Rajput",
    education: "B.Tech",
    occupation: "Product Designer",
    income: "₹15–18 Lakh",
    religion: "Hindu",
    tongue: "Hindi",
    marital: "Never married",
    managedBy: "Self",
    status: "Active today",
    about: "Design enthusiast, coffee lover, and family-oriented.",
    family: "Family in South Delhi.",
    lifestyle: "Eggetarian, yoga on weekends.",
    lookingFor: "27–32 well settled.",
  },
  {
    id: "savr",
    name: "SAVR7361",
    age: 25,
    gender: "f",
    city: "Noida",
    height: "5'3\"",
    community: "Brahmin",
    education: "M.Com",
    occupation: "Financial Analyst",
    income: "₹12–14 Lakh",
    religion: "Hindu",
    tongue: "Hindi",
    marital: "Never married",
    managedBy: "Self",
    status: "Active today",
    about: "Quiet, ambitious, and looking for an understanding life partner.",
    family: "Parents in Noida.",
    lifestyle: "Vegetarian. Family time and books.",
    lookingFor: "Educated, respectful partner.",
  },
  {
    id: "seema",
    name: "Seema Rana",
    age: 28,
    gender: "f",
    city: "Gurgaon",
    height: "5'6\"",
    community: "Rajput",
    education: "M.Sc Biotech",
    occupation: "Researcher",
    income: "₹14–16 Lakh",
    religion: "Hindu",
    tongue: "Hindi",
    marital: "Never married",
    managedBy: "Self",
    status: "Active today",
    about: "Passionate about science, nature, and simple joys in life.",
    family: "Parents in Gurgaon. One brother.",
    lifestyle: "Non-vegetarian, fitness and music.",
    lookingFor: "Kind-hearted and forward-thinking.",
  },
  {
    id: "meera",
    name: "Meera Iyer",
    age: 29,
    gender: "f",
    city: "Chennai",
    height: "5'4\"",
    community: "Iyer",
    education: "M.A. Literature",
    occupation: "Editor",
    income: "₹12–15 Lakh",
    religion: "Hindu",
    tongue: "Tamil",
    marital: "Never married",
    managedBy: "Self",
    status: "Active today",
    about: "I edit essays and spend Sundays with my parents. I want a marriage that leaves room for both families and a quiet life of our own.",
    family: "Parents live in Mylapore. One elder sister, married. We meet every Sunday.",
    lifestyle: "Vegetarian. Does not smoke. Carnatic music and long walks on the beach.",
    lookingFor: "28–35. Open beyond community. Based in Tamil Nadu, or willing to settle there.",
  },
  {
    id: "arjun",
    name: "Arjun Malhotra",
    age: 32,
    gender: "m",
    city: "Pune",
    height: "5'11\"",
    community: "Khatri",
    education: "MBA",
    occupation: "Product lead",
    income: "₹25–30 Lakh",
    religion: "Hindu",
    tongue: "Hindi",
    marital: "Never married",
    managedBy: "Family",
    status: "Active this week",
    about: "I like unhurried dinners and a home that stays close to both sets of parents.",
    family: "Parents in Chandigarh. A younger sister in school. Joint family on festival weekends.",
    lifestyle: "Eats everything. Runs in the morning. No smoking.",
    lookingFor: "26–32. Education matters more than a particular community.",
  },
  {
    id: "ananya",
    name: "Ananya Reddy",
    age: 27,
    gender: "f",
    city: "Hyderabad",
    height: "5'5\"",
    community: "Reddy",
    education: "M.Sc",
    occupation: "Research professional",
    income: "₹8–12 Lakh",
    religion: "Hindu",
    tongue: "Telugu",
    marital: "Never married",
    managedBy: "Self",
    status: "Active today",
    about: "Lab weeks are long. I protect weekends for family and a film.",
    family: "Parents in Jubilee Hills. I live nearby and have dinner with them most nights.",
    lifestyle: "Vegetarian at home. Does not drink.",
    lookingFor: "Someone settled in Hyderabad, or happy to be.",
  },
  {
    id: "kabir",
    name: "Kabir Sethi",
    age: 30,
    gender: "m",
    city: "Jaipur",
    height: "5'9\"",
    community: "Baniya",
    education: "B.Arch",
    occupation: "Architect",
    income: "₹15–20 Lakh",
    religion: "Hindu",
    tongue: "Hindi",
    marital: "Never married",
    managedBy: "Family",
    status: "Joined recently",
    about: "I design houses and would like a marriage that feels as considered as a well-made room.",
    family: "Parents and grandparents in a family home in C-Scheme.",
    lifestyle: "Vegetarian. Evenings are for site visits or a quiet meal.",
    lookingFor: "27–31. Family should be comfortable meeting early.",
  },
  {
    id: "sara",
    name: "Sara Qureshi",
    age: 28,
    gender: "f",
    city: "Lucknow",
    height: "5'6\"",
    community: "Sheikh",
    education: "LL.B",
    occupation: "Counsel",
    income: "₹10–15 Lakh",
    religion: "Muslim",
    tongue: "Urdu",
    marital: "Never married",
    managedBy: "Self",
    status: "Active today",
    about: "Court mornings, family lunch, and a book if the day allows it.",
    family: "Parents in Hazratganj. Two brothers, both married.",
    lifestyle: "Does not smoke or drink. Fridays are kept for family.",
    lookingFor: "A practising Muslim who wants both families involved from the start.",
  },
];

export const received = [
  { id: "ananya", line: "Sent you an interest", when: "2h" },
  { id: "kabir", line: "Sent you an interest", when: "Yesterday" },
];

export const visits = [
  { id: "kabir", line: "Visited your profile", when: "Today" },
  { id: "sara", line: "Visited your profile", when: "Monday" },
];

export const threads = [
  { id: "ananya", preview: "Thursday evening works well.", when: "2:14 pm", unread: true },
  { id: "arjun", preview: "Thank you for writing. I read your note.", when: "Yesterday", unread: false },
  { id: "sara", preview: "Shall we ask our families to speak?", when: "Mon", unread: true },
];

export const openingMessages: Record<string, { mine: boolean; text: string }[]> = {
  ananya: [
    { mine: false, text: "Hello. I read your note about the publishing house." },
    { mine: true, text: "Thank you. Thursday evening works well for a call with family." },
    { mine: false, text: "I will ask my parents and confirm by tomorrow." },
  ],
  arjun: [{ mine: false, text: "Thank you for writing. I read your note." }],
  sara: [{ mine: false, text: "Shall we ask our families to speak?" }],
};

export const notices = [
  { id: "1", title: "New interest", body: "Ananya Reddy sent you an interest.", when: "2h" },
  { id: "2", title: "Profile visit", body: "Kabir Sethi viewed your profile.", when: "Yesterday" },
  { id: "3", title: "Message", body: "Sara Qureshi wrote in your conversation.", when: "Mon" },
];

export function personById(id: string) {
  return people.find((person) => person.id === id) ?? null;
}
