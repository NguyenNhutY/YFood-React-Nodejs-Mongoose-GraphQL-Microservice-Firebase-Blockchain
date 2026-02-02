import { useState, useEffect, useMemo } from "preact/hooks";
import type { JSX, FunctionalComponent } from "preact";
import axios from "axios";
import "./locationSelector.css";

interface LocationSelectorProps {
  setFieldValue: (field: string, value: any) => void;
}

const LocationSelector: FunctionalComponent<LocationSelectorProps> = ({
  setFieldValue,
}) => {
  const [provinces, setProvinces] = useState<any[]>([]);
  const [districts, setDistricts] = useState<any[]>([]);
  const [wards, setWards] = useState<any[]>([]);
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedWard, setSelectedWard] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch provinces
  useEffect(() => {
    setLoading(true);
    axios
      .get("https://esgoo.net/api-tinhthanh/4/0.htm")
      .then((res) => {
        setProvinces(res.data.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load provinces");
        setLoading(false);
      });
  }, []);

  // Province → districts
  useEffect(() => {
    if (!selectedProvince) {
      setDistricts([]);
      setWards([]);
      return;
    }

    const province = provinces.find((p) => p.id === selectedProvince);
    if (!province) return;

    setDistricts(province.data2 || []);
    setWards([]);
    setFieldValue("state", province.full_name);
  }, [selectedProvince, provinces, setFieldValue]);

  // District → wards
  useEffect(() => {
    if (!selectedDistrict) {
      setWards([]);
      return;
    }

    const province = provinces.find((p) => p.id === selectedProvince);
    const district = province?.data2.find(
      (d: any) => d.id === selectedDistrict
    );

    if (!district) return;

    setWards(district.data3 || []);
    setFieldValue("city", district.full_name);
  }, [selectedDistrict, selectedProvince, provinces, setFieldValue]);

  // Memo address
  const address = useMemo(() => {
    const province = provinces.find((p) => p.id === selectedProvince);
    const district = province?.data2.find(
      (d: any) => d.id === selectedDistrict
    );
    const ward = district?.data3.find(
      (w: any) => w.id === selectedWard
    );

    return [
      ward?.full_name,
      district?.full_name,
      province?.full_name,
    ]
      .filter(Boolean)
      .join(", ");
  }, [selectedProvince, selectedDistrict, selectedWard, provinces]);

  useEffect(() => {
    setFieldValue("address", address);
  }, [address, setFieldValue]);

  // ✅ Preact-style event handler
  const handleLocationChange = (
    e: JSX.TargetedEvent<HTMLSelectElement, Event>,
    type: "province" | "district" | "ward"
  ) => {
    const value = e.currentTarget.value;

    if (type === "province") {
      setSelectedProvince(value);
      setSelectedDistrict("");
      setSelectedWard("");
    }

    if (type === "district") {
      setSelectedDistrict(value);
      setSelectedWard("");
    }

    if (type === "ward") {
      setSelectedWard(value);
    }
  };

  return (
    <div class="location-selector">
      {loading && <p>Loading...</p>}
      {error && <p class="error">{error}</p>}

      <label>Tỉnh/Thành phố</label>
      <select
        class="select-location"
        value={selectedProvince}
        onInput={(e) => handleLocationChange(e, "province")}
      >
        <option value="">Chọn tỉnh/thành phố</option>
        {provinces.map((p) => (
          <option key={p.id} value={p.id}>
            {p.full_name}
          </option>
        ))}
      </select>

      <label>Quận/Huyện</label>
      <select
        class="select-location"
        value={selectedDistrict}
        disabled={!selectedProvince}
        onInput={(e) => handleLocationChange(e, "district")}
      >
        <option value="">Chọn quận/huyện</option>
        {districts.map((d) => (
          <option key={d.id} value={d.id}>
            {d.full_name}
          </option>
        ))}
      </select>

      <label>Phường/Xã</label>
      <select
        class="select-location"
        value={selectedWard}
        disabled={!selectedDistrict}
        onInput={(e) => handleLocationChange(e, "ward")}
      >
        <option value="">Chọn phường/xã</option>
        {wards.map((w) => (
          <option key={w.id} value={w.id}>
            {w.full_name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LocationSelector;
