import { BookmarkFilledIcon } from "@radix-ui/react-icons";
import { useContext } from "react";
import { BookmarksContext } from "../contexts/BookmarksContextProvider";

type BookmarkIconProps = {
  id: number;
};

export default function BookmarkIcon({ id }: BookmarkIconProps) {
  const { bookmarkedIds, toggleHandleBookmark } = useContext(BookmarksContext);

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
