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

import registerImg from "../assets/Sign up-bro.svg";
import { NavLink, useNavigate } from "react-router-dom";
import { FormEvent, useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { MdError } from "react-icons/md";
import { IoCheckmarkCircle } from "react-icons/io5";
import axios from "axios";
import Notify from "@/helpers/Notify";
import { isValidEmail } from "@/helpers/Validators";
import { CgSpinner } from "react-icons/cg";
import { HiCubeTransparent } from "react-icons/hi";

function AdminRegistration() {
  const [hide, setHide] = useState("password");
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [privateCode, setPrivateCode] = useState("");
  const navigate = useNavigate();

  const handleHidePassword = () => {
    setHide(hide === "password" ? "text" : "password");
  };

  const handleRegister = (e: FormEvent) => {
    e.preventDefault();
    const data = {
      email,
      password,
      privateCode,
    };

    if (!email || !password) {
      Notify("error", "All fields are required");
      return;
    }

    if (!privateCode){
      Notify("error", "Private code is required");
      return;
    }
      if (!isValidEmail(email)) {
        Notify("error", "Enter valid email address");
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
      <div className="w-full lg:w-1/2 px-20 py-16 ">
        <div className="w-full">
          <NavLink to="/" className="flex items-center justify-start gap-2">
            <HiCubeTransparent className="text-brightred w-6 h-6" />
            <h1 className="text-2xl text-darkblue font-bold tracking-widest">
              FindYourGuide
            </h1>
          </NavLink>
        </div>
        <Card className="border-none w-full shadow-none bg-transparent">
          <CardHeader>
            <CardTitle>Create admin account</CardTitle>
            <CardDescription>only authorized individual</CardDescription>
          </CardHeader>
          <CardContent>
            <form>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    type="email"
                    id="email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="text">Private code</Label>
                  <Input
                    type="text"
                    id="text"
                    onChange={(e) => setPrivateCode(e.target.value)}
                  />
                </div>

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
          </CardFooter>
        </Card>
      </div>
      <div className="hidden lg:flex items-center justify-center w-full lg:w-1/2 bg-brightred bg-opacity-5">
        <img src={registerImg} alt="Register hero image" className="w-[70%]" />
      </div>
    </section>
  );
}

export default AdminRegistration;
