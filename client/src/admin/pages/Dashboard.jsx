import React, { useState } from "react";
import { LuUsers } from "react-icons/lu";
import { FaCalendarAlt, FaRegNewspaper, FaListAlt } from "react-icons/fa";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { monthlyData, weeklyData, yearlyData } from "../utils/data";
const Dashboard = ({ darkMode }) => {
  const [timeFrame, setTimeFrame] = useState("weekly");
  const data =
    timeFrame === "weekly"
      ? weeklyData
      : timeFrame === "monthly"
      ? monthlyData
      : yearlyData;

  return (
    <div
      className={`py-3 px-8     ${
        darkMode ? "bg-gray-900 text-gray-300" : "bg-white text-gray-800"
      }`}
    >
      <div className="flex gap-10 items-center my-6">
        <div className="border rounded-lg cursor-pointer flex flex-col items-center px-2 py-4  border-stone-400 w-[200px] h-[90px]">
          <div className=" flex gap-2 items-center text-gray-600">
            <LuUsers className="text-xl" /> <span>Total customers</span>
          </div>
          <h1 className="font-extrabold text-xl">50,000</h1>
        </div>
        <div className="border rounded-lg cursor-pointer flex flex-col items-center px-2 py-4  border-stone-400 w-[200px] h-[90px]">
          <div className=" flex gap-2 items-center text-gray-600">
            <FaCalendarAlt className="text-xl" /> <span>Total Appointment</span>
          </div>
          <h1 className="font-extrabold text-xl">1,000</h1>
        </div>
        <div className="border rounded-lg cursor-pointer flex flex-col items-center px-2 py-4  border-stone-400 w-[200px] h-[90px]">
          <div className=" flex gap-2 items-center text-gray-600">
            <FaRegNewspaper className="text-xl" /> <span>Total blogs</span>
          </div>
          <h1 className="font-extrabold text-xl">500</h1>
        </div>
        <div className="border rounded-lg cursor-pointer flex flex-col items-center px-2 py-4  border-stone-400 w-[200px] h-[90px]">
          <div className=" flex gap-2 items-center text-gray-600">
            <FaListAlt className="text-xl" /> <span>Total listing</span>
          </div>
          <h1 className="font-extrabold text-xl">120</h1>
        </div>
      </div>

      <div className="flex my-7">
        <div className="border border-stone-400 w-full h-[300px]  p-5">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-lg font-semibold">Site Visits</h2>
            <select
              className="border p-1 rounded outline-none"
              value={timeFrame}
              onChange={(e) => setTimeFrame(e.target.value)}
            >
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
              <option value="yearly">Yearly</option>
            </select>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={data}>
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar
                dataKey="external"
                barSize={20}
                fill="#e60099"
                name="External Views"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="flex justify-evenly gap-6">
        <div className="border border-stone-400 w-full h-[250px]"></div>
        <div className="border border-stone-400 w-full h-[250px]"></div>
      </div>
    </div>
  );
};

export default Dashboard;
