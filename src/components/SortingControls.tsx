import { SortBy } from "../lib/types";

type SortingControlsProps = {
  sortBy: SortBy;
  onClick: (newSortBy: SortBy) => void;
};

export default function SortingControls({
  onClick,
  sortBy,
}: SortingControlsProps) {
  return (
    <section className="sorting">
      <i className="fa-solid fa-arrow-down-short-wide"></i>

      <SortingButton
        onClick={() => onClick("relevant")}
        isActive={sortBy === "recent"}
      >
        Recent
      </SortingButton>
      <SortingButton
        onClick={() => onClick("relevant")}
        isActive={sortBy === "relevant"}
      >
        Relevant
      </SortingButton>
    </section>
  );
}

type SortingButtonProps = {
  children: React.ReactNode;
  onClick: () => void;
  isActive: boolean;
};

const SortingButton = ({ children, onClick, isActive }: SortingButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`sorting__button sorting__button--recent ${
        isActive ? "sorting__button--active" : ""
      }`}
    >
      {children}
    </button>
  );
};
