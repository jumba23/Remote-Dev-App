import { useEffect, useState } from "react";

export const useJobItems = (searchText: string) => {
  const [jobItems, setJobItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  console.log("jobItems", jobItems);

  useEffect(() => {
    if (!searchText) return;

    // Fetch data from the API
    const fetchData = async () => {
      setIsLoading(true);
      const response = await fetch(
        `https://bytegrad.com/course-assets/projects/rmtdev/api/data?search=${searchText}`
      );
      const data = await response.json();
      setIsLoading(false);
      setJobItems(data.jobItems);
    };

    fetchData();
  }, [searchText]);

  return { jobItems, isLoading };
};
