// ProvinceSelector.tsx
import React, { useState, useEffect }  from "preact/hooks";
import axios from "axios";
import { FunctionalComponent } from "preact";

interface Province {
  id: string;
  name: string;
  name_en: string;
  full_name: string;
  full_name_en: string;
  latitude: string;
  longitude: string;
}

interface ProvinceSelectorProps {
  onSelectProvince: (provinceName: string) => void; // Cập nhật kiểu dữ liệu
}

const ProvinceSelector: FunctionalComponent<ProvinceSelectorProps> = ({
  onSelectProvince,
}) => {
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [selectedProvince, setSelectedProvince] = useState<string>("");

  useEffect(() => {
    // Fetch the list of provinces from the API
    axios
      .get("https://esgoo.net/api-tinhthanh/1/0.htm")
      .then((response) => {
        if (response.data.error === 0) {
          setProvinces(response.data.data);
        } else {
          console.error("Failed to fetch provinces");
        }
      })
      .catch((error) => {
        console.error("Error fetching provinces:", error);
      });
  }, []);

  const handleProvinceChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const provinceName = event.target.value;
    setSelectedProvince(provinceName);
    onSelectProvince(provinceName); // Gửi tên tỉnh thành bằng tiếng Anh
  };

  return (
    <div class='province-selector'>
      <label htmlFor='province'>Chọn tỉnh thành:</label>
      <select
        id='province'
        value={selectedProvince}
        onChange={handleProvinceChange}
      >
        <option value=''>--Chọn tỉnh thành--</option>
        {provinces.map((province) => (
          <option key={province.id} value={province.name_en}>
            {province.name_en}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ProvinceSelector;
