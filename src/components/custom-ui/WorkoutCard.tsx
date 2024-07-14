"use client";
import { SquareArrowOutUpRight } from "lucide-react";
import { useState } from "react";

export type exercisesType= {
  exercises: {
    exerciseName: string,
    sets?: number,
    reps?: number,
    weight?: number,
    RPE?: number,
    loadPercentage?: number 
  }[]
} 

interface WorkoutCardPropTypes {
  workoutTitle: string, 
  exercises: exercisesType,
  date: string,

}

const WorkoutCard = ({workoutTitle, exercises, date}:WorkoutCardPropTypes) => {
  const [showMore, setShowMore] = useState<boolean>(false);
  console.log(workoutTitle, exercises, date)
  return (
    <div className="p-3">
      <div className="flex w-[250px] flex-col rounded border-2 border-slate-100 bg-white p-5">
        <div className="grid grid-cols-2 justify-between p-1">
          <p className="font-medium text-nowrap">{workoutTitle || "Workout Title"}</p>
          <div className="flex justify-end">
            <div className='hover:bg-slate-100 p-1 duration-150 ease-in rounded-md hover:cursor-pointer'>
              <SquareArrowOutUpRight className='h-5 w-5' />
            </div>
          </div>
        </div>

        <div className="px-2 text-sm">
          {Object(exercises).value}
          <p>exercise 1</p>
          <p>exercise 2</p>
          <p>exercise 3</p>
          {showMore ? (
            <>
              <p>exercise 4</p>
              <p>exercise 5</p>
            </>
          ) : null}
          <button
            onClick={() => setShowMore((prev) => !prev)}
            className="w-full pt-1 items-center text-sm text-slate-400 duration-150 ease-in hover:text-slate-700"
            type="button"
          >
            {showMore ? "show less" : "show more"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default WorkoutCard;
