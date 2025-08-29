import { NextResponse } from "next/server"
import { supabase } from "@/lib/supabaseClient"
import bcrypt from "bcryptjs"

export async function POST(req: Request) {
    const { name, email, password } = await req.json()

    const hashedPassword = await bcrypt.hash(password, 10)

    const { data, error } = await supabase
        .from("users")
        .insert([{ name, email, hashed_password: hashedPassword }])
        .select()
        .single()

    if (error) return NextResponse.json({ error: error.message }, { status: 400 })

    return NextResponse.json({ user: data })
}
