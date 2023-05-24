import './App.scss';
import { Toast } from 'primereact/toast';
import { BlockUI } from 'primereact/blockui';
import { Outlet } from 'react-router-dom';
import { createContext, useRef, useState } from "react";

export const PrimeContext = createContext<any>(null);

function App() {
  const toast = useRef<Toast>(null);
  const [blocked, setBlocked] = useState(false);

  const showToast = (severity: "success" | "info" | "warn" | "error" | undefined, summary: string, detail: string) => {
    toast.current?.show({ severity, summary, detail });
  };

  return (
    <div className="App">
      <Toast ref={toast} />
      <PrimeContext.Provider value={{ showToast, setBlocked }}>
        <BlockUI blocked={blocked}>
          <Outlet/>
        </BlockUI>
      </PrimeContext.Provider>
    </div>
  )
}
export default App;