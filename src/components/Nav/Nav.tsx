import classes from "./Nav.module.css";

export default function Nav() {
  return (
    <nav className={`flex items-center gap-10 pl-5 ${classes.nav}`}>
      <a href="#">New Releases</a>
    </nav>
  );
}
