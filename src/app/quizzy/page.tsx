import { GameCard } from "@/components/GameCard";
import React from "react";

const page = () => {
  return (
    <div className="flex items-center flex-col w-screen min-h-screen space-y-10 pt-20 subjective">
      <h1 className="animate-bounce animate-infinite relative z-10 text-lg md:text-7xl bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600 leading-loose text-center font-sans font-bold">
        Level Up
      </h1>
      <div className="flex flex-wrap justify-center items-center gap-10">
        <GameCard
          picture="/picture/kbclogo.png"
          name="KBC"
          link="/quizzy/kbc"
        />

        <GameCard
          picture="/picture/rapidfirelogo.png"
          name="RapidFire"
          link="/quizzy/rapidfire"
        />

        <GameCard picture="/picture/quiz.png" name="Quiz" link="/quizzy/quiz" />
      </div>
    </div>
  );
};

export default page;
