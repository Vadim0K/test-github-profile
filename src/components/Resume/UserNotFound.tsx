import React from "react";
import cn from "classnames";

import styles from "../../styles/Resume.module.scss";

interface IProps {
  nickname: string;
}

const UserNotFound: React.FC<IProps> = ({ nickname }) => (
  <div className={cn(styles.container, styles.notFound)}>
    <span className={styles.status}>404</span>
    <span>
      There is not user with <strong>{nickname}</strong> nickname
    </span>
    <a className={styles.link} href="/home">
      Try to find another one
    </a>
  </div>
);

export default UserNotFound;
