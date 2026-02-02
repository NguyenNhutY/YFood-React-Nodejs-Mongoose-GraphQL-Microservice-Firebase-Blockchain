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
import "./search.scss";
import { FunctionalComponent } from "preact";

// Define types for the props
interface SearchProps {
  setSearchName: (name: string) => void;
  onClose?: () => void;
}

interface FoodItem {
  id: number;
  name: string;
}

const Search: FunctionalComponent<SearchProps> = ({ setSearchName, onClose }) => {
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
  const [selectedItems, setSelectedItems] = useState<string[]>([]); // Lưu trữ các mục đã chọn
  const [placeholderText, setPlaceholderText] = useState<string>("Search...");
  const { food_list } = useContext(StoreContext);

  const inputRef = useRef<string>("");
  const placeholderIndex = useRef<number>(0);
  const suggestionsRef = useRef<HTMLDivElement | null>(null); // Tham chiếu đến phần tử danh sách gợi ý

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (event.key === "Enter") {
      setShowSuggestions(false);
    }
  };

  const handleSearch = useCallback((value: string) => {
    console.log("Search for:", value);
  }, []);

  const handleOverlayClick = (e: MouseEvent) => {
    if (
      suggestionsRef.current &&
      !suggestionsRef.current.contains(e.target as Node)
    ) {
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = useCallback(
    (name: string) => {
      inputRef.current = name;
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
    inputRef.current = value;
    setSearchName(value);
    setShowSuggestions(value.length > 0);
    debouncedSearch(value);
  };

  const debouncedSearch = useMemo(() => debounce(handleSearch, 500), [
    handleSearch,
  ]);

  useEffect(() => {
    // Cập nhật placeholder text với các mục đã chọn
    const updatePlaceholder = () => {
      if (selectedItems.length > 0) {
        setPlaceholderText(
          selectedItems[placeholderIndex.current] || "Search..."
        );
        placeholderIndex.current =
          (placeholderIndex.current + 1) % selectedItems.length;
      }
    };

    const intervalId = setInterval(updatePlaceholder, 3000); // Cập nhật mỗi 3 giây
    return () => clearInterval(intervalId); // Dọn dẹp interval khi component unmount
  }, [selectedItems]);

  // Lọc các gợi ý từ danh sách món ăn
  const suggestions = food_list
    .filter((item: FoodItem) =>
      item.name.toLowerCase().includes(inputRef.current.toLowerCase())
    )
    .slice(0, 5);

  useEffect(() => {
    document.addEventListener("mousedown", handleOverlayClick);
    return () => {
      document.removeEventListener("mousedown", handleOverlayClick);
    };
  }, []);

  return (
    <div class='navbar-search'>
      <SecurityInput
        type='text'
        class='navbar-search-input'
        placeholder={placeholderText}
        value={inputRef.current}
        onChange={handleSearchChange}
        onFocus={() => {
          setShowSuggestions(
            inputRef.current.length > 0 || selectedItems.length > 0
          );
        }}
        onBlur={() => setTimeout(() => setShowSuggestions(false), 200)} // Delay hiding suggestions
        onKeyDown={handleKeyDown} // Thêm sự kiện xử lý phím
      />
      {showSuggestions && (
        <div
          class='suggestions-list'
          ref={suggestionsRef} // Tham chiếu đến phần tử danh sách gợi ý
        >
  {inputRef.current.length === 0 && selectedItems.length > 0 ? (
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
) : suggestions.length > 0 ? (
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
