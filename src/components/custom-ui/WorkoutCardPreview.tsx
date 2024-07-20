"use client";
import { SquareArrowOutUpRight } from "lucide-react";
import { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../shadcn-ui/dialog";
import { Input } from "../shadcn-ui/input";

import { Label } from "../shadcn-ui/label";
import { Button } from "../shadcn-ui/button";

export type exercisesType = {
  exerciseName: string;
  sets?: number;
  reps?: number;
  weight?: number;
  RPE?: number;
  loadPercentage?: number;
}[];

interface WorkoutCardPropTypes {
  workoutTitle: string;
  exercises: exercisesType;
  date: string;
}

const WorkoutCardPreview = ({
  workoutTitle,
  exercises,
  date,
}: WorkoutCardPropTypes) => {
  const [showMore, setShowMore] = useState<boolean>(false);
  // console.log(JSON.stringify(exercises), date);
  return (
    <div className="p-3">
      <div className="flex w-[300px] flex-col rounded border-2 border-slate-100 bg-white p-5">
        <div className="grid grid-cols-2 items-center justify-between p-1 pb-2">
          <p className="text-nowrap font-medium">
            {workoutTitle || "Workout Title"}
          </p>
          <div className="flex justify-end">
            <Dialog>
              {/* <DialogTrigger>
                <DialogHeader>
                  <DialogDescription>
                    <div className="rounded-md p-1 duration-150 ease-in hover:cursor-pointer hover:bg-slate-100">
                      <SquareArrowOutUpRight className="h-5 w-5" />
                    </div>
                  </DialogDescription>
                </DialogHeader>
              </DialogTrigger> */}
              {/* Problem in <DialogTrigger> */}
              
              <DialogContent className="h-[550px] overflow-auto ">
                <div>
                  {exercises.map((exercise, index) => (
                    <div className="py-4" key={index}>
                      <div>
                        {index + 1}.{" "}
                        <Label className="py-1">Exercise name</Label>
                        <Input
                          type="text"
                          defaultValue={exercise.exerciseName}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-3 py-1 ">
                        <div>
                          <Label>Sets</Label>
                          <Input type="text" defaultValue={exercise.sets} />
                        </div>
                        <div>
                          <Label>Reps</Label>
                          <Input type="text" defaultValue={exercise.reps} />
                        </div>
                      </div>
                    </div>
                  ))} 
                  <DialogClose>
                    <Button type="button" variant="secondary">
                      Close
                    </Button>
                  </DialogClose>
                </div>

                <Button type="button" variant="default">
                    Save
                  </Button>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div className="px-2 text-sm">
          <ol>
            {exercises.slice(0, 4).map((exercise, index) => (
              <li
                className="grid grid-cols-2 justify-between py-0.5"
                key={index}
              >
                <span className="w-full whitespace-nowrap">
                  {index + 1}. {exercise.exerciseName}
                </span>
                <span className="w-full text-right">
                  {" "}
                  {exercise.sets}x{exercise.reps}
                </span>
              </li>
            ))}
          </ol>

          {showMore ? (
            <ol>
              {exercises.slice(4)
                .map((exercise, index) => (
                  <li
                    className="grid grid-cols-2 justify-between py-0.5"
                    key={index}
                  >
                    <span className="w-full whitespace-nowrap">
                      {index + 1}. {exercise.exerciseName}
                    </span>
                    <span className="w-full text-right">
                      {exercise.sets}x{exercise.reps}
                    </span>
                  </li>
                ))
                }
            </ol>
          ) : null}
          <button
            onClick={() => setShowMore((prev) => !prev)}
            className="w-full items-center pt-1 text-sm text-slate-400 duration-150 ease-in hover:text-slate-700"
            type="button"
          >
            {showMore ? "show less" : "show more"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default WorkoutCardPreview;
