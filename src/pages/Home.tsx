import React from "react";
import cn from "classnames";

import HomeForm from "../components/Home/HomeForm";
import appStyles from "../App.module.scss";

const Home = () => {
  return (
    <div className={cn(appStyles.page_container, appStyles.home)}>
      <HomeForm />
    </div>
  );
};

export default Home;
