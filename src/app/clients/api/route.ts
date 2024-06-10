import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export async function GET(request: Request) {
  console.log('route hit')
  try {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    const { data, error } = await supabase.from("clients").select();
    if (error) {
      throw error;
    }
console.log(data)
    return NextResponse.json( data , { status: 200 });
  } catch (error) {
    console.error("Something went wrong in your request", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
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
