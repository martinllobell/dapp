import { useState } from "react";

const FilterSearch = () => {
  const [selectedOption, setSelectedOption] = useState("Date");

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div className="grid w-auto grid-cols-4  rounded-xl p-1 ">
      {["Date","Won", "Lost", "Current"].map((option) => (
        <div key={option}>
          <input
            type="radio"
            name="option"
            id={option}
            value={option}
            checked={selectedOption === option}
            onChange={handleOptionChange}
            className="peer hidden"
          />
          <label
            htmlFor={option}
            className={`block cursor-pointer select-none rounded-xl p-2 text-center ${
              selectedOption === option
                ? "transition-background rounded-md border border-gray-800 bg-gradient-to-r from-gray-100 via-[#c7d2fe] to-[#8678f9] bg-[length:200%_200%] bg-[0%_0%] font-medium text-gray-950 duration-500 hover:bg-[100%_200%] focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-gray-50"
                : ""
            }`}
          >
            {option}
          </label>
        </div>
      ))}
    </div>
  );
};

export default FilterSearch;
