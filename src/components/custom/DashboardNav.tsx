import {
  HiOutlineBell,
  HiMenu,
  HiCubeTransparent,
  HiOutlineLogout,
} from "react-icons/hi";
import { Dispatch, SetStateAction } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { LuX } from "react-icons/lu";
import useUserContext from "@/hooks/useUserContext";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "../ui/button";
import ClearLocalStorage from "@/helpers/ClearLocalStorage";
import { LuUser } from "react-icons/lu";

interface navProps {
  setOpen: Dispatch<SetStateAction<boolean>>;
  open: boolean;
}

function DashboardNav({ setOpen, open }: navProps) {
  const { firstname } = useUserContext();
  const navigate = useNavigate();
  const toggleOpen = () => {
    setOpen(!open);
  };
  const handleLogout = () => {
    ClearLocalStorage();
    window.location.href = "/";
  };
  return (
    <>
      <div className="flex items-center justify-between px-6 gap-4 bg-white w-full h-16 border-b-2 border-brightred border-opacity-15">
        <div className="flex items-center justify-center gap-3">
          <NavLink
            to="/"
            className="flex lg:hidden items-center justify-center gap-2 text-sm"
          >
            <HiCubeTransparent className="text-brightred w-6 h-6" />
            <h1 className=" text-black font-bold tracking-widest">
              FindYourGuide
            </h1>
          </NavLink>
        </div>
        <div className="flex items-center justify-center gap-4">
          <div>
            <HiOutlineBell className="w-6 h-6 text-brightred" />
          </div>

          <Popover>
            <PopoverTrigger>
              <h1 className=" bg-brightred w-8 h-8 grid place-content-center rounded-full text-white font-bold">
                {firstname.toUpperCase()[0]}
              </h1>
            </PopoverTrigger>
            <PopoverContent className="w-56 flex flex-col gap-2">
              <Button
                className="bg-brightred text-white hover:text-black"
                onClick={handleLogout}
                variant="outline"
                size="sm"
              >
                <HiOutlineLogout className="w-5 h-5 mr-2" />
                <span className=" ">Logout</span>
              </Button>
              <Button
                className="bg-amber-300"
                onClick={() => navigate("/dashboard/profile")}
                variant="outline"
                size="sm"
              >
                <LuUser className="w-5 h-5 text-brightred mr-2" />
                <span className="text-brightred ">Profile</span>
              </Button>
            </PopoverContent>
          </Popover>

          <div className="flex lg:hidden">
            {open ? (
              <LuX
                className="w-5 h-5 text-brightred cursor-pointer"
                onClick={toggleOpen}
              />
            ) : (
              <HiMenu
                className="w-5 h-5 text-brightred cursor-pointer"
                onClick={toggleOpen}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default DashboardNav;
