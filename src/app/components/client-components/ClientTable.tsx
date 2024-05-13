import { IoIosAdd } from "react-icons/io";
import { IoFilterOutline } from "react-icons/io5";
import { users } from "../../../../mockDb";
import ClientRow from "./ClientRow";

const ClientTable = () => {
  return (
    <>
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
        <ul>
          <div className="border-slate grid grid-cols-4 border-b  px-2 py-1 font-medium first:rounded-t last:rounded-b">
            <li>First, Last </li>
            <li>Phone number</li>
            <li className="flex items-center">Active staus</li>
            <li>Next session</li>
          </div>
          {users.map((user, index) => (
            <ClientRow user={user} key={index} index={index} />
          ))}
        </ul>
      </div>
    </>
  );
};

export default ClientTable;
