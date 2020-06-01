import React, { useState, useEffect } from "react";

import UserProfile from "../../containers/UserProfile";
import UserPosts from "../../containers/UserPosts";

import Loading from "../../components/Loading";

const ProfileRoute = () => {
  const [profile, setProfile] = useState({});
  const [userPosts, setUserPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("https://5e7d0266a917d70016684219.mockapi.io/api/v1/users")
      .then((response) => response.json())
      .then((profile) => setProfile(profile));
  }, []);

  useEffect(() => {
    if (profile.id) {
      fetch(
        `https://5e7d0266a917d70016684219.mockapi.io/api/v1/users/${profile.id}/posts`
      )
        .then((response) => response.json())
        .then((posts) => {
          setUserPosts(posts);
          setIsLoading(false);
        });
    }
  }, [profile.id]);

  return (
    <div data-testid="profile-route">
      <UserProfile
        avatar={profile.avatar}
        name={profile.name}
        username={profile.username}
        email={profile.email}
      />
      {isLoading ? <Loading /> : <UserPosts posts={userPosts} />}
    </div>
  );
};

export default ProfileRoute;
