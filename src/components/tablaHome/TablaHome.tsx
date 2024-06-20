export const TablaHome = () => {

    return (
  
      <table className="table-auto border-collapse w-full">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-4 py-2" colSpan={4}>
              <h1 className="text-xl font-bold">Horario asignado para la fecha es</h1>
            </th>
          </tr>
          <tr className="bg-gray-200">
            <th className="border px-4 py-2" colSpan={2}>Guards</th>
            <th className="border px-4 py-2" colSpan={2}>Shift</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border px-4 py-2" rowSpan={3}><strong>Nombre:</strong></td>
            <td className="border px-4 py-2 text-center" rowSpan={3}>{'Mauricio Hernandez'}</td>
            <td className="border px-4 py-2"><strong>Start:</strong></td>
            <td className="border px-4 py-2 text-center">{'17/06/2024-8:00'}</td>
          </tr>
          <tr>
            <td className="border px-4 py-2"><strong>Finish:</strong></td>
            <td className="border px-4 py-2 text-center">{'17/06/2024-16:00'}</td>
          </tr>
          <tr>
            <td className="border px-4 py-2"><strong>Break:</strong></td>
            <td className="border px-4 py-2 text-center">{'1 hour'}</td>
          </tr>
  
          <tr>
            <td className="border px-4 py-2"><strong>Site location:</strong></td>
            <td className="border px-4 py-2 text-center" colSpan={3}>{'Cll 1#12b-14 (Centro Mayor)'}</td>
          </tr>
        </tbody>
      </table>
  
    )
  }