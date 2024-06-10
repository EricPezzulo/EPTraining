import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export async function GET(request: Request) {
  try {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    const { data, error } = await supabase.from("clients").select();
    if (error) {
      throw error;
    }
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Something went wrong in your request.", error);
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 },
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    const { clientId } = await req.json();
    console.log(req.body)
    const { data, error } = await supabase
      .from("clients")
      .delete()
      .eq("clientId", clientId)
      .select();
      if(error){
        console.error('Error deleting client.', error)
      }
    return NextResponse.json(data);
  } catch (error) {
    console.error("Client could not be removed from database.", error);
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 },
    );
  }
}
