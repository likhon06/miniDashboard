"use client";
import Card from "@/components/Card";
import { motion } from "framer-motion";
import { useFetch } from "@/hooks/useFetch";

type Post = {
  id: number;
  body: string;
  title: string;
  userId: number;
};

export default function PostsPage() {
  const { data, error, loading, refetch } = useFetch<Post[]>(
    "https://jsonplaceholder.typicode.com/posts"
  );

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.06, delayChildren: 0.05 },
    },
  };
  const item = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } };
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Posts</h1>
        <div className="flex items-center gap-2">
          <button onClick={() => refetch()} className="text-sm underline underline-offset-4">Refresh</button>
        </div>
      </div>
      {loading && <div className="text-sm opacity-70">Loading posts…</div>}
      {error && (
        <Card className="border-red-300/40">
          <div className="text-sm text-red-600 dark:text-red-400">Error: {error}</div>
        </Card>
      )}
      {!loading && !error && data && (
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {data.slice(0, 18).map((post) => (
            <motion.div key={post.id} variants={item}>
              <Card title={post.title} href={`/posts/${post.id}`} className="h-[150px]">
                <p className="text-sm text-black/70 dark:text-white/70 line-clamp-3">{post.body}</p>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}


