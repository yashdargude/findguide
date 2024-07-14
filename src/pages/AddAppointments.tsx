import AppointmentEdit from "@/components/custom/AppointmentEdit";
import DatePicker from "@/components/custom/DatePicker";
import Title from "@/components/custom/Title";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import ConvertToDateTime from "@/helpers/ConvertToDateTime";
import GenerateTimeArray from "@/helpers/GenerateTimeArray";
import Notify from "@/helpers/Notify";
import axios from "axios";
import { useEffect, useState } from "react";
import { LuLoader2 } from "react-icons/lu";

type timeType = {
  hh: string;
  mm: string;
};

type appointmentType = {
  _id: number;
  date: string;
  startTime: string;
  endTime: string;
  status: string;
  reservationStatus: string;
};

function AddAppointments() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [endHourArray, setEndHourArray] = useState<string[]>([]);
  const [hourArray, setHourArray] = useState<string[]>([]);
  const [minArray, setMinArray] = useState<string[]>([]);
  const [isAvailable, setIsAvailable] = useState(false);
  const [startTime, setStartTime] = useState<timeType>({
    hh: "",
    mm: "",
  });
  const [endTime, setEndTime] = useState<timeType>({
    hh: "",
    mm: "",
  });
  const [reload, setReload] = useState(0);
  const [appointments, setAppointments] = useState<appointmentType[]>([]);
  const [avLoading, setAvloading] = useState(false);
  const [addLoading, setAddLoading] = useState(false);
  const [appLoading, setAppLoading] = useState(false);

  useEffect(() => {
    const { hourArray, minArray } = GenerateTimeArray();
    setHourArray(hourArray);
    setMinArray(minArray);
    setEndHourArray(hourArray);
  }, []);

  useEffect(() => {
    const headers = {
      "Content-Type": "application/json",
      "auth-token": localStorage.getItem("auth-token"),
    };
    const data = {
      date: date?.toISOString(),
    };

    console.log(data);
    setAppLoading(true);
    axios
      .post(`/api/appointment/getappointmentsbydate`, data, {
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
  }, [setDate, date, reload, setReload]);

  const handleEndHourChange = (value: string) => {
    setStartTime({
      hh: value,
      mm: "",
    });
    const startIndex = hourArray.indexOf(value);
    const filteredHourArray = hourArray.filter(
      (_, index) => index >= startIndex
    );

    setEndHourArray(filteredHourArray);
  };

  const handleCheckAvailibility = () => {
    const headers = {
      "Content-Type": "application/json",
      "auth-token": localStorage.getItem("auth-token"),
    };

    if (!date) {
      Notify("error", "Please select a date");
      return;
    }

    if (!startTime.hh || !startTime.mm) {
      Notify("error", "Please select a start time");
      return;
    }

    if (!endTime.hh || !endTime.mm) {
      Notify("error", "Please select a end time");
      return;
    }

    const data = {
      date: date?.toISOString(),
      startTime: ConvertToDateTime(startTime),
      endTime: ConvertToDateTime(endTime),
    };

    console.log(data);
    setAvloading(true);
    axios
      .post("/api/appointment/checkslotavailibility", data, { headers })
      .then((res) => {
        console.log(res);
        if (res.status == 200) {
          setAvloading(false);
          if (res.data?.resData.available) {
            Notify("success", res.data?.resMsg);
            setIsAvailable(true);
          } else {
            Notify("error", res.data?.resMsg);
            setIsAvailable(false);
          }
        }
      })
      .catch((err) => {
        console.log(err);
        setAvloading(false);
        Notify("error", err.response.data.resMsg);
      });
  };

  const handleAddAppointment = () => {
    const headers = {
      "Content-Type": "application/json",
      "auth-token": localStorage.getItem("auth-token"),
    };

    if (!date) {
      Notify("error", "Please select a date");
      return;
    }

    if (!startTime.hh || !startTime.mm) {
      Notify("error", "Please select a start time");
      return;
    }

    if (!endTime.hh || !endTime.mm) {
      Notify("error", "Please select a end time");
      return;
    }

    if (!isAvailable) {
      Notify("error", "Please check availibility");
      return;
    }

    const data = {
      date: date?.toISOString(),
      startTime: ConvertToDateTime(startTime),
      endTime: ConvertToDateTime(endTime),
    };

    console.log(data);
    setAddLoading(true);
    axios
      .post("/api/appointment/addappointment", data, { headers })
      .then((res) => {
        console.log(res);
        if (res.status == 201) {
          setAddLoading(false);
          Notify("success", res.data.resMsg);
          setReload(reload + 1);
          setIsAvailable(false);
          setStartTime({
            hh: "",
            mm: "",
          });
          setEndTime({
            hh: "",
            mm: "",
          });
        }
      })
      .catch((err) => {
        console.log(err);
        setAddLoading(false);
        Notify("error", "Unable to add appointment");
      });
  };

  return (
    <div className="container mx-auto py-6 px-4">
      <Title title="Add Appointments" />
      <section className="mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Create appointment</CardTitle>
            <CardDescription></CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col space-y-3 w-full md:w-1/2 mb-8">
              <Label className="text-brightred ">
                First select a date to view already existing appointments
              </Label>
              <div className="pr-2">
                <DatePicker date={date} setDate={setDate} />
              </div>
            </div>
            <Separator className="mb-6" />
            <h5 className=" text-xl font-semibold text-gray-400 mb-6">
              Enter Slot details
            </h5>
            <div className="flex flex-col md:flex-row items-center w-full gap-4  md:gap-24">
              <div className="flex flex-col space-y-3 w-full">
                <Label htmlFor="user">Start time</Label>
                <div className="flex items-center justify-center gap-2">
                  <Select
                    onValueChange={(val) => handleEndHourChange(val)}
                    disabled={!date ? true : false}
                  >
                    <SelectTrigger id="user">
                      <SelectValue placeholder="Hour" />
                    </SelectTrigger>
                    <SelectContent position="popper">
                      <SelectGroup>
                        <SelectLabel>Hours</SelectLabel>
                        {hourArray.map((hour) => {
                          return (
                            <SelectItem key={hour} value={hour}>
                              {hour}
                            </SelectItem>
                          );
                        })}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <Select
                    onValueChange={(val) =>
                      setStartTime((prev) => ({ ...prev, mm: val }))
                    }
                    disabled={!date ? true : false}
                  >
                    <SelectTrigger id="user">
                      <SelectValue placeholder="Minutes" />
                    </SelectTrigger>
                    <SelectContent position="popper">
                      <SelectGroup>
                        <SelectLabel>Minutes</SelectLabel>
                        {minArray.map((min) => {
                          return (
                            <SelectItem key={min} value={min}>
                              {min}
                            </SelectItem>
                          );
                        })}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex flex-col space-y-3 w-full">
                <Label htmlFor="user">End time</Label>
                <div className="flex items-center justify-center gap-2">
                  <Select
                    onValueChange={(val) =>
                      setEndTime((prev) => ({ ...prev, hh: val }))
                    }
                    disabled={!date ? true : false}
                  >
                    <SelectTrigger id="user">
                      <SelectValue placeholder="Hour" />
                    </SelectTrigger>
                    <SelectContent position="popper">
                      <SelectGroup>
                        <SelectLabel>Hours</SelectLabel>
                        {endHourArray.map((hour) => {
                          return (
                            <SelectItem key={hour} value={hour}>
                              {hour}
                            </SelectItem>
                          );
                        })}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <Select
                    onValueChange={(val) =>
                      setEndTime((prev) => ({ ...prev, mm: val }))
                    }
                    disabled={!date ? true : false}
                  >
                    <SelectTrigger id="user">
                      <SelectValue placeholder="Minutes" />
                    </SelectTrigger>
                    <SelectContent position="popper">
                      <SelectGroup>
                        <SelectLabel>Minutes</SelectLabel>
                        {minArray.map((min) => {
                          return (
                            <SelectItem key={min} value={min}>
                              {min}
                            </SelectItem>
                          );
                        })}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <div className="flex flex-col gap-2">
              <Button onClick={handleCheckAvailibility}>
                {avLoading && (
                  <LuLoader2 className="w-4 h-4 text-white mr-3 animate-spin" />
                )}
                Check Availibility
              </Button>
              {isAvailable && (
                <Button
                  className="bg-green-500 hover:bg-green-300"
                  onClick={handleAddAppointment}
                >
                  {addLoading && (
                    <LuLoader2 className="w-4 h-4 text-white mr-3 animate-spin" />
                  )}
                  Add Appointment
                </Button>
              )}
            </div>
          </CardFooter>
        </Card>
      </section>
      <section>
        <div className="mb-6">
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
              <AppointmentEdit
                appointment={appointment}
                key={appointment._id}
                setReload={setReload}
                isActionable={true}
              />
            ))
          )}
        </div>
      </section>
    </div>
  );
}

export default AddAppointments;
