import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export default async function Page() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  try {
    const { data: clients, error } = await supabase.from("clients").select("");
    console.log(clients);
    if (error) {
      console.error("error fethcing data from 'clients'", error);
      return <div>Error fetching data</div>;
    }
    if (!clients || clients.length === 0) {
      console.log("no clients");
      return <div>no data found</div>;
    }
    if (clients) {
      return (
        <div>
          {clients.map((client, key) => (
            <div key={key}>{client.firstName}</div>
          ))}
        </div>
      );
    }
  } catch (error) {
    // console.log(clients)
    <ul>
      {clients?.map((client, key) => (
        <li key={key}>{JSON.stringify(client)}</li>
      ))}
    </ul>;
  }
}
