import Nav from "../Nav/Nav";
import SearchBar from "../SearchBar/SearchBar";
import classes from "./Header.module.css";

export default function Header() {
  return (
    <header>
      <div className={classes["header-logo"]}>Movie Maven</div>
      <Nav></Nav>
      <SearchBar />
    </header>
  );
}
