import { BookmarkFilledIcon } from "@radix-ui/react-icons";
import { useContext } from "react";
import { BookmarksContext } from "../contexts/BookmarksContextProvider";

export default function BookmarkIcon() {
  const context = useContext(BookmarksContext);

  console.log("Context: ", context);

  return (
    <button className="bookmark-btn">
      <BookmarkFilledIcon className="" />
    </button>
  );
}
