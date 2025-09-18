"use client";
import React from "react";
import Card from "@/components/Card";
import { useFetch } from "@/hooks/useFetch";

type Post = {
  id: number;
  body: string;
  title: string;
  userId: number;
};

export default function PostDetail({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = React.use(params);
  const { data, loading, error, refetch } = useFetch<Post>(
    `https://jsonplaceholder.typicode.com/posts/${resolvedParams.id}`
  );
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Post #{resolvedParams.id}</h1>
        <div className="flex items-center gap-2">
          <button onClick={() => refetch()} className="text-sm underline underline-offset-4">Refresh</button>
        </div>
      </div>
      {loading && <div className="text-sm opacity-70">Loading…</div>}
      {error && (
        <Card className="border-red-300/40">
          <div className="text-sm text-red-600 dark:text-red-400">Error: {error}</div>
        </Card>
      )}
      {!loading && !error && data && (
        <Card title={data.title}>
          <p className="text-sm leading-6 opacity-90 whitespace-pre-wrap">{data.body}</p>
        </Card>
      )}
    </div>
  );
}


