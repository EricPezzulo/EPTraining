import { createClient } from "@/utils/supabase/server"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export async function PUT (req:Request){
    try{
        const activeStatus = req.json()
        if(!activeStatus){
            return NextResponse.json({error:"No active status received", status:500 })
        }
        const cookieStore = cookies()
        const supabase = createClient(cookieStore);

        const {data, error} = await supabase.from('clients').update("")
    }catch{

    }
}