import { useState, useEffect } from "react";
import classes from "./Filter.module.css";
import type { dropdownItem } from "../../types";
import DropdownMultiSelect from "../DropdownMultiSelect/DropdownMultiSelect";

export default function Filter() {
  const genreOptions: dropdownItem[] = [
    {
      id: 1,
      name: "Comedy",
    },
    {
      id: 2,
      name: "Action",
    },
    {
      id: 3,
      name: "Adventure",
    },
    {
      id: 4,
      name: "Animation",
    },
    {
      id: 5,
      name: "Fantasy",
    },
  ];
  const [selectedGenres, setSelectedGenres] = useState<dropdownItem[]>([]);

  return (
    <div className={classes["filter-container"]}>
      <DropdownMultiSelect
        defaultText="All Genres"
        options={genreOptions}
        selected={selectedGenres}
        setSelected={setSelectedGenres}
      />
    </div>
  );
}
