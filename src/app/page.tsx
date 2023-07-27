"use client";
import { CarForm } from "@/components/carform";
import GithubButton from "@/components/github";
import { ResultCard } from "@/components/resultcard";
import { ThemeToggle } from "@/components/theming/toggle";
import { SearchLink } from "@/lib/sites/types";
import UsedCarsNIBuilder from "@/lib/sites/usedcarsni/usedcarsni";
import { CarFormSchema } from "@/schemas/CarFormSchema";

import { useState } from "react";
import * as z from "zod";

export default function Home() {
  const [links, setlinks] = useState<SearchLink[]>([]);

  const hasLinks = !!links.length;

  const generateLinks = (data: z.infer<typeof CarFormSchema>) => {
    setlinks([UsedCarsNIBuilder(data)]);
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center ">
      <div className="flex items-center justify-between gap-4">
        <h1 className="font-bold text-5xl my-4">carsearch</h1>

        <GithubButton />
        <ThemeToggle />
      </div>
      <div className=" w-5/6 sm:w-2/3 flex flex-col gap-4 justify-center items-center">
        <CarForm generateLinks={generateLinks} />
        {hasLinks && <ResultCard links={links} />}
      </div>
    </main>
  );
}
