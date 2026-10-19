import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

import { openingMessages } from "@/main/data";

export type Mark = "interest" | "shortlist" | "ignore";
export type Flags = { interest?: boolean; shortlist?: boolean; ignore?: boolean };

type ChatLine = { mine: boolean; text: string };

type MainState = {
  marks: Record<string, Flags>;
  setMark: (id: string, mark: Mark) => void;
  keep: (id: string, mark: Mark) => void;
  messages: Record<string, ChatLine[]>;
  send: (id: string, text: string) => void;
};

const MainContext = createContext<MainState | null>(null);

export function MainProvider({ children }: { children: ReactNode }) {
  const [marks, setMarks] = useState<Record<string, Flags>>({
    meera: { interest: true },
    arjun: { shortlist: true },
  });
  const [messages, setMessages] = useState<Record<string, ChatLine[]>>(openingMessages);

  const value = useMemo<MainState>(
    () => ({
      marks,
      setMark: (id, mark) =>
        setMarks((current) => {
          const prev = current[id] ?? {};
          if (mark === "ignore") return { ...current, [id]: { ...prev, ignore: !prev.ignore } };
          return { ...current, [id]: { ...prev, [mark]: !prev[mark], ignore: false } };
        }),
      keep: (id, mark) =>
        setMarks((current) => ({
          ...current,
          [id]: { ...current[id], [mark]: true },
        })),
      messages,
      send: (id, text) =>
        setMessages((current) => ({
          ...current,
          [id]: [...(current[id] ?? []), { mine: true, text }],
        })),
    }),
    [marks, messages],
  );

  return <MainContext.Provider value={value}>{children}</MainContext.Provider>;
}

export function useMain() {
  const value = useContext(MainContext);
  if (!value) throw new Error("useMain must be used within MainProvider");
  return value;
}
