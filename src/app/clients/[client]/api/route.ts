import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
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
