import classes from "./AppLayout.module.css";
import Header from "../Header/Header";

export default function AppLayout() {
  return (
    <div className={classes.dt_app_layout}>
      <Header />
      <main> Hello world main</main>
    </div>
  );
}
