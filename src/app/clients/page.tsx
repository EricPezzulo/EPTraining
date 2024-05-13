import { IoFilterOutline } from "react-icons/io5";
import { IoIosAdd } from "react-icons/io";
import { users } from "../../../mockDb";
import ClientTable from "../components/client-components/ClientTable";

export default function Page() {
  return (
    <div className="flex flex-col items-center">
      <ClientTable />
      todo
      <p>add filters for clients with sessions today</p>
      <p>add status indicators for clients that are active</p>
      <p>add new client feature</p>
    </div>
  );
}
