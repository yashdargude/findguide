import {
  HiCalendar,
  HiCubeTransparent,
  HiOutlineUserCircle,
  HiClock,
  HiOutlineExternalLink,
  HiOutlineLogout,
  HiViewGridAdd,
} from "react-icons/hi";
import { NavLink } from "react-router-dom";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import useUserContext from "@/hooks/useUserContext";
import ClearLocalStorage from "@/helpers/ClearLocalStorage";

const counselorNavList = [
  {
    name: "View Appointments",
    path: "/dashboard/counselorappointments",
    icon: HiCalendar,
  },
  {
    name: "Schedule Appointment",
    path: "/dashboard/addappointments",
    icon: HiViewGridAdd,
  },
  {
    name: "Profile",
    path: "/dashboard/profile",
    icon: HiOutlineUserCircle,
  },
];

const counseleeNavList = [
  {
    name: "View Appointments",
    path: "/dashboard/counseleeappointments",
    icon: HiCalendar,
  },
  {
    name: "Schedule Appointment",
    path: "/dashboard/scheduleappointments",
    icon: HiClock,
  },
  {
    name: "Profile",
    path: "/dashboard/profile",
    icon: HiOutlineUserCircle,
  },
];

const normalLink =
  "flex items-center text-sm  text-gray-500 justify-start gap-2 hover:bg-brightred hover:bg-opacity-15 px-3 py-2 rounded-md";

const activeLink =
  "flex  text-brightred text-sm font-semibold items-center justify-start gap-2 bg-brightred bg-opacity-15 px-3 py-2 rounded-lg";

function Sidebar() {
  const { userType } = useUserContext();

  console.log(userType);

  const handleLogout = () => {
    ClearLocalStorage();
    window.location.href = "/";
  };

  return (
    <>
      <div className="relative bg-white lg:w-64 flex flex-col border-r-2 border-brightred border-opacity-15 h-screen px-4 pt-4">
        <NavLink to="/" className="flex items-center justify-center gap-2">
          <HiCubeTransparent className="text-brightred w-8 h-8" />
          <h1 className="text-lg text-black font-bold tracking-widest">
            FindYourGuide
          </h1>
        </NavLink>
        <Separator className="mt-4" />
        <div className="flex flex-col w-full mt-6 ">
          <ul className="flex flex-col gap-2">
            {userType === "counselor" &&
              counselorNavList.map((item, index) => (
                <li key={index} className="w-full">
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      isActive ? activeLink : normalLink
                    }
                  >
                    <item.icon className=" w-5 h-5" />

                    <h6>{item.name}</h6>
                  </NavLink>
                </li>
              ))}
            {userType === "counselee" &&
              counseleeNavList.map((item, index) => (
                <li key={index} className="w-full">
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      isActive ? activeLink : normalLink
                    }
                  >
                    <item.icon className=" w-5 h-5" />

                    <h6>{item.name}</h6>
                  </NavLink>
                </li>
              ))}
          </ul>
          <div className="w-full mt-60">
            <Separator className=" mb-4" />
            <Button
              className="flex items-center text-sm bg-white text-gray-500 justify-start gap-2 hover:bg-amber-400 hover:bg-opacity-15 px-3 py-2 rounded-md w-full"
              onClick={handleLogout}
            >
              <HiOutlineLogout className="w-5 h-5 text-gray-500" />
              <span className="text-gray-500 ">Logout</span>
            </Button>
          </div>
        </div>
        <div className="absolute w-full bottom-[5%] left-[50%] -translate-x-[50%] px-2">
          <Card className="m-2 bg-brightred rounded-md">
            <CardContent>
              <div className="mt-3">
                <h2 className="text-xl text-white font-bold tracking-wide">
                  Help center
                </h2>
                <h5 className="text-sm text-white font-semibold text-opacity-60">
                  Get best service
                </h5>
              </div>
            </CardContent>
            <CardFooter className="w-full">
              <Button className="w-full bg-white bg-opacity-85 text-black hover:bg-amber-100">
                <HiOutlineExternalLink className="text-brightred w-5 h-5 mr-3" />
                Contact us
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
