import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function PUT(req: Request) {
  try {
    const { activeClientStatus, clientId } = await req.json();

    if (activeClientStatus === null) {
      return NextResponse.json({
        error: "No active status received",
        status: 500,
      });
    }
    console.log(activeClientStatus);
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const { error } = await supabase
      .from("clients")
      .update({ activeClientStatus: activeClientStatus })
      .eq("clientId", clientId);

    if (error) {
      console.error(
        "There was an issue updating the Active Status of the client.",
        error,
      );
    }
    return NextResponse.json({
      ok: "Client Active Status has been successfully updated.",
      status: 200,
    });
  } catch (error) {
    console.error("There was an internal server error", error);
    return NextResponse.json({ error: "Something went wrong.", status: 500 });
  }
}
