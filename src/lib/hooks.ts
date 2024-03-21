import { useEffect, useState } from "react";
import { JobItem, JobItemExpanded } from "./types";
import { BASE_API_URL } from "./constants";
import { useQuery } from "@tanstack/react-query";

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
      onError: (error) => {
        console.error("Error fetching job item", error);
      },
    }
  );

  return { jobItem: data?.jobItem, isLoading: isInitialLoading } as const;
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

export const useJobItems = (searchText: string) => {
  const { data, isInitialLoading } = useQuery(
    ["job-items", searchText],
    () => fetchJobItems(searchText),
    {
      staleTime: 1000 * 60 * 60, // 1 hour
      refetchOnWindowFocus: false,
      retry: false,
      enabled: Boolean(searchText),
      onError: (error) => {
        console.error("Error fetching job items", error);
      },
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
