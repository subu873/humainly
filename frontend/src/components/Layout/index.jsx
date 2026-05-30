import Sidebar from "../Sidebar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="flex h-screen bg-[#121312]">
      <Sidebar />
      <div className="w-full flex-1 overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
