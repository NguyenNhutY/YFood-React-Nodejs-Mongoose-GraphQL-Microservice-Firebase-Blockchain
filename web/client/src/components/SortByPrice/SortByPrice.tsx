import React  from "preact/hooks";
import "./sortByPrice.scss";
import { FunctionalComponent } from "preact";

interface SortByPriceProps {
  sortOrder: "asc" | "desc" | "none";
  onSortChange: (order: "asc" | "desc" | "none") => void;
}

const SortByPrice: FunctionalComponent<SortByPriceProps> = ({
  sortOrder,
  onSortChange,
}) => {
  return (
    <div class='sort-by-price'>
      <span>Sort by price:</span>
      <button
        class={`sort-button ${sortOrder === "asc" ? "active" : ""}`}
        onClick={() => onSortChange("asc")}
        aria-pressed={sortOrder === "asc"}
      >
        Ascending
      </button>
      <button
        class={`sort-button ${sortOrder === "desc" ? "active" : ""}`}
        onClick={() => onSortChange("desc")}
        aria-pressed={sortOrder === "desc"}
      >
        Descending
      </button>
      <button
        class={`sort-button ${sortOrder === "none" ? "active" : ""}`}
        onClick={() => onSortChange("none")}
        aria-pressed={sortOrder === "none"}
      >
        Clear
      </button>
    </div>
  );
};

export default SortByPrice;
