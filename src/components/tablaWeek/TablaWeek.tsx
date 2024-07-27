import React, { useEffect } from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination } from "@nextui-org/react";
import { IScheduleItem } from "@/types/schedules.types";
import { getSchedulesByGuardId } from "@/services/schedule.service";
import { format } from 'date-fns';

const parseDateTime = (dateTimeString: string): Date => {
  const [dateString, timeString] = dateTimeString.split(' ');
  const date = new Date(dateString);
  date.setDate(date.getDate()+1)
  if (timeString) {
    const [hours, minutes, seconds] = timeString.split(':');
    date.setHours(parseInt(hours, 10));
    date.setMinutes(parseInt(minutes, 10));
    date.setSeconds(parseInt(seconds, 10));
  }

  return date;
};

const formatDateTime = (dateTimeString: string): string => {
  const date = parseDateTime(dateTimeString);
  return format(date, "yyyy-MM-dd HH:mm:ss"); // Cambia el formato si necesitas algo diferente
};

const TablaWeek = () => {
  const [page, setPage] = React.useState(1);
  const rowsPerPage = 4;
  const [shedules, setShedules] = React.useState<Array <IScheduleItem>>([]);

  useEffect( () => {
    const guard = JSON.parse(window.localStorage.getItem("authUser")!);
    const guard_id = guard.id;
    getSchedulesByGuardId(guard_id).then(data => {
      setShedules(data)
    })
  },[])

  const pages = Math.ceil(shedules.length / rowsPerPage);

  const paginatedItems = React.useMemo(() => {
    const startIndex = (page - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    return shedules.slice(startIndex, endIndex);
  }, [page, shedules]);

  return (
    <Table
      aria-label="Example table with client side pagination"
      bottomContent={
        <div className="flex w-full justify-center">
          <Pagination
            isCompact
            showControls
            showShadow
            color="secondary"
            page={page}
            total={pages}
            onChange={(page) => setPage(page)}
          />
        </div>
      }
      classNames={{
        wrapper: "min-h-[222px]",
      }}
    >
      <TableHeader>
        <TableColumn key="startTime">Start Time</TableColumn>
        <TableColumn key="finishTime">Finish Time</TableColumn>
        <TableColumn key="site">Site</TableColumn>
      </TableHeader>
      <TableBody items={paginatedItems || []}>
        {(item: IScheduleItem) => (
          <TableRow key={item?.id}>
            <TableCell>{formatDateTime(item?.start)}</TableCell>
            <TableCell>{formatDateTime(item?.end)}</TableCell>
            <TableCell>{item?.location}</TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default TablaWeek;
