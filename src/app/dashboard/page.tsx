"use client";
import { useSession } from "next-auth/react";
import axios from "axios";
import { useState, useEffect } from "react";
export default function Dashboard() {
  const [data, setData] = useState();
  const { data: userData, status } = useSession();
  useEffect(() => {
    const getTask = async () => {
      const res = await axios.get(`/api/tasks/${userData?.user._id}`);
      setData(res.data)
    };
    getTask()
  }, [userData]);
  return <div><h1>dashboard</h1>
   <pre className="bg-zinc-800 p-4">
        {JSON.stringify(
          {
            data
          },
          null,
          2
        )}
      </pre></div>;
}
