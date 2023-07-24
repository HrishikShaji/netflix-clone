"use client";
import Input from "@/components/Input";
import React, { useCallback } from "react";
import { useState } from "react";
import axios from "axios";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { useEffect } from "react";
import { getSession } from "next-auth/react";

const page = () => {
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [variant, setVariant] = useState<string>("login");

  const router = useRouter();
  const session = useSession();
  useEffect(() => {
    if (session.status === "authenticated") {
      router.push("/");
    }
    console.log(session);
  }, [session]);

  const toggleVariant = useCallback(() => {
    setVariant((currentVariant) =>
      currentVariant === "login" ? "register" : "login"
    );
  }, []);

  const login = async () => {
    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
        callbackUrl: "/",
      });

      router.push("/");

      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  const register = async () => {
    try {
      console.log(name, email, password);

      const res = await fetch("/api/register", {
        method: "POST",
        body: JSON.stringify({ email, name, password }),
        headers: { "Content-Type": "application/json" },
      });

      await login();
      const data = await res.json();
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="relative h-full w-full bg-[url('/images/hero.jpg')] bg-no-repeat bg-center bg-fixed bg-cover">
      <div className="bg-black w-full h-full bg-opacity-50">
        <nav className="px-12 py-5">
          <img src="/images/logo.png" alt="logo" className="h-12" />
        </nav>
        <div className="flex justify-center ">
          <div className="bg-black bg-opacity-70 px-16 py-16 self-center mt-2 rounded-md ">
            <h2 className="text-white text-4xl mb-8 font-semibold">
              {variant === "login" ? "Sign In" : "Register"}
            </h2>
            <div className="flex flex-col gap-4">
              {variant === "register" && (
                <Input
                  label="Name"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setName(e.target.value)
                  }
                  id="name"
                  type="text"
                  value={name}
                />
              )}
              <Input
                label="Email"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setEmail(e.target.value)
                }
                id="email"
                type="email"
                value={email}
              />
              <Input
                label="Password"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setPassword(e.target.value)
                }
                id="password"
                type="password"
                value={password}
              />
              <button
                onClick={variant === "login" ? login : register}
                className="bg-red-600 py-3 rounded-md w-full text-white">
                {variant === "login" ? "Log In" : "Sign Up"}
              </button>
              <div className="flex gap-4 justify-center items-center mt-8">
                <div
                  onClick={() => signIn("google", { callbackUrl: "/" })}
                  className="w-10 cursor-pointer h-10 rounded-full bg-white flex items-center justify-center hover:opacity-80 transition">
                  <FcGoogle />
                </div>
                <div
                  onClick={() => signIn("github", { callbackUrl: "/" })}
                  className="w-10 cursor-pointer h-10 rounded-full bg-white flex items-center justify-center hover:opacity-80 transition">
                  <FaGithub />
                </div>
              </div>
              <p className="text-neutral-500 mt-12">
                {variant === "login"
                  ? " First time using Netflix?"
                  : "Already have an Account?"}

                <span
                  onClick={toggleVariant}
                  className="text-white ml-1 hover:underline cursor-pointer">
                  {variant === "login" ? "Sign Up" : "Log In"}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
