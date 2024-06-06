export async function GET(request: Request) {
  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/users/1", {
      next: { revalidate: 60 },
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    return Response.json(data);
  } catch (error) {
    console.error("Something went wrong in your request", error);
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log(body);
    return new Response(
      JSON.stringify({ message: "Data received", data: body }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      },
    );
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error", error);
      return new Response(
        JSON.stringify({
          message: "Error processing request",
          error: error.message,
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        },
      );
    }
  }
}
