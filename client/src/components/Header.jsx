import React, { useCallback, useContext, useEffect, useState } from "react";
import Button from "./Button";
import { IoChevronDownOutline } from "react-icons/io5";
import { IoIosSearch } from "react-icons/io";
import { GoBellFill } from "react-icons/go";
import { AiFillMessage } from "react-icons/ai";
import { IoArrowBackSharp } from "react-icons/io5";
import Avatar from "./Avatar";
import useRegisterModal from "../hooks/useRegisterModal";
import useLoginModal from "../hooks/useLoginModal";
import UserContext from "../contexts/UserContext.js";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Header = ({ action }) => {
  const [ user , setUser ] = useContext(UserContext);
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
    // Clear the user session or token
    localStorage.removeItem("ACCESS_TOKEN");
    setUser(null);
    toast.success("Logged out successfully!");
    navigate("/")
  }, [setUser, navigate]);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        openUserMenu &&
        !event.target.closest(".user-menu") && // Check if clicked outside the user menu
        !event.target.closest(".toggle-user-menu-btn") // Check if clicked outside the toggle button
      ) {
        setOpenUserMenu(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [openUserMenu]);

  return (
    <div className="navbar fixed w-full z-20 flex items-center border-b-[1px] px-5 py-4 gap-4 bg-white">
      {/* Home button */}
      <Button
        variant="home"
        size="default"
        className={`flex-shrink-0 rounded-full p-3 
        ${showSearch ? "hidden" : "flex"}
        ${action === "create" ? "bg-transparent text-gray-900" : ""}
        `}
        onClick={() => navigate("/")}
      >
        Home
      </Button>

      {/* Create button */}
      <Button
        variant="normal"
        size="default"
        className={`flex-shrink-0 gap-2 
        ${showSearch ? "hidden" : "flex"}
        ${action === "create" ? "bg-gray-900 text-white rounded-full p-3" : ""}
        `}
        onClick={() => {
          if (user) {
            navigate("/create")
          } else {
            toast.error("You have to log in to create a new pin!!")
          }
        }}
      >
        Create <IoChevronDownOutline />
      </Button>

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
      <div
        className={`${
          showSearch ? "block  flex-grow" : "hidden sm:block flex-grow"
        }`}
      >
        <div className="relative">
          <form className="w-ful mx-auto">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <IoIosSearch size={22} className="text-neutral-700" />
            </div>
            <input
              type="search"
              id="default-search"
              className="block w-full p-3 ps-10 rounded-full bg-neutral-100 hover:bg-neutral-200 transition text-base text-gray-700 placeholder-neutral-700"
              placeholder="Search for easy dinner, fashion, etc"
              required
            />
          </form>
        </div>
      </div>

      {/* Icons on the right of Header */}
      <div
        className={`${
          showSearch ? "hidden" : "flex items-center flex-shrink-0 gap-2"
        } `}
      >
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
            <Button variant={"icon"} size={"icon"}>
              <GoBellFill style={{ fontSize: "24px" }} />
            </Button>
            <Button variant={"icon"} size={"icon"}>
              <AiFillMessage style={{ fontSize: "24px" }} />
            </Button>
            <Button variant={"icon"} size={"icon"}>
              <Avatar src={user.avatar} />
            </Button>
            <Button
              variant={"icon"}
              size={"icon"}
              className="bg-transparent relative toggle-user-menu-btn"
              onClick={toggleUserMenu}
            >
              <IoChevronDownOutline />
            </Button>
            {openUserMenu && (
              <div className="user-menu absolute top-16 right-5 z-100 w-[12vw] bg-white shadow-xl border-[1px] rounded-xl overflow-hidden">
                <div className="flex flex-col">
                  <Button variant={"menu"} size={"menu"}>
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
            )}
          </>
        ) : (
          <>
            <Button variant="secondary" size="primary" onClick={openLoginModal}>
              Log in
            </Button>
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
    </div>
  );
};

export default Header;
