"use client";
import { useSession } from "next-auth/react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";

export default function Dashboard() {
  const [data, setData] = useState();
  const { data: userData, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    const getTask = async () => {
      if (userData?.user) {
        try {
          const res = await axios.get(`/api/tasks/${userData?.user?._id}`);
          setData(res.data);
        } catch (error) {
          console.error("Error al obtener datos:", error);
        }
      } else {
        // Redirige al usuario a la página de inicio de sesión o maneja el caso de usuario no autenticado
        router.push("/login"); // Reemplaza '/login' con la URL de tu página de inicio de sesión
      }
    };

    if (userData) {
      getTask();
    }
  }, [userData]);
  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col gap-y-10 items-center justify-center">
      <h1 className="font-bold text-3xl">Profile</h1>

      <pre className="bg-zinc-800 p-4">
        {JSON.stringify(
          {
            data,
            status,
          },
          null,
          2
        )}
      </pre>

      <button
        className="bg-zinc-800 px-4 py-2 block mb-2"
        onClick={() => {
          signOut();
        }}
      >
        Signout
      </button>
    </div>
  );
}
