import { createContext } from "react";
import { useLocalStorage } from "../lib/hooks";

type BookmarksContext = {
  bookmarkedIds: number[];
  toggleHandleBookmark: (id: number) => void;
};

export const BookmarksContext = createContext<BookmarksContext | null>(null);

export const BookmarksContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [bookmarkedIds, setBookmarkedIds] = useLocalStorage<number[]>(
    "bookmarkedIds",
    []
  );

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
