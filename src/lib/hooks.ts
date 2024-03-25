import { useContext, useEffect, useState } from "react";
import { JobItem, JobItemExpanded } from "./types";
import { BASE_API_URL } from "./constants";
import { useQueries, useQuery } from "@tanstack/react-query";
import { handleError } from "./utils";
import { BookmarksContext } from "../contexts/BookmarksContextProvider";

type jobItemApiResponse = {
  public: boolean;
  jobItem: JobItemExpanded;
};

const fetchJobItem = async (id: number): Promise<jobItemApiResponse> => {
  const response = await fetch(`${BASE_API_URL}/${id}`);

  // 4xx or 5xx response
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.description || "Failed to fetch job item");
  }

  const data = await response.json();
  return data;
};

//====================================================================================================

export const useJobItem = (id: number | null | undefined) => {
  const { data, isInitialLoading } = useQuery(
    ["jobItem", id],
    () => (id ? fetchJobItem(id) : null),
    {
      staleTime: 1000 * 60 * 60, // 1 hour
      refetchOnWindowFocus: false,
      retry: false,
      enabled: Boolean(id),
      onError: handleError,
    }
  );

  return { jobItem: data?.jobItem, isLoading: isInitialLoading } as const;
};

export const useJobItems = (ids: number[]) => {
  const results = useQueries({
    queries: ids.map((id) => ({
      queryKey: ["job-item", id],
      queryFn: () => fetchJobItem(id),
      staleTime: 1000 * 60 * 60, // 1 hour
      refetchOnWindowFocus: false,
      enabled: Boolean(id),
      onError: handleError,
    })),
  });

  const jobItems = results
    .map((result) => result.data?.jobItem)
    // .filter((jobItem) => jobItem !== undefined);
    // .filter((jobItem) => !!jobItem );
    .filter((jobItem) => Boolean(jobItem)) as JobItemExpanded[];

  const isLoading = results.some((result) => result.isLoading);

  return { jobItems, isLoading } as const;
};

//====================================================================================================

export const useActiveId = () => {
  const [activeId, setActiveId] = useState<number | null>();

  useEffect(() => {
    const handleHashChange = () => {
      const id = +window.location.hash.slice(1);
      setActiveId(id);
    };

    handleHashChange();

    window.addEventListener("hashchange", handleHashChange);

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  return activeId;
};

//====================================================================================================

// export const useJobItems = (searchText: string) => {
//   const [jobItems, setJobItems] = useState<JobItem[]>([]);
//   const [isLoading, setIsLoading] = useState(false);

//   console.log("jobItems", jobItems);

//   useEffect(() => {
//     if (!searchText) return;

//     // Fetch data from the API
//     const fetchData = async () => {
//       setIsLoading(true);
//       const response = await fetch(
//         `https://bytegrad.com/course-assets/projects/rmtdev/api/data?search=${searchText}`
//       );
//       const data = await response.json();
//       setIsLoading(false);
//       setJobItems(data.jobItems);
//     };

//     fetchData();
//   }, [searchText]);

//   return { jobItems, isLoading } as const;
// };

type JobItemsApiResponse = {
  public: boolean;
  sorted: boolean;
  jobItems: JobItem[];
};

const fetchJobItems = async (
  searchText: string
): Promise<JobItemsApiResponse> => {
  const response = await fetch(`${BASE_API_URL}?search=${searchText}`);

  // 4xx or 5xx response
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.description || "Failed to fetch job item");
  }

  const data = await response.json();
  return data;
};

export const useSearchQuery = (searchText: string) => {
  const { data, isInitialLoading } = useQuery(
    ["job-items", searchText],
    () => fetchJobItems(searchText),
    {
      staleTime: 1000 * 60 * 60, // 1 hour
      refetchOnWindowFocus: false,
      retry: false,
      enabled: Boolean(searchText),
      onError: handleError,
    }
  );

  return {
    jobItems: data?.jobItems,
    isLoading: isInitialLoading,
  } as const;
};

//====================================================================================================
// <T> is a generic type that can be any type. It's a placeholder for the type of the value that will be passed to the hook.
// value is the value that will be debounced/returned.
export const useDebounce = <T>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

//====================================================================================================

export const useLocalStorage = <T>(
  key: string,
  initialValue: T
): [T, React.Dispatch<React.SetStateAction<T>>] => {
  const [value, setValue] = useState(() => {
    return JSON.parse(
      localStorage.getItem(key) || JSON.stringify(initialValue)
    );
  });

  // Load bookmarkedIds from localStorage
  useEffect(() => {
    // set initial bookmarkedIds from localStorage
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);

  return [value, setValue] as const;
};

export const useOnClickOutside = (refs, handler) => {
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (
        e.target instanceof HTMLElement &&
        refs.every((ref) => !ref.current.contains(e.target))
      ) {
        // setIsOpen(false);
        handler();
      }
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [refs, handler]);
};

//====================================================================================================

export const useBookmarksContext = () => {
  const context = useContext(BookmarksContext);
  if (!context)
    throw new Error("useBookmarks must be used within a BookmarksProvider");

  return context;
};
