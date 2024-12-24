import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import userProfilePlaceholder from "../assets/images/userProfile.svg";

function UserProfile() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    } else {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <>
      <img
        src={user?.profileImage || userProfilePlaceholder}
        alt="User Profile"
        className="absolute right-0 mr-5 h-[2rem] w-[2rem] rounded-full object-cover"
      />
    </>
  );
}

export default UserProfile;
