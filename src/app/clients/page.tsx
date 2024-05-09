import { IoFilterOutline } from "react-icons/io5";
import { IoIosAdd } from "react-icons/io";
import { users } from "../../../mockDb";

export default function Page() {
  return (
    <div className="flex flex-col items-center">
      <div className="flex items-center">
        <label htmlFor="clientSearchInput">Client Lookup</label>
        <input
          placeholder="Name"
          className="h-8 rounded bg-slate-100 px-2 outline-none"
          type="text"
          name="clientSearchInput"
        />
        <button
          className="rounded border border-slate-100 p-1 duration-100 ease-in hover:bg-slate-200"
          type="button"
        >
          <IoFilterOutline className="h-6 w-6 text-slate-500" />
        </button>
        <button
          className="flex rounded  border border-slate-100 p-1 text-slate-600 duration-100 ease-in hover:bg-slate-200"
          type="button"
        >
          <IoIosAdd className="h-6 w-6" /> New Client
        </button>
      </div>
      <div className="flex w-3/4 flex-col rounded border border-slate-200 shadow">
        {users.map((user, index) => (
          <ul key={index} className="grid grid-cols-4">
            <li>
              {user.firstName} {user.lastName}
            </li>
            <li>{user.phoneNumber}</li>
            <li className="flex items-center">
              {user.activeClientStatus ? (
                <div className="h-3 w-3 rounded-full bg-green-500"></div>
              ) : (
                <div className="h-3 w-3 rounded-full bg-red-500"></div>
              )}
            </li>
            <li>{user.nextSession ? user.nextSession : "Unscheduled"}</li>
          </ul>
        ))}
      </div>
      todo
      <p>add filters for clients with sessions today</p>
      <p>add status indicators for clients that are active</p>
      <p>add new client feature</p>
    </div>
  );
}
