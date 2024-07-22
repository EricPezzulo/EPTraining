import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  const { firstName, lastName, username } = await req.json();
  try {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const clientData = { firstName, lastName, username };

    const { data, error } = await supabase.from("clients").insert([clientData]).select();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
console.log(data)
    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
