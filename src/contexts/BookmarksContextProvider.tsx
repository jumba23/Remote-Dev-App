import { createContext, useState } from "react";

export const BookmarksContext = createContext(null);

export const BookmarksContextProvider = ({ children }) => {
  const [bookmarkedIds, setBookmarkedIds] = useState<number[]>([]);

  console.log(bookmarkedIds);

  const toggleHandleBookmark = (id: number) => {
    if (bookmarkedIds.includes(id)) {
      setBookmarkedIds((prev) => prev.filter((item) => item !== id));
    } else {
      setBookmarkedIds((prev) => [...prev, id]);
    }
  };

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
