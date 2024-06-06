export async function GET(request: Request) {
  const res = await fetch("https://jsonplaceholder.typicode.com/users/1", {
    // next: { revalidate: 60 },
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  return Response.json(data);
}
