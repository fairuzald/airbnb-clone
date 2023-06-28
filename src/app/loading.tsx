import React from "react";
import { PuffLoader } from "react-spinners";

const Loading = () => {
  return (
    <div className="h-screen flex items-center justify-center">
      <PuffLoader size={100} color="#FF385C" />
    </div>
  );
};

export default Loading;
