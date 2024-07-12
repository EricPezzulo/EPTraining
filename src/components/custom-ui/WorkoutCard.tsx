"use client";

import { SquareArrowOutUpRight } from "lucide-react";
import { useState } from "react";

const WorkoutCard = () => {
  const [showMore, setShowMore] = useState<boolean>(false);
  return (
    <div className="p-3">
      <div className="flex w-[250px] flex-col rounded border-2 border-slate-100 bg-white p-5">
        <div className="grid grid-cols-2 justify-between">
          <p className="font-medium">Workout Title</p>
          <div className="flex justify-end">
            <SquareArrowOutUpRight />
          </div>
        </div>

        <div className="px-2 text-sm">
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
            className="w-full items-center text-sm text-slate-400 duration-150 ease-in hover:text-slate-700"
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
