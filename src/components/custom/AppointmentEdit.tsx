import { Card, CardContent } from "@/components/ui/card";
import { Button } from "../ui/button";
import { LuClock, LuCalendarDays, LuLoader2 } from "react-icons/lu";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import axios from "axios";
import Notify from "@/helpers/Notify";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import GenerateTimeArray from "@/helpers/GenerateTimeArray";
import ConvertToDateTime from "@/helpers/ConvertToDateTime";

interface appointmentType {
  _id: number;
  date: string;
  startTime: string;
  endTime: string;
  status: string;
  reservationStatus: string;
}

interface AppointmentEditProps {
  appointment: appointmentType;
  setReload: Dispatch<SetStateAction<number>>;
  isActionable: boolean;
}

type timeType = {
  hh: string;
  mm: string;
};

function AppointmentEdit({
  appointment,
  setReload,
  isActionable,
}: AppointmentEditProps) {
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [editLoading, setEditLoading] = useState(false);
  const [endHourArray, setEndHourArray] = useState<string[]>([]);
  const [hourArray, setHourArray] = useState<string[]>([]);
  const [minArray, setMinArray] = useState<string[]>([]);
  const [startTime, setStartTime] = useState<timeType>({
    hh: "",
    mm: "",
  });
  const [endTime, setEndTime] = useState<timeType>({
    hh: "",
    mm: "",
  });

  const [open, setOpen] = useState(false);
  useEffect(() => {
    const { hourArray, minArray } = GenerateTimeArray();
    setHourArray(hourArray);
    setMinArray(minArray);
    setEndHourArray(hourArray);
  }, []);

  const handleDelete = () => {
    const headers = {
      "Content-Type": "application/json",
      "auth-token": localStorage.getItem("auth-token"),
    };
    setDeleteLoading(true);
    axios
      .delete(`/api/appointment/deleteappointment/${appointment._id}`, {
        headers,
      })
      .then((res) => {
        if (res.status == 200) {
          setDeleteLoading(false);
          Notify("success", res.data.resMsg);
          setReload((prev) => prev + 1);
        }
      })
      .catch((err) => {
        console.log(err);
        setDeleteLoading(false);
        Notify("error", err.response.data.resMsg);
      });
  };

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

  const handleEditAppointment = () => {
    const headers = {
      "Content-Type": "application/json",
      "auth-token": localStorage.getItem("auth-token"),
    };

    if (!startTime.hh || !startTime.mm) {
      Notify("error", "Please select a start time");
      return;
    }

    if (!endTime.hh || !endTime.mm) {
      Notify("error", "Please select a end time");
      return;
    }

    const data = {
      date: new Date(appointment.date).toISOString(),
      startTime: ConvertToDateTime(startTime),
      endTime: ConvertToDateTime(endTime),
    };

    console.log(data);
    setEditLoading(true);
    axios
      .patch(`/api/appointment/editappointment/${appointment._id}`, data, {
        headers,
      })
      .then((res) => {
        console.log(res);
        if (res.status == 200) {
          setEditLoading(false);
          Notify("success", res.data.resMsg);
          setReload((prev) => prev + 1);
          setOpen(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setEditLoading(false);
        Notify("error", err.response.data.resMsg);
        // setOpen(false);
      });
  };
  return (
    <Card>
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
          {isActionable &&
            (appointment.status == "upcoming" ||
              appointment.reservationStatus == "free") && (
              <div className="flex flex-row lg:flex-col items-center justify-between md:justify-normal gap-2">
                <Dialog open={open} onOpenChange={setOpen}>
                  <DialogTrigger asChild>
                    <Button size="sm" className="w-32 md:w-24">
                      Edit
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Edit slot</DialogTitle>
                      <DialogDescription>
                        Make changes to slot time here. Click save when you're
                        done.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="flex items-center justify-center py-2 rounded-full text-sm bg-amber-400 opacity-60 font-semibold text-opacity-40">
                        <LuClock className="w-4 h-4 text-darkblue mr-2" />
                        {appointment.startTime} - {appointment.endTime}
                      </div>
                      <div className="flex flex-col space-y-3 w-full">
                        <Label htmlFor="user">Start time</Label>
                        <div className="flex items-center justify-center gap-2">
                          <Select
                            onValueChange={(val) => handleEndHourChange(val)}
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
                    <DialogFooter>
                      <div className="flex flex-col gap-2">
                        <Button
                          className="bg-green-500 hover:bg-green-300"
                          onClick={handleEditAppointment}
                        >
                          {editLoading && (
                            <LuLoader2 className="w-4 h-4 text-white mr-3 animate-spin" />
                          )}
                          Edit Appointment
                        </Button>
                      </div>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>

                <Button
                  disabled={deleteLoading}
                  size="sm"
                  variant="destructive"
                  className="w-32 md:w-24"
                  onClick={handleDelete}
                >
                  {deleteLoading && (
                    <LuLoader2 className="w-4 h-4 animate-spin mr-3" />
                  )}
                  Delete
                </Button>
              </div>
            )}
        </div>
      </CardContent>
    </Card>
  );
}

export default AppointmentEdit;
