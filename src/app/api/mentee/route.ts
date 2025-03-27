import { NextResponse } from "next/server";

import { dbConnect }from "@/lib/mongodb";
import Mentee from "@/models/Mentee";


export async function POST(request: Request) {
  await dbConnect();


  const userId = session.user.id; // Adjust if your session structure differs

  try {
    const menteeData = await request.json();
    // Associate the mentee data with the authenticated user
    menteeData.userId = userId;
    const newMentee = await Mentee.create(menteeData);
    return NextResponse.json(newMentee, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
