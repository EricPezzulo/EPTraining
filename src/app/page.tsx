import Link from "next/link";
import { SignInForm } from "../components/custom-ui/SignInForm";
import { Card, CardContent, CardHeader } from "@/components/shadcn-ui/card";


export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <h1 className="text-3xl font-bold text-black">EPTraining.com</h1>
        <Link className="text-neutrual-800 font-medium" href="/clients/">
          Clients
        </Link>
        <Card className='w-[380px]'>
          <CardHeader>
            Sign in
          </CardHeader>
          <CardContent>
             <SignInForm
            usernamePlaceholder="johndoe@email.com"
            passwordPlaceholder="strongpassword!"
            usernameInputLabel="Username"
            passwordInputLabel="Password"
            buttonLabel="Sign in"
            // formDescription="test"
          />
          </CardContent>
         
        </Card>
          
        {/* </CardDemo> */}
      </div>
    </main>
  );
}
