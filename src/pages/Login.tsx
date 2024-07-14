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
import loginImg from "../assets/Computer login-bro.svg";
import { NavLink, useNavigate } from "react-router-dom";
import { FormEvent, useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import Notify from "@/helpers/Notify";
import { isValidEmail } from "@/helpers/Validators";
import axios from "axios";
import { CgSpinner } from "react-icons/cg";
import { HiCubeTransparent } from "react-icons/hi";

function Login() {
  const [hide, setHide] = useState("password");

  const [isLoading, setIsLoading] = useState(false);

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleHidePassword = () => {
    setHide(hide === "password" ? "text" : "password");
  };

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    const data = {
      email,
      password,
    };

    if (!email) {
      Notify("error", "Email is required");
      return;
    }

    if (!password) {
      Notify("error", "Password is required");
      return;
    }

    if (!isValidEmail(email)) {
      Notify("error", "Email is invalid");
      return;
    }
    setIsLoading(true);
    axios
      .post("/api/auth/login", data)
      .then((res) => {
        if (res.status == 200) {
          Notify("success", res.data?.resMsg);
          localStorage.setItem("auth-token", res.data?.resData?.token);
          setIsLoading(false);
          navigate("/dashboard/profile");
        }
      })
      .catch((error) => {
        Notify("error", error.response.data.resMsg);
        setIsLoading(false);
      });
  };

  return (
    <section className="flex flex-col lg:flex-row w-full h-screen ">
      <div className="w-full lg:w-1/2 px-4 md:px-20 py-16 ">
        <div className="w-full ml-2">
          <NavLink to="/" className="flex items-center justify-start gap-2">
            <HiCubeTransparent className="text-brightred w-6 h-6" />
            <h1 className="text-2xl text-darkblue font-bold tracking-widest">
              FindYourGuide
            </h1>
          </NavLink>
        </div>
        <Card className="border-none w-full shadow-none bg-transparent">
          <CardHeader>
            <CardTitle>Login to your account</CardTitle>
            <CardDescription>to access our dashboard</CardDescription>
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
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="w-full flex flex-col items-start">
            <Button
              className="w-full bg-brightred"
              onClick={(e) => handleLogin(e)}
              disabled={isLoading}
            >
              {isLoading && <CgSpinner className="mr-2 h-4 w-4 animate-spin" />}
              Login
            </Button>
            <div className="flex gap-1 mt-2">
              <p className="text-sm text-start text-gray-500">
                Do not have an account?
              </p>
              <NavLink
                to="/register"
                className="text-brightred underline text-sm"
              >
                Register
              </NavLink>
            </div>
          </CardFooter>
        </Card>
      </div>
      <div className="hidden lg:flex items-center justify-center w-full lg:w-1/2 bg-brightred bg-opacity-5">
        <img src={loginImg} alt="Login hero image" className="w-[70%]" />
      </div>
    </section>
  );
}

export default Login;
