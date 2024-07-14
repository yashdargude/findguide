import Title from "@/components/custom/Title";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import useUserContext from "@/hooks/useUserContext";
import axios from "axios";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

type counselorType = {
  firstname: string;
  lastname: string;
  counselorType: string;
  _id: string;
  email: string;
  phone: string;
  address: string;
  description: string;
};

type counseleeType = {
  firstname: string;
  lastname: string;
  _id: string;
  email: string;
  phone: string;
};

const counselorTypes = [
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

function Profile() {
  const { userType, userId } = useUserContext();
  const [isLoading, setIsLoading] = useState(false);

  const [counselor, setCounselor] = useState<counselorType>({
    firstname: "",
    lastname: "",
    counselorType: "",
    _id: "",
    email: "",
    phone: "",
    address: "",
    description: "",
  });

  const [counselee, setCounselee] = useState<counseleeType>({
    firstname: "",
    lastname: "",
    _id: "",
    email: "",
    phone: "",
  });

  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    setIsDisabled(true);
    const headers = {
      "Content-Type": "application/json",
      "auth-token": localStorage.getItem("auth-token"),
    };

    if (userType == "counselor") {
      //get counselor details
      setIsLoading(true);
      axios
        .get(`/api/appointment/counselorbyid/${userId}`, { headers })
        .then((res) => {
          console.log(res);
          if (res.status == 200) {
            const data: {
              address: string;
              description: string;
              counselorId: {
                _id: string;
                firstname: string;
                lastname: string;
                counselorType: string;
                phone: string;
                email: string;
              };
            } = res.data?.resData[0] || {};
            setCounselor({
              firstname: data.counselorId.firstname,
              lastname: data.counselorId.lastname,
              counselorType: data.counselorId.counselorType,
              _id: data.counselorId._id,
              email: data.counselorId.email,
              phone: data.counselorId.phone,
              address: data.address,
              description: data.description,
            });
          }
          setIsLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setIsLoading(false);
        });
    } else {
      //get client details
      setIsLoading(true);
      axios
        .get("/api/profile/userdetails", { headers })
        .then((res) => {
          if (res.status == 200) {
            const data: {
              firstname: string;
              lastname: string;
              _id: string;
              email: string;
              phone: string;
            } = res.data?.resData || {};
            setCounselee({
              firstname: data.firstname,
              lastname: data.lastname,
              _id: data._id,
              email: data.email,
              phone: data.phone,
            });
          }
          setIsLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setIsLoading(false);
        });
    }
  }, [userId, userType]);

  return (
    <>
      <section className="container mx-auto py-6 px-8">
        <Title title="Profile" />
        <div>
          {isLoading ? (
            <div className="flex flex-col space-y-3">
              <Skeleton className="h-[125px] w-full rounded-xl" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            </div>
          ) : (
            <>
              {userType == "counselee" && (
                <div className="grid w-full items-center gap-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="fname">Firstname</Label>
                      <Input
                        id="fname"
                        disabled={isDisabled}
                        defaultValue={counselee.firstname}
                        onChange={(e) =>
                          setCounselee((prev) => ({
                            ...prev,
                            firstname: e.target.value,
                          }))
                        }
                      />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="lname">Lastname</Label>
                      <Input
                        id="lname"
                        disabled={isDisabled}
                        defaultValue={counselee.lastname}
                        onChange={(e) =>
                          setCounselee((prev) => ({
                            ...prev,
                            lastname: e.target.value,
                          }))
                        }
                      />
                    </div>
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      disabled={true}
                      defaultValue={counselee.email}
                    />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="phone">Phone number</Label>
                    <Input
                      id="phone"
                      disabled={isDisabled}
                      defaultValue={counselee.phone}
                      onChange={(e) =>
                        setCounselee((prev) => ({
                          ...prev,
                          phone: e.target.value,
                        }))
                      }
                    />
                  </div>
                </div>
              )}
              {userType == "counselor" && (
                <div className="grid w-full items-center gap-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="fname">Firstname</Label>
                      <Input
                        id="fname"
                        disabled={isDisabled}
                        defaultValue={counselor.firstname}
                        onChange={(e) =>
                          setCounselor((prev) => ({
                            ...prev,
                            firstname: e.target.value,
                          }))
                        }
                      />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="lname">Lastname</Label>
                      <Input
                        id="lname"
                        disabled={isDisabled}
                        defaultValue={counselor.lastname}
                        onChange={(e) =>
                          setCounselor((prev) => ({
                            ...prev,
                            lastname: e.target.value,
                          }))
                        }
                      />
                    </div>
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      disabled={true}
                      defaultValue={counselor.email}
                    />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="phone">Phone number</Label>
                    <Input
                      id="phone"
                      disabled={isDisabled}
                      defaultValue={counselor.phone}
                      onChange={(e) =>
                        setCounselor((prev) => ({
                          ...prev,
                          phone: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="counselor">Counselor type</Label>
                    <Select
                      disabled={isDisabled}
                      onValueChange={(val) =>
                        setCounselor((prev) => ({
                          ...prev,
                          counselorType: val,
                        }))
                      }
                    >
                      <SelectTrigger id="counselor">
                        <SelectValue placeholder={counselor.counselorType} />
                      </SelectTrigger>
                      <SelectContent position="popper">
                        {counselorTypes.map((counselor) => (
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
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="phone"
                      disabled={isDisabled}
                      defaultValue={counselor.description}
                      onChange={(e) =>
                        setCounselor((prev) => ({
                          ...prev,
                          description: e.target.value,
                        }))
                      }
                    />
                  </div>
                </div>
              )}
            </>
          )}
          {/* <div className="mt-8">
            <Button onClick={() => setIsDisabled(!isDisabled)}>
              Edit Profile
            </Button>
          </div> */}
        </div>
      </section>
    </>
  );
}

export default Profile;
