import { createContext, useEffect, useState } from "react";

export const BookmarksContext = createContext(null);

export const BookmarksContextProvider = ({ children }) => {
  const bookmarkedIdsFromLocalStorage = JSON.parse(
    localStorage.getItem("bookmarkedIds") || "[]"
  );
  const [bookmarkedIds, setBookmarkedIds] = useState<number[]>(
    bookmarkedIdsFromLocalStorage
  );

  console.log(bookmarkedIds);

  const toggleHandleBookmark = (id: number) => {
    if (bookmarkedIds.includes(id)) {
      setBookmarkedIds((prev) => prev.filter((item) => item !== id));
    } else {
      setBookmarkedIds((prev) => [...prev, id]);
    }
  };

  // Load bookmarkedIds from localStorage
  useEffect(() => {
    // set initial bookmarkedIds from localStorage
    localStorage.setItem("bookmarkedIds", JSON.stringify(bookmarkedIds));
  }, [bookmarkedIds]);

  return (
    <BookmarksContext.Provider
      value={{
        bookmarkedIds,
        toggleHandleBookmark,
      }}
    >
      {children}
    </BookmarksContext.Provider>
  );
};

export default BookmarksContextProvider;
