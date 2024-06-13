import { RouterProvider } from 'react-router-dom';

import { NextUIProvider } from "@nextui-org/react";
import { routerApp } from '@/routes/Routes';

function App() {

  return (
    <>
      <NextUIProvider>
        <RouterProvider router={routerApp} />
      </NextUIProvider>
    </>
  )
}

export default App
