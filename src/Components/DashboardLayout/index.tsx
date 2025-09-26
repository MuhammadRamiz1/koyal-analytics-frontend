"use client";

import { useState } from "react";
import { HiChartPie, HiMenu, HiMusicNote, HiUserGroup } from "react-icons/hi";

type DashboardLayoutProps = {
  children: React.ReactNode;
};

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="flex h-screen bg-black text-pink-100">
      <aside
        className={`${
          isCollapsed ? "w-16" : "w-64"
        } transition-all duration-300 border-r border-pink-900/40 bg-[#0b0b0f] relative`}
      >
        <div className="flex items-center justify-between px-3 py-4 border-b border-pink-900/40">
          <div
            className={`flex items-center gap-2 ${
              isCollapsed ? "opacity-0 pointer-events-none" : ""
            }`}
          >
            <div className="h-8 w-8 rounded bg-pink-600" />
            <span className="font-semibold tracking-wide">Koyal Analytics</span>
          </div>
        
        </div>

        <nav className="py-3">
          <SidebarItem
            icon={<HiChartPie />}
            label="Dashboard"
            collapsed={isCollapsed}
          />
          {/* <SidebarItem
            icon={<HiMusicNote />}
            label="Streaming"
            collapsed={isCollapsed}
          />
          <SidebarItem
            icon={<HiUserGroup />}
            label="Listeners"
            collapsed={isCollapsed}
          /> */}
        </nav>

          <button
            aria-label="Toggle sidebar"
            onClick={() => setIsCollapsed((v) => !v)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-[var(--pink)] bg-black/40 text-pink-200 hover:bg-pink-600/20 hover:text-pink-100 absolute bottom-6 left-[50%] translate-x-[-50%] cursor-pointer"
          >
            <HiMenu />
          </button>
      </aside>

      <main className="flex-1 min-w-0 bg-gradient-to-b from-black to-[#0b0b0f] h-[inherit] overflow-y-auto">
        <div className=" px-8 py-4 panel ">
          <h1
            className="text-[32px] text-bold
          "
          >
            Dashboard
          </h1>
        </div>
        {children}
      </main>
    </div>
  );
}

type ItemProps = {
  icon: React.ReactNode;
  label: string;
  collapsed?: boolean;
};

function SidebarItem({ icon, label, collapsed }: ItemProps) {
  return (
    <a
      href="#"
      className="group flex items-center gap-3 px-3 py-2 mx-2 rounded-md text-pink-200 hover:text-pink-50 hover:bg-pink-600/15 transition-colors"
    >
      <span className="text-xl text-pink-400 group-hover:text-pink-300">
        {icon}
      </span>
      <span
        className={`${
          collapsed ? "opacity-0 w-0" : "opacity-100"
        } transition-all whitespace-nowrap`}
      >
        {label}
      </span>
    </a>
  );
}
