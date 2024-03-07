"use client";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const Landing = () => {
  const [userName, setUserName] = useState<string>("");
  const router = useRouter();
  return (
    <div className="flex flex-col justify-center items-center w-full h-screen subjective">
      
      <div className="space-y-5 w-[300px]">
        <Input
          onChange={(e) => setUserName(e.target.value)}
          value={userName}
          type="text"
          placeholder="Enter Your Name"
        />
        <Button
          onClick={()=>router.push("/quizzy/kbc/" + userName)}
          className="w-full bg-green-500 animate-fade animate-infinite"
        >
          Start Game
        </Button>
        <Button
          onClick={()=>router.push("/quizzy")}
          className="w-full"
        >
          Go Back
        </Button>
      </div>
    </div>
  );
};

export default Landing;
