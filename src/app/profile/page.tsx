"use client";
import Image from 'next/image'
import Card from "@/components/Card";
import { motion } from "framer-motion";
import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";
import { MdVerifiedUser } from "react-icons/md";


export default function ProfilePage() {
  const { data: session, status } = useSession();
  console.log("session", session);
  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-sm opacity-70">Loading...</div>
      </div>
    );
  }

  if (status === "unauthenticated") {
    redirect("/auth/signin");
  }

  if (!session?.user) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-sm text-red-600">No user data available</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <motion.h1
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-xl font-semibold"
      >
        Profile
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <Card title="User Information">
          <div className="space-y-3">
            <div>
              <div className="text-sm opacity-70">Name</div>
              <div className="font-medium">{session.user.name || "Not provided"}</div>
            </div>
            <div>
              <div className="text-sm opacity-70">Email</div>
              <div className="font-medium">{session.user.email || "Not provided"}</div>
            </div>
            <div>
              <div className="text-sm opacity-70">Image</div>
              {session?.user?.image ? (
                <Image
                  src={session?.user?.image}
                  alt="Profile"
                  width={64}
                  height={64}
                  className="rounded-full mt-2"
                />
              ) : (
                <div className="text-sm opacity-50">No image</div>
              )}
            </div>
          </div>
        </Card>

        <Card title="Session Details">
          <div className="space-y-3">
            <div>
              <div className="text-sm opacity-70">Provider</div>
              <div className="font-medium">Google</div>
            </div>
            <div>
              <div className="text-sm opacity-70">Status</div>
              <div className="font-medium text-green-600 flex gap-2 items-center">Authenticated<MdVerifiedUser size={20} /></div>
            </div>
            <div>
              <div className="text-sm opacity-70">Last Updated</div>
              <div className="font-medium">{new Date().toLocaleString()}</div>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
