import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Button, NextUIProvider } from "@nextui-org/react";

function App() {

  return (
    <>
      <NextUIProvider>
        <div>
          <a href="https://vitejs.dev" target="_blank">
            <img src={viteLogo} className="logo" alt="Vite logo" />
          </a>
          <a href="https://react.dev" target="_blank">
            <img src={reactLogo} className="logo react" alt="React logo" />
          </a>
        </div>


        <h1 className="text-4xl font-bold underline">
          Hello world!
        </h1>

        <Button color="primary" variant="ghost">
          Ghost
        </Button>
      </NextUIProvider>

    </>
  )
}

export default App
