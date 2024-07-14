import AppointmentEdit from "@/components/custom/AppointmentEdit";
import DatePicker from "@/components/custom/DatePicker";
import Title from "@/components/custom/Title";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import axios from "axios";
import { useEffect, useState } from "react";

type appointmentType = {
  _id: number;
  date: string;
  startTime: string;
  endTime: string;
  status: string;
  reservationStatus: string;
};
function CounseleeAppointment() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [appointments, setAppointments] = useState<appointmentType[]>([]);
  const [appLoading, setAppLoading] = useState(false);
  const [reload, setReload] = useState(0);
  useEffect(() => {
    const headers = {
      "Content-Type": "application/json",
      "auth-token": localStorage.getItem("auth-token"),
    };
    const data = {
      date: date?.toISOString(),
    };
    axios
      .post("/api/appointment/reservedappointments", data, { headers })
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
  }, [date, setDate, reload]);
  return (
    <div className="container mx-auto py-6 px-4">
      <Title title="View Appointments" />
      <section>
        <div className="flex flex-col space-y-3 w-full md:w-1/3 mb-8">
          <Label className="text-brightred ">
            Select a date to view existing appointments
          </Label>
          <div className="pr-16">
            <DatePicker date={date} setDate={setDate} />
          </div>
        </div>
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
                isActionable={false}
              />
            ))
          )}
        </div>
      </section>
    </div>
  );
}

export default CounseleeAppointment;
