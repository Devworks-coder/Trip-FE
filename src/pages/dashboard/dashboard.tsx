import React from "react";
import { Outlet } from "react-router-dom";
import NavigationMenu from "../../components/bottom-navigation/navigation";

const Dashboard = () => {
  return (
    <div className="p-2">
      <Outlet />
      <NavigationMenu />
    </div>
  );
};

export default Dashboard;
