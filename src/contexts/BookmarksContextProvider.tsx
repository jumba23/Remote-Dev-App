import { useState } from "react";

const BookmarksContextProvider = ({ children }) => {
  const [bookmarkedIds, setBookmarkedIds] = useState<number[]>([]);

  const toggleHandleBookmark = (id: number) => {
    if (bookmarkedIds.includes(id)) {
      setBookmarkedIds((prev) => prev.filter((id) => id !== id));
    } else {
      setBookmarkedIds((prev) => [...prev, id]);
    }
  };

  return <div>{children}</div>;
};

export default BookmarksContextProvider;
