import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import SideNav from "../components/SideNav";

const UserLayout = () => {
  return (
    <div className="min-h-screen  bg-black flex ">
      <div className=" "></div>
      <SideNav />
      <div className="flex-1 flex flex-col relative">
        <Navbar />
        <main className="w-full">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default UserLayout;
