import classes from "./AppLayout.module.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import NewReleases from "../NewReleases/NewReleases";

export default function AppLayout() {
  return (
    <div className={classes.dt_app_layout}>
      <Header />
      <NewReleases />
      <Footer />
    </div>
  );
}
