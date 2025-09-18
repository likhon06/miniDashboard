"use client";
import { useState } from "react";
import Card from "@/components/Card";
import Modal from "@/components/Modal";
import { motion } from "framer-motion";
import { useFetch } from "@/hooks/useFetch";

type User = {
  id: number;
  name: string;
  email: string;
  phone: string;
  website: string;
  company: { name: string };
  address: { city: string };
};

export default function UsersPage() {
  const { data, loading, error, refetch } = useFetch<User[]>(
    "https://jsonplaceholder.typicode.com/users"
  );
  const [selected, setSelected] = useState<User | null>(null);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Users</h1>
        <div className="flex items-center gap-2">
          <button onClick={() => refetch()} className="text-sm underline underline-offset-4">Refresh</button>
        </div>
      </div>

      {loading && <div className="text-sm opacity-70">Loading users…</div>}
      {error && (
        <Card className="border-red-300/40">
          <div className="text-sm text-red-600 dark:text-red-400">Error: {error}</div>
        </Card>
      )}

      {!loading && !error && data && (
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="text-left border-b border-black/10 dark:border-white/10">
                <th className="py-2 pr-3">Name</th>
                <th className="py-2 pr-3">Email</th>
                <th className="py-2 pr-3">Company</th>
              </tr>
            </thead>
            <tbody>
              {data.map((u) => (
                <motion.tr
                  key={u.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                  className="border-b border-black/5 dark:border-white/5 hover:bg-black/[.03] dark:hover:bg-white/[.03] cursor-pointer"
                  onClick={() => setSelected(u)}
                >
                  <td className="py-2 pr-3">{u.name}</td>
                  <td className="py-2 pr-3">{u.email}</td>
                  <td className="py-2 pr-3">{u.company?.name}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Modal open={!!selected} onClose={() => setSelected(null)} title={selected?.name}>
        {selected ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
            <div>
              <div className="opacity-70">Email</div>
              <div>{selected.email}</div>
            </div>
            <div>
              <div className="opacity-70">Phone</div>
              <div>{selected.phone}</div>
            </div>
            <div>
              <div className="opacity-70">Company</div>
              <div>{selected.company?.name}</div>
            </div>
            <div>
              <div className="opacity-70">City</div>
              <div>{selected.address?.city}</div>
            </div>
            <div className="sm:col-span-2">
              <a className="underline" href={`https://${selected.website}`} target="_blank" rel="noreferrer">Website</a>
            </div>
          </div>
        ) : null}
      </Modal>
    </div>
  );
}


