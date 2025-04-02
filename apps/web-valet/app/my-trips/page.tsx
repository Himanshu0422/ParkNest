"use client";
import { IsLoggedIn } from "@parknest/ui/app/components/organisms/isLoggedIn";
import { IsValet } from "@parknest/ui/app/components/organisms/isValet";
import { ValetTrips } from "@parknest/ui/app/components/templates/ValetTrips";

export default function Page() {
  return (
    <main>
      <IsLoggedIn>
        {(uid) => (
          <IsValet uid={uid}>
            <ValetTrips uid={uid} />
          </IsValet>
        )}
      </IsLoggedIn>
    </main>
  );
}
