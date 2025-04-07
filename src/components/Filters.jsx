import { useState } from "react";
import * as Select from "@radix-ui/react-select";
import { Check, ChevronDown } from "lucide-react";
import "../index.css";

export default function Filters({ onFilterChange }) {
  const [sortBy, setSortBy] = useState("pertinence");

  const handleSortChange = (value) => {
    setSortBy(value);
    onFilterChange(value);
  };

  return (
    <div className="filters-container">
      <Select.Root value={sortBy} onValueChange={handleSortChange}>
        <Select.Trigger className="custom-select">
          <Select.Value placeholder="Trier par" />
          <ChevronDown className="ml-2 w-4 h-4" />
        </Select.Trigger>
        <Select.Portal>
          <Select.Content className="custom-select-content">
            <Select.Viewport className="p-2 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
              <SelectItem value="pertinence">Pertinence</SelectItem>
              <SelectItem value="date">Date</SelectItem>
              <SelectItem value="categorie">Catégorie</SelectItem>
            </Select.Viewport>
          </Select.Content>
        </Select.Portal>
      </Select.Root>
    </div>
  );
}

// ✅ Composant réutilisable pour SelectItem
function SelectItem({ children, value }) {
  return (
    <Select.Item
      value={value}
      className="custom-select-item flex items-center gap-2 p-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-all"
    >
      <Select.ItemText>{children}</Select.ItemText>
      <Select.ItemIndicator>
        <Check className="w-4 h-4 text-blue-500" />
      </Select.ItemIndicator>
    </Select.Item>
  );
}
