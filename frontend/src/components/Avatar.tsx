/** @format */

import React from "react";
import { motion } from "framer-motion";
import { AvatarProps } from "../types/Avatar";

const Avatar: React.FC<AvatarProps> = ({
  name,
  role,
  bgColor = "bg-white",
  gender = "male",
}) => {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center">
      <motion.div whileHover={{ scale: 1.05 }} className="relative">
        {/* Círculo externo */}
        <div
          className={`w-40 h-40 rounded-full border-2 border-gray-200 ${bgColor} flex items-center justify-center shadow-lg`}>
          {/* Círculo interno com o ícone de usuário baseado no gênero */}
          <div className="w-36 h-36 rounded-full bg-gray-100 flex items-center justify-center">
            {gender === "female" ? (
              <svg
                className="w-24 h-24 text-gray-400"
                viewBox="0 0 24 24"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C14.21 2 16 3.79 16 6C16 8.21 14.21 10 12 10C9.79 10 8 8.21 8 6C8 3.79 9.79 2 12 2ZM12 12C16.42 12 20 13.79 20 16V18C20 18.55 19.55 19 19 19H5C4.45 19 4 18.55 4 18V16C4 13.79 7.58 12 12 12Z" />
              </svg>
            ) : (
              <svg
                className="w-24 h-24 text-gray-400"
                viewBox="0 0 24 24"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C14.21 2 16 3.79 16 6C16 8.21 14.21 10 12 10C9.79 10 8 8.21 8 6C8 3.79 9.79 2 12 2ZM12 12C16.42 12 20 13.79 20 16V18C20 18.55 19.55 19 19 19H5C4.45 19 4 18.55 4 18V16C4 13.79 7.58 12 12 12Z" />
              </svg>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Avatar;
