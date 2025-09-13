/** @format */

import React from "react";

type PrinterSelectorProps = {
  selectedPrinter: string;
  onSelectPrinter: (printer: string) => void;
};

const PrinterSelector: React.FC<PrinterSelectorProps> = ({
  selectedPrinter,
  onSelectPrinter,
}) => {
  return (
    <div className="border-b border-gray-200">
      <nav className="flex space-x-1 px-4" aria-label="Modelos de Impressora">
        <button
          onClick={() => onSelectPrinter("bizhub301i")}
          className={`py-2 px-3 text-sm font-medium transition-colors focus:outline-none ${
            selectedPrinter === "bizhub301i"
              ? "text-red-600 border-b-2 border-red-500"
              : "text-gray-500 hover:text-gray-700"
          }`}>
          BIZHUB 301i
        </button>
        <div className="border-l border-gray-300 h-6 my-auto"></div>
        <button
          onClick={() => onSelectPrinter("bizhub251i")}
          className={`py-2 px-3 text-sm font-medium transition-colors focus:outline-none ${
            selectedPrinter === "bizhub251i"
              ? "text-red-600 border-b-2 border-red-500"
              : "text-gray-500 hover:text-gray-700"
          }`}>
          BIZHUB 251i
        </button>
      </nav>
    </div>
  );
};

export default PrinterSelector;
