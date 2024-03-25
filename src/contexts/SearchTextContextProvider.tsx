import { createContext } from "react";
import { useActiveId } from "../lib/hooks";

type SearchTextContext = {
  activeId: number | null | undefined;
};

export const SearchTextContext = createContext<SearchTextContext | null>(null);

// activeId context provider
export default function SearchTextContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const activeId = useActiveId();

  return (
    <SearchTextContext.Provider
      value={{
        activeId,
      }}
    >
      {children}
    </SearchTextContext.Provider>
  );
}
