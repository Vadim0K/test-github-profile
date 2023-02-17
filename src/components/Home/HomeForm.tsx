import React, { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

import styles from "../../styles/Home.module.scss";

const HomeForm = () => {
  const navigate = useNavigate();

  const [nickname, setNickname] = useState<string>("");

  const handleInputOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
  };

  const handleSubmit = () => {
    if (nickname) {
      navigate(`/resume/${nickname}`);
    }
  };

  const handleInputKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <div className={styles.container}>
      <span className={styles.title}>GitHub user profiler</span>
      <span className={styles.desc}>
        Take brief information about GitHub user and his projects
      </span>
      <div className={styles.form}>
        <input
          placeholder="Enter GitHub username"
          onKeyDown={handleInputKeyDown}
          onChange={handleInputOnChange}
          value={nickname}
        />
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
};

export default HomeForm;
