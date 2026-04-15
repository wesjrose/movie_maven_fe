import Nav from "../Nav/Nav";
import SearchBar from "../SearchBar/SearchBar";
import classes from "./Header.module.css";

import { BsFillPersonFill } from "react-icons/bs";
import { BsBellFill } from "react-icons/bs";

export default function Header() {
  return (
    <header>
      <div className={classes["header-logo"]}>Movie Maven</div>
      <Nav></Nav>
      <SearchBar />
      <BsBellFill className={classes.icon} />
      <BsFillPersonFill className={classes.icon} />
    </header>
  );
}
