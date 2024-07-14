import Sidebar from "@/components/custom-ui/Sidebar";
import WorkoutCard, { exercisesType } from "@/components/custom-ui/WorkoutCard";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/shadcn-ui/breadcrumb";
import { Button } from "@/components/shadcn-ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/shadcn-ui/dropdown-menu";
import { Input } from "@/components/shadcn-ui/input";
import { Search } from "lucide-react";

import Image from "next/image";
import Link from "next/link";
import React from "react";

const exercises: exercisesType = {
  exercises: [
  {
    exerciseName: "Bench Press",
    sets: 4,
    reps: 5,
    weight: 220,
    loadPercentage: 70,
  },
  {
    exerciseName: "Bench Press",
    sets: 2,
    reps: 3,
    weight: 231.5,
    loadPercentage: 75,
  },
  {
    exerciseName: "EZ Bar Skull Crusher",
    sets: 4,
    reps: 10,
    weight: 70,
    RPE: 7,
  },
  {
    exerciseName: "DB Press",
    sets: 4,
    reps: 8,
    weight: 70,
    RPE: 7,
  },
  {
    exerciseName: "Pull Ups",
    sets: 4,
    reps: 10,
  },
  {
    exerciseName: "EZ Bar Preacher Curls",
    sets: 4,
    reps: 10,
    weight: 50,
    RPE: 8,
  },
  {
    exerciseName: "Machine Lateral Raise",
    sets: 4,
    reps: 8,
    weight: 80,
    RPE: 7,
  },
]};

const WorkoutsPage = () => {
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
          <Sidebar />
          <Breadcrumb className="hidden md:flex">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="#">Dashboard</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="#">Workout Programs</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
            </BreadcrumbList>
          </Breadcrumb>
          <div className="relative ml-auto flex-1 md:grow-0">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[320px]"
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="overflow-hidden rounded-full"
              >
                <Image
                  src="/images/Ichigo.jpeg"
                  width={36}
                  height={36}
                  alt="Avatar"
                  className="overflow-hidden rounded-full"
                />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        <div>
          WorkoutsPage
          <WorkoutCard workoutTitle="Push Day 1" exercises={exercises} date='7-15-2024' />
        </div>
      </div>
    </div>
  );
};

export default WorkoutsPage;
