import Title from "@/components/custom/Title";
import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  LuCalendarDays,
  LuChevronLeft,
  LuClock,
  LuLoader2,
} from "react-icons/lu";
import { Separator } from "@/components/ui/separator";
import DatePicker from "@/components/custom/DatePicker";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import Notify from "@/helpers/Notify";

type appointmentType = {
  _id: string;
  date: string;
  startTime: string;
  endTime: string;
  status: string;
  reservationStatus: string;
};

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
function Counselor() {
  const { id } = useParams();
  const [date, setDate] = useState<Date | undefined>(new Date());
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
  const [reload, setReload] = useState(0);
  const [appointments, setAppointments] = useState<appointmentType[]>([]);
  const [appLoading, setAppLoading] = useState(false);
  const [reserveLoading, setReserveLoading] = useState(false);

  useEffect(() => {
    const headers = {
      "Content-Type": "application/json",
      "auth-token": localStorage.getItem("auth-token"),
    };

    axios
      .get(`/api/appointment/counselorbyid/${id}`, { headers })
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
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  useEffect(() => {
    const headers = {
      "Content-Type": "application/json",
      "auth-token": localStorage.getItem("auth-token"),
    };
    const data = {
      date: date?.toISOString(),
      counselorId: id,
    };

    console.log(data);
    setAppLoading(true);
    axios
      .post(`/api/appointment/availableappointmentsbydate`, data, {
        headers,
      })
      .then((res) => {
        console.log(res);
        if (res.status == 200) {
          const data: appointmentType[] = res.data?.resData || [];
          if (data?.length > 0) {
            console.log(data);

            const newAppointments: appointmentType[] = data.map(
              (val: appointmentType) => ({
                endTime: new Date(val.endTime).toLocaleTimeString(),
                _id: val._id,
                reservationStatus: val.reservationStatus,
                startTime: new Date(val.startTime).toLocaleTimeString(),
                status: val.status,
                date: new Date(val.date).toLocaleDateString(),
              })
            );

            setAppointments(newAppointments);
          } else {
            setAppointments([]);
          }
          setAppLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setAppLoading(false);
      });
  }, [setDate, date, reload, setReload, id]);

  const handleReserve = (appointmentId: string) => {
    const headers = {
      "Content-Type": "application/json",
      "auth-token": localStorage.getItem("auth-token"),
    };
    const data = {
      appointmentId,
    };
    setReserveLoading(true);
    axios
      .post("/api/appointment/reserveappointment", data, { headers })
      .then((res) => {
        if (res.status == 200) {
          Notify("success", res.data.resMsg);
          setReserveLoading(false);
          setReload(reload + 1);
        }
      })
      .catch((err) => {
        console.log(err);
        Notify("error", err.response.data.resMsg);
        setReserveLoading(false);
      });
  };

  return (
    <div className="container mx-auto py-6 px-4">
      <Title title="Book Slot for Counseling" />
      <section>
        <div className="mb-4">
          <NavLink
            to="/dashboard/scheduleappointments"
            className="flex items-center gap-2 underline"
          >
            <LuChevronLeft className="w-4 h-4" />
            Back to Schedule Appointments
          </NavLink>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>
              Dr. {counselor.firstname} {counselor.lastname}
            </CardTitle>
            <CardDescription className="italic">
              {counselor.counselorType}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-400">Email</h3>
              <p className="text-sm">{counselor.email}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-400">
                Contact no.
              </h3>
              <p className="text-sm">{counselor.phone}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-400">Address</h3>
              <p className="text-sm">{counselor.address}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-400">About me</h3>
              <p className="text-sm">{counselor.description}</p>
            </div>
          </CardContent>
          <CardFooter>
            <div className="flex flex-col space-y-3 w-full md:w-1/2">
              <Label className="text-brightred ">
                First select a date to view avilable slots
              </Label>
              <div className="pr-2">
                <DatePicker date={date} setDate={setDate} />
              </div>
            </div>
          </CardFooter>
        </Card>
        <div className="mb-6 mt-6">
          <h2 className="text-lg font-semibold text-darkblue ">
            All appointments on{" "}
            <span className="text-green-400">{date?.toDateString()}</span>
          </h2>
          <Separator className="mt-3" />
        </div>
        <div className="flex flex-col gap-3">
          {appLoading ? (
            <div className="space-y-3">
              <div className="flex flex-col items-start space-y-2 p-4">
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-2 w-1/2" />
                <Skeleton className="h-2 w-1/2" />
              </div>
              <div className="flex flex-col items-start space-y-2 p-4">
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-2 w-1/2" />
                <Skeleton className="h-2 w-1/2" />
              </div>
              <div className="flex flex-col items-start space-y-2 p-4">
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-2 w-1/2" />
                <Skeleton className="h-2 w-1/2" />
              </div>
            </div>
          ) : appointments.length == 0 ? (
            <h5 className="text-center text-lg lg:text-xl font-bold text-darkblue text-opacity-30 py-24">
              No appointments added yet
            </h5>
          ) : (
            appointments.map((appointment) => (
              <Card key={appointment._id}>
                <CardContent>
                  <div className="flex flex-col md:flex-row items-center justify-between  gap-4 pt-6">
                    <div className="flex  flex-col lg:flex-row items-center gap-2 lg:justify-between lg:gap-24">
                      <div className="flex gap-1">
                        <LuCalendarDays className="w-4 h-4 text-brightred" />
                        <h5 className="text-sm font-semibold text-blue-700">
                          {appointment.date}
                        </h5>
                      </div>
                      <div className="flex gap-1">
                        <LuClock className="w-4 h-4 text-brightred" />
                        <h5 className="text-sm font-semibold text-blue-700">
                          {appointment.startTime} - {appointment.endTime}
                        </h5>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="flex flex-col gap-1">
                        <h2 className="text-sm font-semibold text-darkblue opacity-50">
                          Reservation status
                        </h2>
                        <h5
                          className={`text-sm text-center font-semibold ${
                            appointment.reservationStatus !== "free"
                              ? "text-red-500"
                              : "text-green-500"
                          }`}
                        >
                          {appointment.reservationStatus.toUpperCase()}
                        </h5>
                      </div>
                      <div className="flex flex-col gap-1">
                        <h2 className="text-sm font-semibold text-darkblue opacity-50">
                          Slot status
                        </h2>
                        <h5
                          className={`text-sm text-center font-semibold ${
                            appointment.status !== "upcoming"
                              ? "text-red-500"
                              : "text-green-500"
                          }`}
                        >
                          {appointment.status.toUpperCase()}
                        </h5>
                      </div>
                    </div>
                    <div>
                      <Button
                        disabled={reserveLoading}
                        onClick={() => handleReserve(appointment._id)}
                      >
                        {reserveLoading && (
                          <LuLoader2 className="w-4 h-4 animate-spin" />
                        )}
                        Reserve
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </section>
    </div>
  );
}

export default Counselor;
