import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2>Page not found</h2>
      <p>Could not find requested resource</p>
      <Link className="font-bold" href="/clients">
        Return to Clients page
      </Link>
    </div>
  );
}
