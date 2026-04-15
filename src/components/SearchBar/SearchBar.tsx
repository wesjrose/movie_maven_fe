import classes from "./SearchBar.module.css";
import { BsSearch } from "react-icons/bs";

export default function SearchBar() {
  return (
    <div className={classes.search}>
      <BsSearch className={classes.icon} />
      <input type="text" placeholder="Search the archive..."></input>
    </div>
  );
}
