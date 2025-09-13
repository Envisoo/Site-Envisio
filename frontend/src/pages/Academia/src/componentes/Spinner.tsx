/** @format */

// src/components/ui/Spinner.tsx
import React from "react";

const Spinner: React.FC = () => {
  return (
    <div className="flex justify-center items-center h-[100vh]">
      <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
};

export default Spinner;
