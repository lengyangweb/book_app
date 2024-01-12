import { Outlet } from "react-router-dom";
import { PrimeReactProvider } from "primereact/api";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <>
      <PrimeReactProvider>
        <ToastContainer style={{ marginTop: "3rem" }} />
        <Outlet />
      </PrimeReactProvider>
    </>
  );
};

export default App;
