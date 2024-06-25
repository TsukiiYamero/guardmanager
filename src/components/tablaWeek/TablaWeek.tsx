import React from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination } from "@nextui-org/react";

interface TableItem {
  startTime: string;
  finishTime: string;
  site: string;
}

const TablaWeek = () => {
  const [page, setPage] = React.useState(1);
  const rowsPerPage = 4;

  const items: TableItem[] = [
    { startTime: '19/06/2024 08:00', finishTime: '19/06/2024 16:00', site: 'Site 1' },
    { startTime: '20/06/2024 09:30', finishTime: '20/06/2024 17:45', site: 'Site 2' },
    { startTime: '21/06/2024 10:15', finishTime: '21/06/2024 18:30', site: 'Site 3' },
    { startTime: '22/06/2024 11:45', finishTime: '22/06/2024 19:00', site: 'Site 4' },
    { startTime: '23/06/2024 13:00', finishTime: '23/06/2024 22:30', site: 'Site 5' },
  ];

  const pages = Math.ceil(items.length / rowsPerPage);

  const paginatedItems = React.useMemo(() => {
    const startIndex = (page - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    return items.slice(startIndex, endIndex);
  }, [page, items]);

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
      <TableBody items={paginatedItems}>
        {(item: TableItem) => (
          <TableRow key={item.site}>
            <TableCell>{item.startTime}</TableCell>
            <TableCell>{item.finishTime}</TableCell>
            <TableCell>{item.site}</TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default TablaWeek;
