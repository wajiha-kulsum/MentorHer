import { NextResponse } from "next/server";

import { dbConnect } from "@/lib/mongodb";
import Mentee from "@/models/Mentee";


export async function GET() {
  await dbConnect();




  try {
    const mentee = await Mentee.findOne({ userId });
    if (!mentee) {
      return NextResponse.json({ message: "Mentee profile not found" }, { status: 404 });
    }
    return NextResponse.json(mentee, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
