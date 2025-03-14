import { createContext, ReactNode, useContext, useState } from "react";

type PostContextType = {
  selectedId: number | null;
  setSelectedId: (id: number | null) => void;
};

const PostContext = createContext<PostContextType | null>(null);

export default function PostProvider({ children }: { children: ReactNode }) {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  return (
    <PostContext.Provider value={{ selectedId, setSelectedId }}>
      {children}
    </PostContext.Provider>
  );
}

export function usePost() {
  const context = useContext(PostContext);
  if (!context) {
    throw new Error("usePost must be used within a PostProvider");
  }
  return context;
}
