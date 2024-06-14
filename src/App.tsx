import { RouterProvider } from 'react-router-dom';

import { NextUIProvider } from "@nextui-org/react";
import { routerApp } from '@/routes/Routes';
import { AuthProvider } from '@/store/auth/AuthProvider';

function App() {

  return (
    <>
      <NextUIProvider>
        <AuthProvider>
          <RouterProvider router={routerApp} />
        </AuthProvider>
      </NextUIProvider>
    </>
  )
}

export default App
