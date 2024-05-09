import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <h1 className="text-3xl font-bold text-black">EPTraining.com</h1>
        <Link className="text-neutrual-800 font-medium" href="/clients/">
          Clients
        </Link>{" "}
        <form
          className="flex w-96 flex-col rounded border border-slate-200 p-5 shadow"
          action=""
        >
          <label htmlFor="usernameInput">Username</label>
          <input
            className="rounded bg-slate-100 px-2 outline-none"
            name="usernameInput"
            type="text"
          />
          <label htmlFor="passwordInput">Password</label>
          <input
            className="rounded bg-slate-100 px-2 outline-none"
            name="passwordInput"
            type="password"
          />{" "}
          <button
            className=" mt-5 h-8 w-20 self-center rounded bg-blue-600 font-medium text-white"
            type="submit"
          >
            Sign In
          </button>
        </form>
      </div>
    </main>
  );
}
