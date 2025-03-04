import { NavLink, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import useAuthContext from "@/hooks/useAuthContext";
import ClearLocalStorage from "@/helpers/ClearLocalStorage";
import { HiCubeTransparent } from "react-icons/hi";
import { LuMenu, LuX } from "react-icons/lu";
import { useState } from "react";

function Header() {
  const navigate = useNavigate();
  const { isAuthenticated, token } = useAuthContext();
  console.log(token);
  const [open, setOpen] = useState(true);

  const handleLogout = () => {
    ClearLocalStorage();
    window.location.reload();
  };

  const handleOpen = () => {
    setOpen(!open);
  };
  return (
    <header className="bg-darkblue fixed w-full left-0 top-0 backdrop:blur-3xl backdrop:opacity-10 z-50 ">
      <nav className="container mx-auto flex items-center justify-between px-4 py-8">
        <NavLink to="/" className="flex items-center justify-center gap-2">
          <HiCubeTransparent className="text-brightred w-10 h-10" />
          <h1 className="text-sm lg:text-2xl text-white font-bold tracking-widest">
            FindYourGuide
          </h1>
        </NavLink>

        <ul className="lg:flex hidden justify-center items-center gap-6">
          <li>
            <NavLink
              to="/"
              className="text-smoothpink font-bold text-sm tracking-wide"
            >
              How does it work?
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/"
              className="text-smoothpink font-bold text-sm tracking-wide"
            >
              Features
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/"
              className="text-smoothpink font-bold text-sm tracking-wide"
            >
              Contact
            </NavLink>
          </li>
          <li>
            <div className="pl-4 flex items-center gap-4">
              {isAuthenticated ? (
                <>
                  <Button
                    variant="outline"
                    className="bg-transparent text-white hover:text-brightred rounded-full px-6 border-2"
                    onClick={() => navigate("/dashboard/profile")}
                  >
                    Dashboard
                  </Button>
                  <Button
                    className="bg-brightred hover:bg-white hover:text-brightred rounded-full px-6"
                    onClick={handleLogout}
                  >
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    variant="outline"
                    className="bg-transparent text-white hover:text-brightred rounded-full px-6 border-2"
                    onClick={() => navigate("/login")}
                  >
                    Login
                  </Button>
                  <Button
                    className="bg-brightred hover:bg-white hover:text-brightred rounded-full px-6"
                    onClick={() => navigate("/register")}
                  >
                    Register
                  </Button>
                </>
              )}
            </div>
          </li>
        </ul>
        <div className="block lg:hidden cursor-pointer" onClick={handleOpen}>
          <LuMenu className="text-brightred w-6 h-6" />
        </div>
        <div
          className={`absolute top-0 left-0 flex flex-col items-center justify-center h-screen bg-darkblue w-full ${
            open ? "-translate-x-[100%]" : "-translate-x-[0%]"
          } transition-all ease-in-out delay-75`}
        >
          <div
            className="absolute top-12 right-12 cursor-pointer"
            onClick={handleOpen}
          >
            <LuX className="text-brightred w-8 h-8" />
          </div>
          <ul className="lg:hidden flex flex-col justify-center items-center gap-12">
            <li>
              <NavLink
                to="/"
                className="text-smoothpink font-bold text-2xl tracking-wide"
              >
                How does it work?
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/"
                className="text-smoothpink font-bold text-2xl tracking-wide"
              >
                Features
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/"
                className="text-smoothpink font-bold text-2xl tracking-wide"
              >
                Contact
              </NavLink>
            </li>
            <li className="w-full">
              <div className="pl-4 flex flex-col items-center w-full gap-4">
                {isAuthenticated ? (
                  <>
                    <Button
                      variant="outline"
                      className="bg-transparent text-white hover:text-brightred rounded-full px-6 border-2 w-full"
                      onClick={() => navigate("/dashboard/profile")}
                      size="lg"
                    >
                      Dashboard
                    </Button>
                    <Button
                      className="bg-brightred hover:bg-white hover:text-brightred rounded-full px-6 w-full"
                      onClick={handleLogout}
                      size="lg"
                    >
                      Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      variant="outline"
                      className="bg-transparent text-white hover:text-brightred rounded-full px-6 border-2 w-full"
                      onClick={() => navigate("/login")}
                      size="lg"
                    >
                      Login
                    </Button>
                    <Button
                      className="bg-brightred hover:bg-white hover:text-brightred rounded-full px-6 w-full"
                      onClick={() => navigate("/register")}
                      size="lg"
                    >
                      Register
                    </Button>
                  </>
                )}
              </div>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}

export default Header;
