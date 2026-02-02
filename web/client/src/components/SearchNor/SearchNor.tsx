import React, {
  useState,
  useRef,
  useContext,
  useCallback,
  useMemo,
  useEffect,
}  from "preact/hooks";
import debounce from "lodash.debounce";
import { StoreContext } from "../../context/StoreContext";
import SecurityInput from "../SecurityInput/SecurityInput";
import "./searchNor.scss";
import { FunctionalComponent } from "preact";

// Define types for the props
interface SearchProps {
  setSearchName: (name: string) => void;
  placeholder?: string;
  onClose?: () => void;
  enableSuggestions?: boolean; // Add this prop to control suggestions
  enablePlaceholderChange?: boolean; // Add this prop to control placeholder change
}

interface FoodItem {
  id: number;
  name: string;
}

const Search: FunctionalComponent<SearchProps> = ({
  setSearchName,
  placeholder = "Search...",
  onClose,
  enableSuggestions = false,
  enablePlaceholderChange = false,
}) => {
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
  const [selectedItems, setSelectedItems] = useState<string[]>([]); // Lưu trữ các mục đã chọn
  const [placeholderText, setPlaceholderText] = useState<string>(placeholder);
  const { food_list } = useContext(StoreContext);

  const inputRef = useRef<HTMLInputElement | null>(null);
  const placeholderIndex = useRef<number>(0);

  const handleSearch = useCallback((value: string) => {
    console.log("Search for:", value);
  }, []);

  const handleSuggestionClick = useCallback(
    (name: string) => {
      if (inputRef.current) {
        inputRef.current.value = name;
      }
      setSearchName(name);
      setShowSuggestions(false);
      setSelectedItems((prevItems) => [name, ...prevItems].slice(0, 10)); // Lưu vào danh sách các mục đã chọn
      handleSearch(name); // Tìm kiếm khi người dùng chọn gợi ý
    },
    [setSearchName, handleSearch]
  );

  const handleSearchChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const value = event.target.value;
    setSearchName(value);
    setShowSuggestions(enableSuggestions && value.length > 0);
    debouncedSearch(value);
  };

  const debouncedSearch = useMemo(() => debounce(handleSearch, 500), [
    handleSearch,
  ]);

  useEffect(() => {
    if (enablePlaceholderChange) {
      const updatePlaceholder = () => {
        if (selectedItems.length > 0) {
          setPlaceholderText(
            selectedItems[placeholderIndex.current] || placeholder
          );
          placeholderIndex.current =
            (placeholderIndex.current + 1) % selectedItems.length;
        }
      };

      const intervalId = setInterval(updatePlaceholder, 3000); // Cập nhật mỗi 3 giây
      return () => clearInterval(intervalId); // Dọn dẹp interval khi component unmount
    }
  }, [selectedItems, enablePlaceholderChange, placeholder]);

  // Lọc các gợi ý từ danh sách món ăn
  const suggestions = food_list
    ?.filter((item: FoodItem) =>
      item.name
        .toLowerCase()
        .includes(inputRef.current?.value.toLowerCase() || "")
    )
    .slice(0, 5);

  return (
    <div class='search-component'>
      <SecurityInput
        type='text'
        placeholder={placeholderText}
        onChange={handleSearchChange}
        class='search-input'
        onFocus={() => {
          if (enableSuggestions) {
            setShowSuggestions(
              inputRef.current?.value.length > 0 || selectedItems.length > 0
            );
          }
        }}
        onBlur={() => setTimeout(() => setShowSuggestions(false), 200)} // Delay hiding suggestions
        ref={inputRef}
      />
      {enableSuggestions && showSuggestions && (
        <div class='suggestions-list'>
          {inputRef.current?.value.length === 0 && selectedItems.length > 0 ? (
            selectedItems.map((item, index) => (
              <div key={index} class='suggestion-item'>
                <a
                  href='#food-display'
                  class='suggestion-item'
                  onClick={() => handleSuggestionClick(item)}
                  aria-label={`Search for ${item}`}
                >
                  {item}
                </a>
              </div>
            ))
          ) : suggestions?.length > 0 ? (
            suggestions.map((item) => (
              <div key={item.id} class='suggestion-item'>
                <a
                  href='#food-display'
                  class='suggestion-item'
                  onClick={() => handleSuggestionClick(item.name)}
                  aria-label={`Search for ${item.name}`}
                >
                  {item.name}
                </a>
              </div>
            ))
          ) : (
            <div class='suggestion-item'>No suggestions</div>
          )}
        </div>
      )}
    </div>
  );
};

export default Search;
