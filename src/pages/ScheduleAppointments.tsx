import Title from "@/components/custom/Title";
import Notify from "@/helpers/Notify";
import axios from "axios";
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { LuUser2, LuChevronRight } from "react-icons/lu";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";

type counselorType = {
  firstname: string;
  lastname: string;
  counselorType: string;
  _id: string;
};

function ScheduleAppointments() {
  const [counselors, setCounselors] = useState<counselorType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState("");
  useEffect(() => {
    const headers = {
      "Content-Type": "application/json",
      "auth-token": localStorage.getItem("auth-token"),
    };
    setIsLoading(true);
    axios
      .get("/api/profile/getallcounselors", { headers })
      .then((res) => {
        console.log(res);
        if (res.status == 200) {
          const data = res.data?.resData || [];
          if (data.length > 0) {
            const counselorArray = data.map(
              (counselor: {
                counselorId: {
                  _id: string;
                  firstname: string;
                  lastname: string;
                  counselorType: string;
                };
              }) => {
                return {
                  firstname: counselor.counselorId.firstname,
                  lastname: counselor.counselorId.lastname,
                  counselorType: counselor.counselorId.counselorType,
                  _id: counselor.counselorId._id,
                };
              }
            );

            setCounselors(counselorArray);
          }
        }
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        Notify("error", err.response.data?.resMsg);
        setIsLoading(false);
      });
  }, []);

  const navigate = useNavigate();

  const handleNavigate = (id: string) => {
    navigate(`/dashboard/counselor/${id}`);
  };

  return (
    <div className="container mx-auto py-6 px-4">
      <Title title="Schedule appointment" />
      <section>
        <div>
          <h1 className="text-xl underline font-semibold italic text-blue-500">
            Search for a doctor
          </h1>
          <div className="flex items-center mt-4">
            <Input
              placeholder="Search for a doctor"
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </div>
        <div className="mt-12 mb-20 flex items-center justify-center flex-wrap gap-8">
          {isLoading ? (
            <>
              <div className="flex items-center space-x-4">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[250px]" />
                  <Skeleton className="h-4 w-[200px]" />
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[250px]" />
                  <Skeleton className="h-4 w-[200px]" />
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[250px]" />
                  <Skeleton className="h-4 w-[200px]" />
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[250px]" />
                  <Skeleton className="h-4 w-[200px]" />
                </div>
              </div>
            </>
          ) : counselors.length > 0 ? (
            counselors
              .filter(
                (counselor) =>
                  counselor.firstname.toLowerCase().includes(query) ||
                  counselor.lastname.toLowerCase().includes(query)
              )
              .map((counselor) => {
                return (
                  <Card
                    className="min-w-[320px] max-w-[400px] rounded-2xl bg-gray-200"
                    key={counselor._id}
                  >
                    <CardContent>
                      <div className=" flex w-full items-center  gap-4 pt-6">
                        <div>
                          <LuUser2 className="w-20 h-20 border-2 border-gray-500 rounded-full bg-white" />
                        </div>
                        <div>
                          <h1 className="text-sm md:text-lg font-semibold">
                            Dr. {counselor.firstname} {counselor.lastname}
                          </h1>
                          <p className="text-sm italic text-gray-500">
                            {counselor.counselorType}
                          </p>
                          <div className="mt-6">
                            <Button
                              size="sm"
                              className="w-full"
                              onClick={() => handleNavigate(counselor._id)}
                            >
                              Book
                              <LuChevronRight className="w-4 h-4 text-white ml-2" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })
          ) : (
            <h5 className="text-center text-lg lg:text-xl font-bold text-darkblue text-opacity-30 py-24">
              No Counselors registered yet
            </h5>
          )}
        </div>
      </section>
    </div>
  );
}

export default ScheduleAppointments;
