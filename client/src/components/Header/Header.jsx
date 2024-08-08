import React, { useCallback, useContext, useEffect, useState } from "react";
import Button from "../Button/Button.jsx";
import HomeButton from "../Button/HomeButton.jsx";
import CreateButton from "../Button/CreateButton.jsx";
import SearchBar from "./SearchBar.jsx";
import UserMenu from "./UserMenu.jsx";
import { IoChevronDownOutline } from "react-icons/io5";
import { IoIosSearch } from "react-icons/io";
import { GoBellFill } from "react-icons/go";
import { AiFillMessage } from "react-icons/ai";
import { IoArrowBackSharp } from "react-icons/io5";
import Avatar from "../Avatar.jsx";
import useRegisterModal from "../../hooks/useRegisterModal.js";
import useLoginModal from "../../hooks/useLoginModal.js";
import UserContext from "../../contexts/UserContext.js";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Header = ({ action }) => {
  const [user, setUser] = useContext(UserContext);
  const [showSearch, setShowSearch] = useState(false);
  const [openUserMenu, setOpenUserMenu] = useState(false);
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const navigate = useNavigate();

  const toggleUserMenu = useCallback(() => {
    setOpenUserMenu((value) => !value);
  }, [setOpenUserMenu]);

  const openRegisterModal = useCallback(() => {
    registerModal.onOpen();
  }, [registerModal]);

  const openLoginModal = useCallback(() => {
    loginModal.onOpen();
  }, [loginModal]);

  const logOut = useCallback(() => {
    localStorage.removeItem("ACCESS_TOKEN");
    setUser(null);
    navigate("/");
    toast.success("Logged out successfully!");
  }, [setUser, navigate]);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        openUserMenu &&
        !event.target.closest(".user-menu") &&
        !event.target.closest(".toggle-user-menu-btn")
      ) {
        setOpenUserMenu(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [openUserMenu]);

  useEffect(() => {
    const scrollHandler = () => {
      const navbar = document.querySelector(".navbar");
      if (navbar) {
        if (window.scrollY > 0) {
          navbar.classList.add("custom-box-shadow");
        } else {
          navbar.classList.remove("custom-box-shadow");
        }
      }
    };
    document.addEventListener("scroll", scrollHandler);
    return () => {
      document.removeEventListener("scroll", scrollHandler);
    };
  }, []);

  return (
    <header
      className={`navbar fixed w-full z-10 flex items-center px-5 py-4 gap-4 bg-white transition`}
    >
      {/* Home button */}
      <HomeButton showSearch={showSearch} action={action} />

      {/* Create button */}
      <CreateButton user={user} action={action} />

      {/* Show Search Icon  */}
      <Button
        variant={"icon"}
        size={"icon"}
        className={`${showSearch ? "block" : "hidden"}`}
        onClick={() => setShowSearch(false)}
      >
        <IoArrowBackSharp style={{ fontSize: "24px" }} />
      </Button>

      {/* Search bar */}
      <SearchBar showSearch={showSearch} setShowSearch={setShowSearch} />

      {/* Icons on the right of Header */}
      <div
        className={`${
          showSearch ? "hidden" : "flex items-center flex-shrink-0 gap-2"
        } `}
      >
        {/* Show search icon on small screen */}
        <Button
          variant={"icon"}
          size={"icon"}
          className="block sm:hidden"
          onClick={() => setShowSearch(true)}
        >
          <IoIosSearch style={{ fontSize: "24px" }} />
        </Button>

        {user ? (
          <>
            {/* Icons only when user logged in */}
            <Button variant={"icon"} size={"icon"}>
              {" "}
              <GoBellFill style={{ fontSize: "24px" }} />{" "}
            </Button>
            <Button variant={"icon"} size={"icon"}>
              {" "}
              <AiFillMessage style={{ fontSize: "24px" }} />{" "}
            </Button>
            <Button variant={"icon"} size={"icon"}>
              {" "}
              <Avatar
                src={user.avatar}
                onClick={() => navigate(`/${user.user_name}`)}
              />{" "}
            </Button>
            <Button
              variant={"icon"}
              size={"icon"}
              className="bg-transparent relative toggle-user-menu-btn"
              onClick={toggleUserMenu}
            >
              <IoChevronDownOutline />
            </Button>

            {/* User Menu section */}
            {openUserMenu && <UserMenu logOut={logOut} />}
          </>
        ) : (
          <>
            {/* Log in button */}
            <Button variant="secondary" size="primary" onClick={openLoginModal}>
              Log in
            </Button>

            {/* Sign up button */}
            <Button
              variant="primary"
              size="primary"
              onClick={openRegisterModal}
            >
              Sign up
            </Button>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
