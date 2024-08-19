import React from "react";
import Dropdown from "components/dropdown";
import { useNavigate } from "react-router-dom";
// import { RiMoonFill, RiSunFill } from "react-icons/ri";
import avatar from "assets/img/avatars/avatar4.png";
import { HambergerMenu } from "iconsax-react";
import { jwtDecode } from "jwt-decode";

const Navbar = (props) => {
  const { brandText, onOpenSidenav } = props;
  // const [darkmode, setDarkmode] = React.useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [decodedToken, setDecodedToken] = React.useState(null);
  
  React.useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode(token); // Decodes the JWT
        console.log(decoded?.username);
        setDecodedToken(decoded?.username);
      } catch (error) {
        console.error("Invalid token:", error);
      }
    }
  }, [token]);
  return (
    <nav className="sticky top-4 z-40 flex flex-row flex-wrap items-center justify-between rounded-xl bg-white/10 p-2 backdrop-blur-xl dark:bg-[#0b14374d]">
      <div className="ml-[6px]">
        <div className="h-6 w-[224px] pt-1">
          <p className="text-sm font-normal text-navy-700 hover:underline dark:text-white dark:hover:text-white">
            Pages / {brandText}
          </p>
        </div>
        <h1 className="shrink text-[33px] font-bold capitalize text-navy-700 hover:text-navy-700 dark:text-white dark:hover:text-white">
          {brandText}
        </h1>
      </div>

      <div className="flex items-center space-x-6 rounded-full bg-white px-4 py-2.5 drop-shadow-sm dark:bg-navy-700">
        <button
          className="cursor-pointer text-gray-600"
          onClick={onOpenSidenav}
        >
          <HambergerMenu className="h-4 w-4 text-gray-600 dark:text-white" />
        </button>
        {/* <button
          className="cursor-pointer text-gray-600"
          onClick={() => {
            if (darkmode) {
              document.body.classList.remove("dark");
              setDarkmode(false);
            } else {
              document.body.classList.add("dark");
              setDarkmode(true);
            }
          }}
        >
          {darkmode ? (
            <RiSunFill className="h-4 w-4 text-gray-600 dark:text-white" />
          ) : (
            <RiMoonFill className="h-4 w-4 text-gray-600 dark:text-white" />
          )}
        </button> */}
        {/* Profile & Dropdown */}
        <Dropdown
          button={
            <img
              className="h-10 w-10 rounded-full"
              src={avatar}
              alt="Profile"
            />
          }
          children={
            <div className="flex h-48 w-56 flex-col justify-start rounded-[20px] bg-white bg-cover bg-no-repeat shadow-xl shadow-shadow-500 dark:!bg-navy-700 dark:text-white dark:shadow-none">
              <div className="mt-3 ml-4">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-bold text-navy-700 dark:text-white">
                    Hi, {decodedToken}
                  </p>{" "}
                </div>
              </div>
              <div className="mt-3 h-px w-full bg-gray-200 dark:bg-white/20 " />

              <div className="mt-3 ml-4">
                <button
                  onClick={() => {
                    localStorage.removeItem("token");
                    navigate("/auth/sign-in", { replace: true });
                  }}
                  className="text-sm font-medium text-red-500 hover:text-red-500"
                >
                  Log Out
                </button>
              </div>
            </div>
          }
          classNames={"py-2 top-8 -left-[180px] w-max"}
        />
      </div>
    </nav>
  );
};

export default Navbar;
