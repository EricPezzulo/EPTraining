import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { User } from "../clients/[client]/page";
type ParserError = {
  error: string;
};

type Response<T> = {
  data: T | null;
  error: ParserError | null;
};

const fetchClients = async (): Promise<Response<User[]>> => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { data, error } = await supabase.from("clients").select();

  if (error) {
    return { data: null, error: { error: error.message } };
  }

  return { data, error: null };
};

export default async function Page() {
  // const cookieStore = cookies();
  // const supabase = createClient(cookieStore);
  // const { data: clients, error } = await supabase.from("clients").select("");

  const { data: clients, error } = await fetchClients();

  if (error) {
    console.error("Error fetching data from 'clients' table.", error);
  }
  if (!clients || clients.length === 0) {
    console.error("No clients found in  'clients' table.", error);
  }
  console.log(clients);
  return (
    <div>
      <p>Client List</p>
      <ul>
        {clients?.map((client, key) => (
          <li key={key}>
            {client.firstName} {client.lastName}
          </li>
        ))}
      </ul>
    </div>
  );
}
