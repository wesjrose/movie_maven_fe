import classes from "./SearchBar.module.css";

export default function SearchBar() {
  return (
    <div className={classes["search-bar"]}>
      <input type="text" defaultValue={"Search the archive..."}></input>
    </div>
  );
}
