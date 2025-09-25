"use client";

import DashboardLayout from "@/Components/DashboardLayout";
import { baseURL } from "@/config/api";
import axios from "axios";
import { useEffect, useState } from "react";

// type User = {
//   id: number;
//   name: string;
//   email: string;
//   country: string;
//   status: "Active" | "Paused";
// };

export default function UsersPage() {
  const [page, setPage] = useState(1);
  const [data, setData] = useState<{
    totalPages: number;
    data: any[];
    page: number;
    limit: number;
    total: number;
  } | null>({ totalPages: 1, data: [], page: 1, total: 1, limit: 10 });

  const pageSize = 10;

  const totalPages: number = data?.totalPages ?? 1;
  const start = (page - 1) * pageSize;

  function goto(p: number) {
    if (p < 1 || p > totalPages) return;
    setPage(p);
  }

  const getUsers = async () => {
    const res = await axios.get(baseURL("users"));
    console.log(res?.data, "res");
    setData(res?.data);
  };

  console.log(data?.data, "aaa");
  useEffect(() => {
    getUsers();
  }, []);

  return (
    <DashboardLayout>
      <section className="px-6 py-6">
        <h1 className="text-2xl font-semibold heading">Users</h1>
        <p className="mt-1 text-sm subtle">
          All users with client-side pagination
        </p>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Stat
            title="Total Users"
            value={data?.total?.toString()}
            hint="All time"
          />
          <Stat
            title="Total Subscribers"
            value={(
            10
            ).toString()}
            hint="Active"
          />
          <Stat
            title="New Subscribers (Last Month)"
            value={"1,240"}
            hint="+8%"
          />
        </div>

        <div className="mt-6 panel overflow-hidden border-[1px] !border-solid !border-pink-600">
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-pink-100 ">
              <thead>
                <tr className="bg-[rgba(236,41,123,0.08)] text-pink-200">
                  <Th>#</Th>
                  <Th>Name</Th>
                  <Th>Gender</Th>
                  <Th>Number</Th>
                  <Th>User Name</Th>
                  <Th>Status</Th>
                </tr>
              </thead>
              <tbody>
                {data?.data?.map((u, i) => (
                  <tr
                    key={u.id}
                    className="border-t border-pink-900/40 hover:bg-[rgba(236,41,123,0.07)]/50 transition"
                  >
                    <Td>{start + i + 1}</Td>
                    <Td>
                      <div className="flex items-center gap-2">
                        <div className="h-6 w-6 rounded-full bg-[color:var(--pink)]/25" />
                        {u?.name ?? "---"}
                      </div>
                    </Td>
                    <Td className="text-pink-300">{u?.gender ?? "---"}</Td>
                    <Td className="text-pink-300">{u?.number ?? "---"}</Td>

                    <Td>{u.user_name ?? "---"}</Td>
                    <Td>
                      <span
                        className={`px-2 py-0.5 rounded-full text-xs border ${
                          u?.status === "Active"
                            ? "bg-[color:var(--pink)]/15 border-[color:var(--pink)]/30 text-pink-200"
                            : "bg-pink-900/30 border-pink-900/60 text-pink-300"
                        }`}
                      >
                        {u?.status ? "Active" : "Deactive"}
                      </span>
                    </Td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex items-center justify-between px-4 py-3 border-t border-pink-900/40 bg-black/40 text-sm">
            <span className="text-pink-300">
              Page {page} of {totalPages}
            </span>
            <div className="flex items-center gap-2">
              <PagerButton disabled={page === 1} onClick={() => goto(page - 1)}>
                Prev
              </PagerButton>
              {range(1, totalPages).map((p) => (
                <button
                  key={p}
                  onClick={() => goto(p)}
                  className={`h-8 min-w-8 px-3 rounded-full border accent-border shadow-[0_0_0_1px_rgba(236,41,123,0.15)] ${
                    p === page
                      ? "bg-[color:var(--pink)] text-black"
                      : "bg-black/30 text-pink-200 hover:bg-pink-600/10"
                  }`}
                >
                  {p}
                </button>
              ))}
              <PagerButton
                disabled={page === totalPages}
                onClick={() => goto(page + 1)}
              >
                Next
              </PagerButton>
            </div>
          </div>
        </div>
      </section>
    </DashboardLayout>
  );
}

function Th({ children }: { children: React.ReactNode }) {
  return <th className="text-left px-4 py-3 font-medium">{children}</th>;
}

function Td({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <td className={`px-4 py-3 ${className}`}>{children}</td>;
}

function PagerButton({
  children,
  disabled,
  onClick,
}: {
  children: React.ReactNode;
  disabled?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`h-8 px-3 rounded-full border accent-border disabled:opacity-40 disabled:cursor-not-allowed hover:bg-pink-600/10`}
    >
      {children}
    </button>
  );
}

function range(a: number, b: number) {
  const out: number[] = [];
  for (let i = a; i <= b; i++) out.push(i);
  return out;
}

function Stat({
  title,
  value,
  hint,
}: {
  title: string;
  value:   undefined |null|string;
  hint?: string;
}) {
  return (
    <div className="panel p-4">
      <p className="text-xs subtle">{title}</p>
      <div className="mt-2 flex items-baseline justify-between">
        <span className="text-2xl font-semibold text-pink-100">{value}</span>
        {hint ? <span className="text-xs text-pink-300">{hint}</span> : null}
      </div>
    </div>
  );
}
