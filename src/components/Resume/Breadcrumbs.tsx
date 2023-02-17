import React from "react";

import styles from "../../styles/Resume.module.scss";

const Breadcrumbs = () => (
  <a className={styles.back_to_home} href="/home">
    Back to another user
  </a>
);

export default Breadcrumbs;
