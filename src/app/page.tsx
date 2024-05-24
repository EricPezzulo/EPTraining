import Link from "next/link";
import { ProfileForm } from "./components/ui/form";

import CardDemo from "./components/ui/card";

export default function Home() {
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
        <p>testing new arch install</p>
      </div>
    </main>
  );
}
