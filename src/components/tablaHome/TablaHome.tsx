import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/react";
import { IScheduleItem } from "@/types/schedules.types";
import { getOneSchedule } from "@/services/schedule.service";
import { format } from 'date-fns';
import React, { useEffect } from "react";

const parseDateTime = (dateTimeString: string): Date => {
  const [dateString, timeString] = dateTimeString?.split(' ');

  const date = new Date(dateString);
  date.setDate(date.getDate()+1);

  if (timeString) {
    const [hours, minutes, seconds] = timeString?.split(':');
    date.setHours(parseInt(hours, 10));
    date.setMinutes(parseInt(minutes, 10));
    date.setSeconds(parseInt(seconds, 10));
  }
  return date;
};

const formatDateTime = (dateTimeString: string): string => {
  const date = parseDateTime(dateTimeString);
  return format(date, "yyyy-MM-dd HH:mm:ss");
};

export const TablaHome = () => {
  const [schedules, setSchedules] = React.useState<Array<IScheduleItem> | null>(null);

  useEffect(() => {
    const guard = JSON.parse(window.localStorage.getItem("authUser")!);
    const guard_id = guard.id;
    getOneSchedule(guard_id).then(data => {
      setSchedules(data);
    });
  }, []);

  return (
    <div className="w-full bg-gray-200 border">
      <div className="bg-gray-200 px-4 py-4">
        <h1 className="text-2xl font-bold">
          Buen día {schedules && schedules.length > 0 ? schedules[0].name : "usuario"}, el próximo horario es:
        </h1>
      </div>
      {schedules && schedules.length > 0 ? (
        <Table aria-label="Horario del día">
          <TableHeader>
            <TableColumn>Start</TableColumn>
            <TableColumn>Finish</TableColumn>
            <TableColumn>Break</TableColumn>
          </TableHeader>
          <TableBody>
            <TableRow key="1">
              <TableCell>{formatDateTime(schedules[0].start)}</TableCell>
              <TableCell>{formatDateTime(schedules[0].end)}</TableCell>
              <TableCell>{"1 hour"}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      ) : (
        <div className="px-4 py-2 text-center text-red-600">
          No tiene horario para el dia de hoy
        </div>
      )}
      <div className="border flex">
        <div className="border px-4 py-2 w-full text-ms text-center">
          <strong>Site location:</strong> {schedules && schedules.length > 0 ? schedules[0].location : ""}
        </div>
      </div>
    </div>
  );
};
