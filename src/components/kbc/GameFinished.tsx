"use client";
import "@/styles/rain.css";
import { KBCContext } from "@/context/KBCContext";
import React, { FC, useContext, useEffect, useState } from "react";
import TrophyCard from "./TrophyCard";

import { priceCounter, score, suffix } from "./PriceTable";
import Link from "next/link";
import { Button, buttonVariants } from "../ui/button";
import { useRouter } from "next/navigation";


const GameFinished: FC<{
  name: string;
  questionCounter: number;
}> = ({ name, questionCounter }) => {
  const router = useRouter()
  return (
    <div className="flex flex-col space-y-10 justify-center items-center h-screen w-screen z-40">
      <div className="confetti">
        <div className="confetti-piece"></div>
        <div className="confetti-piece"></div>
        <div className="confetti-piece"></div>
        <div className="confetti-piece"></div>
        <div className="confetti-piece"></div>
        <div className="confetti-piece"></div>
        <div className="confetti-piece"></div>
        <div className="confetti-piece"></div>
        <div className="confetti-piece"></div>
        <div className="confetti-piece"></div>
        <div className="confetti-piece"></div>
        <div className="confetti-piece"></div>
        <div className="confetti-piece"></div>
        <div className="confetti-piece"></div>
        <div className="confetti-piece"></div>
        <div className="confetti-piece"></div>
        <div className="confetti-piece"></div>
        <div className="confetti-piece"></div>
        <div className="confetti-piece"></div>
      </div>
      <h1 className="text-5xl font-bold subjective text-yellow-500">
        Game Finished
      </h1>
      <TrophyCard
        name={name}
        count={priceCounter[questionCounter]}
        suffix={suffix[questionCounter]}
        score={score[questionCounter]}
      />
      <div className="space-x-5 fixed w-screen flex items-center justify-center gap-x-5 bottom-10 left-auto right-auto z-50">
                    <Button
                      onClick={()=>router.push("/quizzy/kbc")}
                      className={buttonVariants({ className: "bg-green-500" })}
                    >
                      Play Again
                    </Button>
                    <Button
                      onClick={()=>router.push("/leaderboard")}
                      className={buttonVariants({ className: "bg-blue-500" })}
                    >
                      Leaderboard
                    </Button>
                  </div>
    </div>
  );
};

export default GameFinished;
