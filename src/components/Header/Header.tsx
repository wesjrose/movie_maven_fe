import Nav from "../Nav/Nav";
import classes from "./Header.module.css";

export default function Header() {
  return (
    <header>
      <div className={classes.header_logo}>Movie Maven</div>
      <Nav></Nav>
    </header>
  );
}
