"use client";

import { IsLoggedIn } from "@parknest/ui/app/components/organisms/isLoggedIn";
import { IsManager } from "@parknest/ui/app/components/organisms/isManager";
import { ListGarages } from "@parknest/ui/app/components/organisms/ListGarages";

export default function Home() {
  return (
    <IsLoggedIn>
      <IsManager>
        {(companyId) => <ListGarages companyId={companyId} />}
      </IsManager>
    </IsLoggedIn>
  );
}
