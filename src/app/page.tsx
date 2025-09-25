"use client";
"eslint-disable"
import DashboardLayout from "@/Components/DashboardLayout";
import axios from "axios";
import dynamic from "next/dynamic";
import { useEffect, useMemo } from "react";
import { baseURL } from "@/config/api";

const getStats = async () => {
  const res = await axios.get(baseURL("stats"));
  console.log(res?.data);
};

export default function Home() {
  useEffect(() => {
    getStats();
  }, []);

  return (
    <DashboardLayout>
      <section className="px-6 py-6">
        <h1 className="text-2xl md:text-3xl font-semibold heading">
          Music Streaming Analytics
        </h1>
        <p className="mt-1 text-sm subtle">
          Real-time insights • Black & Pink theme
        </p>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
          <FilterCard label="Start date" type="date" />
          <FilterCard label="End date" type="date" />
          <FilterCard
            label="Select Operator"
            type="select"
            options={["All", "Jazz", "Ufone", "Telenor", "Zong", "Warid"]}
          />
          <FilterCard
            label="User Type"
            type="select"
            options={["All", "Guest", "Paid"]}
          />
        </div>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard title="Total Traffic (count)" value="125.6k" delta="+28%" />
          <StatCard title="New Users (count)" value="42.5k" delta="+21%" />
          <StatCard
            title="Returning Users (count)"
            value="83.1k"
            delta="+23%"
          />
          <StatCard title="Total Logins (count)" value="215.7k" delta="+25%" />
        </div>

        <ChartsRow />

        <SecondaryCharts />
      </section>
    </DashboardLayout>
  );
}

function StatCard({
  title,
  value,
  delta,
  negative,
}: {
  title: string;
  value: string;
  delta: string;
  negative?: boolean;
}) {
  return (
    <div className="panel p-4">
      <p className="text-xs subtle">{title}</p>
      <div className="mt-2 flex items-baseline justify-between">
        <span className="text-2xl font-semibold text-pink-200">{value}</span>
        <span
          className={`text-xs ${negative ? "text-pink-400" : "text-green-400"}`}
        >
          {delta}
        </span>
      </div>
    </div>
  );
}

const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

function ChartsRow() {
  const lineOptions = useMemo(
    () => ({
      chart: {
        toolbar: { show: false },
        background: "transparent",
        foreColor: "#ffd7ea",
      },
      stroke: { curve: "smooth", width: 3 },
      colors: ["#ec297b"],
      fill: {
        type: "gradient",
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.5,
          opacityTo: 0.1,
          stops: [0, 90, 100],
        },
      },
      grid: { borderColor: "rgba(236,41,123,0.15)" },
      xaxis: {
        categories: [
          "Jun 1",
          "Jun 5",
          "Jun 9",
          "Jun 13",
          "Jun 20",
          "Jul 5",
          "Jul 15",
        ],
      },
      yaxis: { labels: { style: { colors: "#f9a8d4" } } },
    }),
    []
  );
  const lineSeries = [
    { name: "Listening Time", data: [45, 52, 49, 55, 62, 59, 66] },
  ];

  const barOptions = useMemo(
    () => ({
      chart: {
        toolbar: { show: false },
        background: "transparent",
        foreColor: "#ffd7ea",
      },
      plotOptions: { bar: { columnWidth: "40%", borderRadius: 6 } },
      colors: ["#ec297b", "#8b5cf6"],
      grid: { borderColor: "rgba(236,41,123,0.15)" },
      xaxis: {
        categories: ["Urdu", "English", "Punjabi", "Sindhi", "Balochi"],
      },
      legend: { labels: { colors: "#f9a8d4" } },
    }),
    []
  );
  const barSeries = [
    { name: "Audio Views", data: [12, 10, 11, 9, 8] },
    { name: "Video Views", data: [8, 9, 7, 6, 6] },
  ];

  return (
    <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-4">
      <div className="panel p-4 col-span-2">
        <div className="flex items-center justify-between">
          <h2 className="text-lg heading">Listening Time Per User</h2>
          <span className="text-xs subtle">Weekly</span>
        </div>
        <div className="mt-4">
          <ApexChart
            options={lineOptions as any}
            series={lineSeries as any}
            type="area"
            height={260}
          />
        </div>
      </div>
      <div className="panel p-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg heading">Content Views Analysis</h2>
          <span className="text-xs subtle">Audio vs Video</span>
        </div>
        <div className="mt-4">
          <ApexChart
            options={barOptions as any}
            series={barSeries as any}
            type="bar"
            height={260}
          />
        </div>
      </div>
    </div>
  );
}

function GenreRow({ label, value }: { label: string; value: number }) {
  return (
    <li className="">
      <div className="flex items-center justify-between text-sm text-pink-100">
        <span>{label}</span>
        <span className="text-pink-300">{value}%</span>
      </div>
      <div className="mt-2 h-2 w-full rounded bg-pink-900/40">
        <div
          className="h-2 rounded bg-pink-500"
          style={{ width: `${value}%` }}
        />
      </div>
    </li>
  );
}

function FilterCard({
  label,
  type,
  options,
}: {
  label: string;
  type: "date" | "select";
  options?: string[];
}) {
  return (
    <div className="panel p-4">
      <p className="text-xs subtle mb-2">{label}</p>
      {type === "date" ? (
        <input type="date" className="input px-3 py-2 w-full" />
      ) : (
        <select className="input px-3 py-2 w-full bg-black/40">
          {options?.map((o) => (
            <option key={o}>{o}</option>
          ))}
        </select>
      )}
    </div>
  );
}

function SecondaryCharts() {
  const areaOptions = useMemo(
    () => ({
      chart: {
        toolbar: { show: false },
        background: "transparent",
        foreColor: "#ffd7ea",
      },
      stroke: { curve: "smooth", width: 3 },
      colors: ["#ec297b"],
      fill: {
        type: "gradient",
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.5,
          opacityTo: 0.1,
          stops: [0, 90, 100],
        },
      },
      grid: { borderColor: "rgba(236,41,123,0.15)" },
      xaxis: {
        categories: [
          "Jun 1",
          "Jun 5",
          "Jun 9",
          "Jun 13",
          "Jul 1",
          "Jul 8",
          "Jul 15",
        ],
      },
    }),
    []
  );
  const areaSeries = [{ name: "Clicks", data: [3, 4, 3.5, 4.5, 5, 4.2, 5.1] }];
  return (
    <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-4">
      <div className="panel p-4">
        <h2 className="text-lg heading">Download App Clicks</h2>
        <div className="mt-4">
          <ApexChart
            options={areaOptions as any}
            series={areaSeries as any}
            type="area"
            height={260}
          />
        </div>
      </div>
      <div className="panel p-4">
        <h2 className="text-lg heading">Top Pages Visited</h2>
        <ul className="mt-4 space-y-3">
          <GenreRow label="Artist Page" value={35} />
          <GenreRow label="Track Details" value={28} />
          <GenreRow label="Genre Page" value={22} />
          <GenreRow label="Playlist" value={15} />
        </ul>
      </div>
    </div>
  );
}
