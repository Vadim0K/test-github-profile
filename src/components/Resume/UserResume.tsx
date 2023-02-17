import React, { useMemo } from "react";
import dayjs from "dayjs";

import styles from "../../styles/Resume.module.scss";
import { IRepositoryInfo, IUserInfo } from "../../types/github";
import LoadingSpinner from "../LoadingSpinner";

const RECENT_REPOSITORIES_COUNT = 5;

interface IProps {
  userInfo?: IUserInfo;
  userRepos?: IRepositoryInfo[];
  isReposFetching: boolean;
}

const UserResume: React.FC<IProps> = ({
  userRepos,
  userInfo,
  isReposFetching,
}) => {
  const languages = useMemo(() => {
    if (userRepos?.length) {
      // Just making an object with languages as keys and count as value
      // Example { JavaScript: 12, Pearl: 6, total: 18 }
      return userRepos.reduce(
        (acc: Record<string, number>, r) =>
          !r.language
            ? acc
            : {
                ...acc,
                [r.language]: (acc[r.language] || 0) + 1,
                total: (acc.total || 0) + 1,
              },
        { total: 0 }
      );
    }
    return {};
  }, [userRepos]);

  const renderLanguages = useMemo(() => {
    const { total, ...langs } = languages;
    return Object.entries(langs)
      .map((value) => [value[0], getPercentageOf(value[1], total)])
      .sort((value1, value2) => (value1[1] > value2[1] ? -1 : 1)) // Sorting by percents
      .map((value, i) => (
        <div key={i} className={styles.item}>
          {value[0]} <span className={styles.percentage}>({value[1]}%)</span>
        </div>
      ));
  }, [languages]);

  const renderHeaderBlock = (
    <div className={styles.header}>
      <span className={styles.title}>{userInfo?.name || "Name unknown"}</span>
      <span className={styles.membership}>
        GitHub member since{" "}
        <strong>{dayjs(userInfo?.created_at).format("DD-MM-YYYY")}</strong>
      </span>
    </div>
  );

  const renderRepositoriesBlock = (
    <>
      <div className={styles.block}>
        <span className={styles.primary_text}>
          <strong>{userInfo?.public_repos}</strong> public repositories
        </span>
        <span className={styles.primary_text}>Most used languages:</span>
        <div className={styles.languages_list}>{renderLanguages}</div>
      </div>
      <div className={styles.block}>
        <span className={styles.primary_text}>
          Recently updated repositories:
        </span>
        <div className={styles.recent_repositories_list}>
          {userRepos?.length &&
            userRepos?.slice(0, RECENT_REPOSITORIES_COUNT).map((r, i) => (
              <div key={i} className={styles.item}>
                <span className={styles.name}>{r.name}</span>
                <a
                  title="Open repository on GitHub"
                  href={r.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.link}
                >
                  {r.full_name}
                </a>
                <div className={styles.last_change}>
                  Last contribution:{" "}
                  <em>{dayjs(r?.updated_at).format("DD-MM-YYYY HH:mm")}</em>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );

  return (
    <div className={styles.container}>
      {renderHeaderBlock}
      {isReposFetching ? <LoadingSpinner /> : renderRepositoriesBlock}
    </div>
  );
};

const getPercentageOf = (value1: number, value2: number) => {
  // In real project I would like to move functions like this in utils directory
  // Initialized there just to save time
  if (value1 === 0 || value2 === 0) {
    return 0;
  }
  return Math.floor((value1 / value2) * 100 * 100) / 100;
};

export default UserResume;
