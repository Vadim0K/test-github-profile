import React, { useMemo } from "react";
import { useParams } from "react-router-dom";
import cn from "classnames";

import appStyles from "../App.module.scss";
import { LoadingSpinner } from "../components";
import { UserNotFound, UserResume, Breadcrumbs } from "../components/Resume";
import { useUserInfo, useUserRepos } from "../services/GitHubService";

const Resume = () => {
  const { nickname = "" } = useParams<{ nickname: string }>();
  const {
    data: userInfo,
    isFetching: isUserFetching,
    error: userError,
  } = useUserInfo(nickname);
  const { data: userRepos, isFetching: isReposFetching } =
    useUserRepos(nickname);

  const isUserNotFound = useMemo(
    () => userError && (userError as Response).status === 404,
    [userError]
  );

  const renderContent = (() => {
    switch (true) {
      case isUserFetching:
        return <LoadingSpinner />;
      case isUserNotFound:
        return <UserNotFound nickname={nickname} />;
      default:
        return (
          <UserResume
            isReposFetching={isReposFetching}
            userInfo={userInfo}
            userRepos={userRepos}
          />
        );
    }
  })();

  return (
    <div className={cn(appStyles.page_container, appStyles.resume)}>
      <Breadcrumbs />
      {renderContent}
    </div>
  );
};

export default Resume;
