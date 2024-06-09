import Link from "next/link";
import { ProfileForm } from "./components/ui/form";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import CardDemo from "./components/ui/card";

export default function Home() {
  // const cookieStore = cookies();
  // const supabase = createClient(cookieStore);
  // const {data: clients} = await supabase.from('clients').select()

  // console.log(clients)
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <h1 className="text-3xl font-bold text-black">EPTraining.com</h1>
        <Link className="text-neutrual-800 font-medium" href="/clients/">
          Clients
        </Link>
        <CardDemo>
          <ProfileForm
            usernamePlaceholder="johndoe@email.com"
            passwordPlaceholder="strongpassword!"
            usernameInputLabel="Username"
            passwordInputLabel="Password"
            buttonLabel="Sign in"
            // formDescription="test"
          />
        </CardDemo>
      </div>
    </main>
  );
}
