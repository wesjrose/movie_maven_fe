import classes from "./Filter.module.css";
import DropdownSelect from "../DropdownSelect/DropdownSelect";

export default function Filter() {
  return (
    <div className={classes["filter-container"]}>
      <DropdownSelect />
    </div>
  );
}
