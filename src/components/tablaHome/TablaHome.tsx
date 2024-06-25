import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell} from "@nextui-org/react";
export const TablaHome = () => {

  const nombre = "Mauricio Lopez";
  const horario = {
    start: "17/06/2024-8:00",
    finish: "17/06/2024-16:00",
    break: "1 hour",
  };
  const siteLocation = "Cll 1#12b-14 (Centro Mayor)";

  return (
    <div className="w-full bg-gray-200 border">
      <div className="bg-gray-200 px-4 py-4">
        <h1 className="text-2xl font-bold">
          Buen día {nombre}, el horario del día de hoy es:
        </h1>
      </div>
      <Table aria-label="Example static collection table">
      <TableHeader>
        <TableColumn>Start</TableColumn>
        <TableColumn>Finish</TableColumn>
        <TableColumn>Break</TableColumn>
      </TableHeader>
      <TableBody>
        <TableRow key="1">
          <TableCell>{horario.start}</TableCell>
          <TableCell>{horario.finish}</TableCell>
          <TableCell>{horario.break}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
      <div className="border flex">
        <div className="border px-4 py-2 w-full text-ms text-center">
          <strong>Site location:</strong> {siteLocation}
        </div>
      </div>
    </div>
  
    )
  }