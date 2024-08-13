// components/UserMenu.jsx
import React from 'react';
import Button from '../Button/Button';
import { useNavigate } from 'react-router-dom';

const UserMenu = ({ logOut }) => {
  const navigate = useNavigate();

  return (
    <div className="user-menu absolute top-16 right-5 z-100 w-2/5 md:w-[12vw] bg-white shadow-xl border-[1px] rounded-xl overflow-hidden">
      <div className="flex flex-col">
        <Button
          variant={"menu"}
          size={"menu"}
          onClick={() => navigate("/profile")}
        >
          Profile
        </Button>
        <Button variant={"menu"} size={"menu"}>
          Settings
        </Button>
        <Button variant={"menu"} size={"menu"} onClick={logOut}>
          Log out
        </Button>
      </div>
    </div>
  );
};

export default UserMenu;
