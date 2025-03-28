"use client";

import { Suspense } from "react";
import { IsLoggedIn } from "@parknest/ui/app/components/organisms/isLoggedIn";
import { IsManager } from "@parknest/ui/app/components/organisms/isManager";
import { ListGarageBookings } from "@parknest/ui/app/components/templates/ListGarageBookings";
import { useSearchParams } from "next/navigation";

function GarageBookings() {
  const searchParams = useSearchParams();
  const garageId = Number(searchParams.get("garageId"));

  return <ListGarageBookings garageId={garageId} />;
}

export default function Page() {
  return (
    <IsLoggedIn>
      <IsManager>
        <Suspense fallback={<div>Loading...</div>}>
          <GarageBookings />
        </Suspense>
      </IsManager>
    </IsLoggedIn>
  );
}
