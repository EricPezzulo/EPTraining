import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  //  console.log(req.url)
  try {
    const url = new URL(req.url);
    const clientId = url.searchParams.get("clientId");
    if (!clientId) {
      return NextResponse.json({ error: "ClientId is required." });
    }
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    const { data, error } = await supabase
      .from("clients")
      .select()
      .eq("clientId", clientId);
    if (error) {
      console.error(
        `There was a problem fetching the data for this client, clientId: ${clientId}`,
      );
    }
    const clients = data?.[0];

    return NextResponse.json(clients, { status: 200 });
  } catch (error) {
    console.error("Internal Server Error", error);
    return NextResponse.json({ error: "Something went wrong :(", status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const url = new URL(req.url);
    const clientId = url.searchParams.get("clientId");
    const { phoneNumber, name, description } = await req.json();
    const firstName = name.split(" ")[0];
    const lastName = name.split(" ")[1];
    console.log(phoneNumber, name, description);
    if (!phoneNumber) {
      return NextResponse.json({ error: "No phone number received." });
    }
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    const { data, error } = await supabase
      .from("clients")
      .update({ phoneNumber, firstName, lastName, description })
      .eq("clientId", clientId);
    if (error) {
      console.error(
        "there was a issue updating the phone number in the database",
        error,
      );
    }
    return NextResponse.json({
      ok: "client phone number has been updated.",
      status: 201,
    });
  } catch (error) {
    console.error("Internal server error", error);
    return NextResponse.json({ error: "Something went wrong", status: 500 });
  }
}
