import React from "react";
import { Button } from "primereact/button";

const SelectionFilter = ({ options, filterCategory, handleClickCat }) => {
  return (
    <div>
      {options.map((option, i) => (
        <Button
          key={i}
          value={filterCategory}
          onClick={() => handleClickCat(option.value)}
          className=""
        >
          {option.label}
        </Button>
      ))}
    </div>
  );
};

export default SelectionFilter;
