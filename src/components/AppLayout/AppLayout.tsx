import classes from "./AppLayout.module.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

export default function AppLayout() {
  return (
    <div className={classes.dt_app_layout}>
      <Header />
      <main> Hello world main</main>
      <Footer />
    </div>
  );
}
