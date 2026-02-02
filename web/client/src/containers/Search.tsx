import React, { useState, useCallback, useContext }  from "preact/hooks";
import Search from "../components/Search/Search";
import { StoreContext } from "../context/StoreContext";
import { FunctionalComponent } from "preact";

const SearchContainer: FunctionalComponent = () => {
  const [searchName, setSearchName] = useState<string>("");
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const { food_list } = useContext(StoreContext) || { food_list: [] }; // Sử dụng useContext để lấy food_list

  const handleSearchChange = useCallback((name: string) => {
    setSearchName(name);
  }, []);

  const handleSuggestionClick = useCallback((name: string) => {
    setSearchName(name);
    setSelectedItems((prevItems) => [name, ...prevItems].slice(0, 10));
  }, []);

  return (
    <Search
      setSearchName={handleSearchChange}
      onSuggestionClick={handleSuggestionClick}
      selectedItems={selectedItems}
      foodList={food_list}
    />
  );
};

export default SearchContainer;
