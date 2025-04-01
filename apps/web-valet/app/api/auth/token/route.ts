import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(req: NextRequest) {
  const getCookies = cookies();
  const nextAuthSession =
    (await getCookies).get("next-auth.session-token")?.value || "";
  return NextResponse.json(nextAuthSession);
}
