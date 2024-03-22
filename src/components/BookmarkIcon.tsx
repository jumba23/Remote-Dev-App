import { BookmarkFilledIcon } from "@radix-ui/react-icons";
import { useContext } from "react";
import { BookmarksContext } from "../contexts/BookmarksContextProvider";

type BookmarkIconProps = {
  id: number;
};

export default function BookmarkIcon({ id }: BookmarkIconProps) {
  const context = useContext(BookmarksContext);
  if (!context)
    throw new Error("useBookmarks must be used within a BookmarksProvider");

  const { bookmarkedIds, toggleHandleBookmark } = context;

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();

        toggleHandleBookmark(id);
      }}
      className="bookmark-btn"
    >
      <BookmarkFilledIcon
        className={`${bookmarkedIds.includes(id) ? "filled" : ""}`}
      />
    </button>
  );
}
