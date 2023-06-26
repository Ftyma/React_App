import React from "react";

const SelectionFilter = ({ options, filterCategory, handleClickCat }) => {
  return (
    <div className="flex justify-center mt-6">
      {options.map((option, i) => (
        <button
          key={i}
          value={filterCategory}
          onClick={() => handleClickCat(option.value)}
          className={`px-4 bg-orange border border-black mr-1 rounded-md shadow-md hover:shadow-xl hover:scale-105`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};

export default SelectionFilter;
