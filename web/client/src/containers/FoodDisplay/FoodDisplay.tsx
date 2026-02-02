import React, { useContext, useState, useEffect }  from "preact/hooks";
import "./foodDisplay.scss";
import { StoreContext } from "../../context/StoreContext";
import FoodItem from "../../components/FoodItem/FoodItem";
import AnimateBox from "../../helpers/Animation/AnimateBox/AnimateBox";
import { fromJS, List } from "immutable";
import Pagination from "../../components/Pagination/Pagination";
import SortByPrice from "../../components/SortByPrice/SortByPrice";
import { FunctionalComponent } from "preact";

// Define type for FoodItem
interface FoodItemType {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  detail: string;
  metail_1: string;
  metail_2: string;
  metail_3: string;
}

// Define type for props of FoodDisplay
interface FoodDisplayProps {
  category: string;
  searchName: string;
  excludeId?: string; // Add this property to receive the product ID to exclude
}

// Define type for StoreContext
interface StoreContextType {
  food_list: FoodItemType[];
}

const FoodDisplay: FunctionalComponent<FoodDisplayProps> = ({
  category,
  searchName,
  excludeId,
}) => {
  const { food_list } = useContext(StoreContext) as StoreContextType;

  // State for sorting order
  const [sortOrder, setSortOrder] = useState<"asc" | "desc" | "none">("none");
  const [sortedFoodList, setSortedFoodList] = useState<List<any>>(
    fromJS(food_list)
  );

  // Convert food_list to Immutable List
  const immutableFoodList = fromJS(food_list);

  // State for pagination
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 8; // Number of items per page

  // Calculate index of the last and first item of the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  // Filter and search items
  const filteredFoodList = sortedFoodList.filter((item) => {
    const categoryMatch =
      category === "All" || category === item.get("category");
    const searchNameMatch = item
      .get("name")
      .toLowerCase()
      .includes(searchName.toLowerCase());
    const excludeMatch = excludeId ? item.get("_id") !== excludeId : true; // Exclude product with excludeId
    return categoryMatch && searchNameMatch && excludeMatch;
  });

  // Get items for the current page
  const currentItems = filteredFoodList
    .slice(indexOfFirstItem, indexOfLastItem)
    .toArray();

  // Calculate total number of pages
  const totalPages = Math.ceil(filteredFoodList.size / itemsPerPage);

  // Handle page change
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // Handle sorting
  const handleSortChange = (order: "asc" | "desc" | "none") => {
    setSortOrder(order);
    if (order === "none") {
      setSortedFoodList(immutableFoodList);
    } else {
      const sorted = immutableFoodList.sort((a, b) =>
        order === "asc"
          ? a.get("price") - b.get("price")
          : b.get("price") - a.get("price")
      );
      setSortedFoodList(sorted);
    }
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [searchName, excludeId]);

  return (
    <div class='food-display' id='food-display'>
      <div class='food-display-top'>
        <h2>Top dishes near you</h2>
        <SortByPrice onSortChange={handleSortChange} />
      </div>
      <div class='food-display-list'>
        {currentItems.map((item) => (
          <AnimateBox key={item.get("_id")}>
            <FoodItem
              id={item.get("_id")}
              name={item.get("name")}
              description={item.get("description")}
              price={item.get("price")}
              image={item.get("image")}
              detail={item.get("detail")}
              metail_1={item.get("metail_1")}
              metail_2={item.get("metail_2")}
              metail_3={item.get("metail_3")}
            />
          </AnimateBox>
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        paginate={paginate}
      />
    </div>
  );
};

export default FoodDisplay;
