import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import registerImg from "../assets/Sign up-bro.svg";
import { NavLink, useNavigate } from "react-router-dom";
import { FormEvent, useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { MdError } from "react-icons/md";
import { IoCheckmarkCircle } from "react-icons/io5";
import axios from "axios";
import Notify from "@/helpers/Notify";
import { isValidIndianPhoneNumber, isValidEmail } from "@/helpers/Validators";
import { CgSpinner } from "react-icons/cg";
import { HiCubeTransparent } from "react-icons/hi";

type counselor = {
  id: number;
  value: string;
  label: string;
};

const counselorTypes: counselor[] = [
  {
    id: 1,
    value: "Marriage & Family Counselor",
    label: "Marriage & Family Counselor",
  },
  { id: 2, value: "Mental Health Counselor", label: "Mental Health Counselor" },
  { id: 3, value: "School Counselor", label: "School Counselor" },
  { id: 4, value: "Career Counselor", label: "Career Counselor" },
  {
    id: 5,
    value: "Rehabilitation Counselor",
    label: "Rehabilitation Counselor",
  },
  { id: 6, value: "Legal Counselor", label: "Legal Counselor" },
  { id: 9, value: "Educational Counselor", label: "Educational Counselor" },
];

function Register() {
  const [hide, setHide] = useState("password");
  const [isLoading, setIsLoading] = useState(false);
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [user, setUser] = useState("");
  const [counselortype, setCounselorType] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleHidePassword = () => {
    setHide(hide === "password" ? "text" : "password");
  };

  const handleRegister = (e: FormEvent) => {
    e.preventDefault();
    const data = {
      fname,
      lname,
      email,
      userType: user,
      counselortype,
      phone,
      password,
    };

    console.log(data);

    if (!fname || !lname || !email || !user || !phone || !password) {
      Notify("error", "All fields are required");
      return;
    }

    if (user === "counselor" && !counselortype) {
      Notify("error", "Please select a counselor type");
      return;
    }

    if (!isValidEmail(email)) {
      Notify("error", "Enter valid email address");
      return;
    }

    if (!isValidIndianPhoneNumber(phone)) {
      Notify("error", "Enter valid mobile number");
      return;
    }
    setIsLoading(true);
    axios
      .post("/api/auth/register", data)
      .then((res) => {
        if (res.status == 201) {
          Notify("success", res.data.resMsg);
          setIsLoading(false);
          setTimeout(() => navigate("/login"), 3000);
        }
      })
      .catch((error) => {
        Notify("error", error.response.data.resMsg);
        setIsLoading(false);
      });
  };

  return (
    <section className="flex flex-col lg:flex-row w-full ">
      <div className="w-full lg:w-1/2 px-4 md:px-20 py-16 ">
        <div className="w-full ml-4">
          <NavLink to="/" className="flex items-center justify-start gap-2">
            <HiCubeTransparent className="text-brightred w-6 h-6" />
            <h1 className="text-2xl text-darkblue font-bold tracking-widest">
              FindYourGuide
            </h1>
          </NavLink>
        </div>
        <Card className="border-none w-full shadow-none bg-transparent">
          <CardHeader>
            <CardTitle>Create your account</CardTitle>
            <CardDescription>to start your journey with us</CardDescription>
          </CardHeader>
          <CardContent>
            <form>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="fname">First Name</Label>
                  <Input
                    id="fname"
                    onChange={(e) => setFname(e.target.value)}
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="lname">Last Name</Label>
                  <Input
                    id="lname"
                    onChange={(e) => setLname(e.target.value)}
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    type="email"
                    id="email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="phone">Phone number</Label>
                  <Input
                    type="text"
                    id="phone"
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="user">User type</Label>
                  <Select onValueChange={(val) => setUser(val)}>
                    <SelectTrigger id="user">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent position="popper">
                      <SelectItem value="counselor">Counselor</SelectItem>
                      <SelectItem value="counselee">
                        Counselee(Client)
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {user == "counselor" && (
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="counselor">Counselor type</Label>
                    <Select onValueChange={(val) => setCounselorType(val)}>
                      <SelectTrigger id="counselor">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent position="popper">
                        {counselorTypes.map((counselor: counselor) => (
                          <SelectItem
                            key={counselor.id}
                            value={counselor.value}
                          >
                            {counselor.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      type={hide}
                      id="password"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    {hide == "password" ? (
                      <AiFillEyeInvisible
                        className="w-4 h-4 lg:w-5 lg:h-5 text-gray-400 absolute right-2 top-[50%] -translate-y-[50%] cursor-pointer"
                        onClick={handleHidePassword}
                      />
                    ) : (
                      <AiFillEye
                        className="w-4 h-4 lg:w-5 lg:h-5 text-gray-400 absolute right-2 top-[50%] -translate-y-[50%] cursor-pointer"
                        onClick={handleHidePassword}
                      />
                    )}
                  </div>

                  {password.length == 0 ? (
                    <p className="text-sm flex gap-1 text-gray-400">
                      Your password must be 8 characters or more.
                    </p>
                  ) : password.length < 8 ? (
                    <p className="text-sm flex gap-1 text-brightred">
                      <MdError className="w-4 h-4 text-brightred" />
                      Your password must be 8 characters or more.
                    </p>
                  ) : (
                    <p className="text-sm flex gap-1 text-green-400">
                      <IoCheckmarkCircle className="w-4 h-4 text-green-400" />
                      Valid Password
                    </p>
                  )}
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="w-full flex flex-col items-start">
            <Button
              className="w-full bg-brightred"
              onClick={(e) => handleRegister(e)}
              disabled={isLoading}
            >
              {isLoading && <CgSpinner className="mr-2 h-4 w-4 animate-spin" />}
              Register
            </Button>
            <div className="flex gap-1 mt-2">
              <p className="text-sm text-start text-gray-500">
                Do you already have an account?
              </p>
              <NavLink to="/login" className="text-brightred underline text-sm">
                Login
              </NavLink>
            </div>
            <div className="border-b-[0.1px] border-gray-400 w-full mt-8 relative">
              <div className="absolute left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%] bg-white text-sm p-3 text-gray-500">
                or
              </div>
            </div>
            <div className="flex gap-1 mt-8">
              <p className="text-sm text-center text-gray-500">
                Are you a admin?
              </p>
              <NavLink
                to="/adminregister"
                className="text-brightred underline text-sm"
              >
                Register here
              </NavLink>
            </div>
          </CardFooter>
        </Card>
      </div>
      <div className="hidden lg:flex items-center justify-center w-full lg:w-1/2 bg-brightred bg-opacity-5">
        <img src={registerImg} alt="Register hero image" className="w-[70%]" />
      </div>
    </section>
  );
}

export default Register;
