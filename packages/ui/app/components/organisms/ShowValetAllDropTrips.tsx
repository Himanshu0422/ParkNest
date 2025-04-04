import { useQuery } from "@apollo/client";
import {
  BookingStatus,
  ValetDropsDocument,
} from "@parknest/network/src/gql/generated";
import { useTakeSkip } from "@parknest/util/hooks/pagination";
import { AssignValetButton } from "./AssignValetButton";
import { ShowData } from "./ShowData";
import { ValetTripCard } from "./ValetTripCard";

export const ShowValetAllDropTrips = () => {
  const { loading, data } = useQuery(ValetDropsDocument);
  const { setSkip, setTake, skip, take } = useTakeSkip();
  return (
    <ShowData
      loading={loading}
      pagination={{
        setSkip,
        setTake,
        skip,
        take,
        resultCount: data?.valetDrops.length || 0,
        totalCount: data?.valetDropsTotal || 0,
      }}
    >
      {data?.valetDrops.map((booking) => (
        <ValetTripCard
          key={booking.id}
          booking={{
            id: booking.id,
            time: booking.endTime,
          }}
          end={{
            lat: booking.valetAssignment?.returnLat || undefined,
            lng: booking.valetAssignment?.returnLng || undefined,
          }}
          start={booking.slot.garage.address}
        >
          <AssignValetButton
            bookingId={booking.id}
            status={BookingStatus.ValetAssignedForCheckOut}
          >
            Accept
          </AssignValetButton>
        </ValetTripCard>
      ))}
    </ShowData>
  );
};
