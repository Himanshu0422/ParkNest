"use client";
import { IsLoggedIn } from "@parknest/ui/app/components/organisms/isLoggedIn";
import { IsValet } from "@parknest/ui/app/components/organisms/isValet";
import { ValetHome } from "@parknest/ui/app/components/templates/ValetHome";

export default function Home() {
  return (
    <main>
      <IsLoggedIn>
        {(uid) => (
          <IsValet uid={uid}>
            <ValetHome />
          </IsValet>
        )}
      </IsLoggedIn>
    </main>
  );
}
