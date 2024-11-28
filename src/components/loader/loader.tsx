import { Loader } from "lucide-react";
import React from "react";

const AppLoader = () => {
  return (
    <div className="h-screen w-full flex justify-center items-center">
      <Loader size={30} className="animate-spin" />
    </div>
  );
};

export default AppLoader;
