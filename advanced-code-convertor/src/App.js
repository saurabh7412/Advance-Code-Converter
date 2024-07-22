import { Navbar } from "./Components/Navbar";
import { AllRoutes } from "./Pages/AllRoutes";
import backgroundImage from "./assets/cool-background.png";
import { Toaster } from "sonner";

export default function App() {
  return (
    <div
      className="App"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        padding: "5px",
        height: "644px",
      }}
    >
      <Toaster />
      <Navbar />
      <AllRoutes />
    </div>
  );
}
