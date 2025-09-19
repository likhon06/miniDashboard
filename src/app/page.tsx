"use client";
import Card from "@/components/Card";
import { motion } from "framer-motion";
import { User } from "@auth/core/types";
import { useFetch } from "@/hooks/useFetch";

type Post = {
  id: number;
  body: string;
  title: string;
  userId: number;
};

const stats = [
  { label: "Bounce Rate", value: "24%" },
  { label: "Avg. Time", value: "3m 12s" },
];


export default function Home() {
  const { data: posts } = useFetch<Post[]>(
    "https://jsonplaceholder.typicode.com/posts"
  );
  const { data: users } = useFetch<User[]>(
    "https://jsonplaceholder.typicode.com/users"
  );
  const postsCount = posts?.length || 0;
  const usersCount = users?.length || 0;
  return (
    <div className="flex flex-col gap-6">
      <motion.h1
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-xl font-semibold">
        Welcome back 👋
      </motion.h1>
      <motion.div
        initial="hidden"
        animate="show"
        variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.08 } } }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        <motion.div key="posts" variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }}>
          <Card title="Posts">
            <div className="text-2xl font-bold">{postsCount}</div>
          </Card>
        </motion.div>
        <motion.div key="users" variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }}>
          <Card title="Users">
            <div className="text-2xl font-bold">{usersCount}</div>
          </Card>
        </motion.div>
        <motion.div key="bounceRate" variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }}>
          <Card title="Bounce Rate">
            <div className="text-2xl font-bold">{stats[0].value}</div>
          </Card>
        </motion.div>
        <motion.div key="avgTime" variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }}>
          <Card title="Avg. Time">
            <div className="text-2xl font-bold">{stats[1].value}</div>
          </Card>
        </motion.div>
      </motion.div>
      <Card title="Get started" className="mt-2">
        <p className="text-sm text-black/70 dark:text-white/70">
          Explore posts and users using the navigation above. Animations are powered by Framer Motion.
        </p>
      </Card>
    </div>
  );
}
