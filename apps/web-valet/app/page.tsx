"use client";
import { IsLoggedIn } from "@parknest/ui/app/components/organisms/isLoggedIn";
import { IsValet } from "@parknest/ui/app/components/organisms/isValet";

export default function Home() {
  return (
    <main>
      <IsLoggedIn>
        {(uid) => <IsValet uid={uid}>Hello valet.</IsValet>}
      </IsLoggedIn>
    </main>
  );
}
