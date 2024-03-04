"use client";
import { Button, buttonVariants } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { db } from "@/firebase/config";
import { onValue, ref } from "firebase/database";
import {
  LucideArrowLeft,
  LucideArrowLeftFromLine,
  MoveLeft,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

interface historyProps {
  [roomId: string]: {
    points: {
      [userName: string]: {
        points: number;
      };
    };
  };
}

interface modifiedHistoryProps {
  userName: string;
  points: number;
}

const LeaderBoard = () => {
  const searchParams = useSearchParams();
  const defaultTab = searchParams.get("tab");

  const [quizHistory, setQuizHistory] = useState<modifiedHistoryProps[][] | []>(
    []
  );
  const [rapidFireHistory, setRapidFireHistory] = useState<
    modifiedHistoryProps[][] | []
  >([]);
  const [kbcPoints, setKbcPoints] = useState<modifiedHistoryProps[] | []>([]);

  useEffect(() => {
    function fetchHistory(type: string) {
      onValue(ref(db, type + "/rooms"), (snapshot) => {
        const value: historyProps = snapshot.val();
        type === "/quiz" ? setQuizHistory([]) : setRapidFireHistory([]);
        Object.keys(value).forEach((roomId) => {
          let point: modifiedHistoryProps[] = [];
          if (value[roomId].points) {
            Object.keys(value[roomId].points).forEach((userName) => {
              point.push({
                userName,
                points: value[roomId].points[userName].points,
              });
            });
            if (point.length === 2) {
              type === "/quiz"
                ? setQuizHistory((prev) => [...prev, point])
                : setRapidFireHistory((prev) => [...prev, point]);
            }
          }
        });
      });
    }
    function fetchKBCPoints() {
      onValue(ref(db, "/kbc"), (snapshot) => {
        const value = snapshot.val();
        setKbcPoints([]);
        let points: modifiedHistoryProps[] = [];
        Object.keys(value).map((roomId) => {
          const data: modifiedHistoryProps = value[roomId];
          points.push(data);
        });

        setKbcPoints(points.sort((a, b) => b.points - a.points));
      });
    }
    fetchHistory("/quiz");
    fetchKBCPoints();
    fetchHistory("/rapidfire");
  }, []);

  useEffect(() => {
    console.log(kbcPoints);
  }, [kbcPoints]);

  return (
    <div className="subjective dark h-screen text-left px-20 space-y-10 w-screen pt-10 text-white">
      <div className="w-full flex justify-between items-center">
        <h1 className="text-5xl">Leaderboard</h1>
        <Link
          href={"/quizzy"}
          className={buttonVariants({ variant: "outline" })}
        >
          <MoveLeft />
        </Link>
      </div>
      <div>
        <Tabs
          defaultValue={defaultTab ? defaultTab : "kbc"}
          className="w-[400px] dark space-y-5"
        >
          <TabsList>
            <TabsTrigger className="pb-1 mb-1" value="kbc">
              KBC
            </TabsTrigger>
            <TabsTrigger className="pb-1 mb-1" value="rapidfire">
              RapidFire
            </TabsTrigger>
            <TabsTrigger className="pb-1 mb-1" value="quiz">
              Quiz
            </TabsTrigger>
          </TabsList>
          <TabsContent value="kbc">
            <div className="space-y-5">
              {kbcPoints.length > 0 &&
                kbcPoints.map((user) => {
                  return (
                    <div className="w-[90%] lg:w-[500px] flex justify-between items-center hover:animate-fade hover:bg-gray-900/50 px-5 py-2 rounded-lg cursor-pointer">
                      <div className="flex items-center gap-x-3">
                        <Image
                          src={
                            "https://api.multiavatar.com/" +
                            user.userName.toUpperCase() +
                            ".png?apikey=dHPlXfrUZEcvuO"
                          }
                          width={50}
                          height={50}
                          alt="user avatar"
                        />
                        <p>{user.userName}</p>
                      </div>
                      <p>{user.points}</p>
                    </div>
                  );
                })}
            </div>
          </TabsContent>
          <TabsContent value="rapidfire">
            <div className="space-y-5">
              {rapidFireHistory.length > 0 &&
                rapidFireHistory.map((user) => {
                  return (
                    <div className="w-[90%] lg:w-[1000px] flex justify-between items-center hover:animate-fade hover:bg-gray-900/50 px-5 py-2 rounded-lg cursor-pointer">
                      <div className="flex flex-1 items-center gap-x-3">
                        <Image
                          src={
                            "https://api.multiavatar.com/" +
                            user[0].userName.toUpperCase() +
                            ".png?apikey=dHPlXfrUZEcvuO"
                          }
                          width={50}
                          height={50}
                          alt="user avatar"
                        />
                        <p>{user[0].userName}</p>
                      </div>
                      <div className="flex flex-1 gap-x-3">
                        <p>{user[0].points}</p>
                        <p>Vs</p>
                        <p>{user[1].points}</p>
                      </div>
                      <div className="flex items-center gap-x-3">
                        <Image
                          src={
                            "https://api.multiavatar.com/" +
                            user[1].userName.toUpperCase() +
                            ".png?apikey=dHPlXfrUZEcvuO"
                          }
                          width={50}
                          height={50}
                          alt="user avatar"
                        />
                        <p>{user[1].userName}</p>
                      </div>
                    </div>
                  );
                })}
            </div>
          </TabsContent>
          <TabsContent value="quiz">
            <div className="space-y-5">
              {quizHistory.length > 0 &&
                quizHistory.map((user) => {
                  return (
                    <div className="w-[90%] lg:w-[1000px] flex justify-between items-center hover:animate-fade hover:bg-gray-900/50 px-5 py-2 rounded-lg cursor-pointer">
                      <div className="flex flex-1 items-center gap-x-3">
                        <Image
                          src={
                            "https://api.multiavatar.com/" +
                            user[0].userName.toUpperCase() +
                            ".png?apikey=dHPlXfrUZEcvuO"
                          }
                          width={50}
                          height={50}
                          alt="user avatar"
                        />
                        <p>{user[0].userName}</p>
                      </div>
                      <div className="flex flex-1 gap-x-3">
                        <p>{user[0].points}</p>
                        <p>Vs</p>
                        <p>{user[1].points}</p>
                      </div>
                      <div className="flex items-center gap-x-3">
                        <Image
                          src={
                            "https://api.multiavatar.com/" +
                            user[1].userName.toUpperCase() +
                            ".png?apikey=dHPlXfrUZEcvuO"
                          }
                          width={50}
                          height={50}
                          alt="user avatar"
                        />
                        <p>{user[1].userName}</p>
                      </div>
                    </div>
                  );
                })}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default LeaderBoard;
