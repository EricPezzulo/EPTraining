"use client";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/shadcn-ui/tooltip";
import {
  CookingPot,
  Dumbbell,
  Home,
  LineChart,
  Settings,
  ShipWheel,
  Users2,
} from "lucide-react";
import Link from "next/link";
import React, { useRef, useState } from "react";

function Sidebar({}) {
  const [selected,setSelected] = useState<string | null>("Dashboard");
  const sidebarButtons = [
    "Home",
    "Workout Programs",
    "Meal Plans",
    "Clients",
    "Analytics",
  ];
  const handleSelect = (e:React.MouseEvent<HTMLAnchorElement , MouseEvent>) => {
    setSelected(e.currentTarget.id)

  };

  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
      <nav className="flex flex-col items-center gap-4 px-2 py-4">
        <Link
          href="/"
          className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
        >
          <ShipWheel className="h-4 w-4 transition-all group-hover:scale-110" />
          <span className="sr-only">CoachSpot</span>
        </Link>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                id="Dashboard"
                onClick={handleSelect}
                href="#"
                className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors hover:text-foreground md:h-8 md:w-8 ${selected === 'Dashboard' ? "bg-accent text-accent-foreground" : "bg-transarent text-muted-foreground"}`}
              >
                <Home className="h-5 w-5" />
                <span className="sr-only">Dashboard</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Dashboard</TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                id="Workout Programs"
                onClick={handleSelect}
                href="#"
                className={`flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-accent-foreground transition-colors hover:text-foreground md:h-8 md:w-8 ${selected === "Workout Programs" ? "text-accent-foreground bg-accent": "text-muted-foreground bg-transparent"}`}
              >
                <Dumbbell className="h-5 w-5" />
                <span className="sr-only">Workout Programs</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Workout Programs</TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                id="Meal Plans"
                onClick={handleSelect}
                href="#"
                className={`flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-accent-foreground transition-colors hover:text-foreground md:h-8 md:w-8 ${selected === "Meal Plans" ? "text-accent-foreground bg-accent": "text-muted-foreground bg-transparent"}`}
              >
                <CookingPot className="h-5 w-5" />
                <span className="sr-only">Meal Plans</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Meal Plans</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                id="Clients"
                onClick={handleSelect}
                href="#"
                className={`flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-accent-foreground transition-colors hover:text-foreground md:h-8 md:w-8 ${selected === "Clients" ? "text-accent-foreground bg-accent": "text-muted-foreground bg-transparent"}`}
              >
                <Users2 className="h-5 w-5" />
                <span className="sr-only">Clients</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Clients</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                id="Analytics"
                onClick={handleSelect}
                href="#"
                className={`flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-accent-foreground transition-colors hover:text-foreground md:h-8 md:w-8 ${selected === "Analytics" ? "text-accent-foreground bg-accent": "text-muted-foreground bg-transparent"}`}
              >
                <LineChart className="h-5 w-5" />
                <span className="sr-only">Analytics</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Analytics</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </nav>
      <nav className="mt-auto flex flex-col items-center gap-4 px-2 py-4">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
              >
                <Settings className="h-5 w-5" />
                <span className="sr-only">Settings</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Settings</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </nav>
    </aside>
  );
}

export default Sidebar;
