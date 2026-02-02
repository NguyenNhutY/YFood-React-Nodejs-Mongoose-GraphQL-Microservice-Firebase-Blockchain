import React, { useContext, useState, useEffect, useMemo }  from "preact/hooks";
import { StoreContext } from "../../context/StoreContext";
import FoodDisplay from "./FoodDisplay";
import { List, fromJS } from "immutable";
import { SortingStrategy } from "./SortingStrategy";
import { filterFoodItems } from "./FilteringStrategy";
import { FoodItemType } from "./FoodDisplay";
import { FunctionalComponent } from "preact";

interface FoodDisplayContainerProps {
  category: string;
  searchName: string;
}

const FoodDisplayContainer: FunctionalComponent<FoodDisplayContainerProps> = ({
  category,
  searchName,
}) => {
  const { food_list } = useContext(StoreContext) as {
    food_list: FoodItemType[];
  };

  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 8;

  const immutableFoodList = useMemo(() => fromJS(food_list), [food_list]);

  const sortedFoodList = useMemo(
    () => SortingStrategy(immutableFoodList, sortOrder),
    [immutableFoodList, sortOrder]
  );

  const filteredFoodList = useMemo(
    () => filterFoodItems(sortedFoodList, category, searchName),
    [sortedFoodList, category, searchName]
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredFoodList
    .slice(indexOfFirstItem, indexOfLastItem)
    .toArray();
  const totalPages = Math.ceil(filteredFoodList.size / itemsPerPage);

  useEffect(() => {
    setCurrentPage(1); // Reset page to 1 when searchName or category changes
  }, [searchName, category]);

  const handleSortChange = (order: "asc" | "desc") => {
    setSortOrder(order);
  };

  return (
    <FoodDisplay
      items={currentItems}
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={setCurrentPage}
      onSortChange={handleSortChange}
    />
  );
};

export default FoodDisplayContainer;
