"use client";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

export default function Login() {
  const [error, setError] = useState("");
  const router = useRouter();
  const handleSubmit = async (evet: FormEvent<HTMLFormElement>) => {
    evet.preventDefault();
    try {
      const data = new FormData(evet.currentTarget);
      const signinpResponse = await signIn("credentials", {
        email: data.get("email"),
        password: data.get("password"),
        redirect: false,
      });
      if (signinpResponse?.error) setError(signinpResponse.error as string);
      if (signinpResponse?.ok) return router.push("/dashboard");
      console.log(signinpResponse);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen w-full">
      <div className="w-full max-w-sm m-auto bg-gray-900 p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-white mb-6">Login</h2>
        <form onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-500 text-white p-2 mb-2">{error}</div>
          )}
          <div className="mb-4">
            <label className="block text-gray-400 mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full px-3 py-2 text-white bg-gray-800 rounded focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-400 mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full px-3 py-2 text-white bg-gray-800 rounded focus:outline-none focus:shadow-outline"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
