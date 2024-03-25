import { createContext } from "react";
import { useActiveId } from "../lib/hooks";

type JobItemsContext = {
  activeId: number | null | undefined;
};

export const JobItemsContext = createContext<JobItemsContext | null>(null);

// activeId context provider
export default function JobItemsContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const activeId = useActiveId();

  return (
    <JobItemsContext.Provider
      value={{
        activeId,
      }}
    >
      {children}
    </JobItemsContext.Provider>
  );
}
