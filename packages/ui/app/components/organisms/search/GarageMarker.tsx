import { FormProviderBookSlot } from "@parknest/forms/src/bookSlot";
import { FormTypeSearchGarage } from "@parknest/forms/src/searchGarages";
import { SearchGaragesQuery } from "@parknest/network/src/gql/generated";
import { useKeypress } from "@parknest/util/hooks/keys";
import { useState } from "react";
import { useWatch } from "react-hook-form";
import { Dialog } from "../../atoms/Dialog";
import { ParkingIcon } from "../../atoms/ParkingIcon";
import { BookSlotPopup } from "../BookSlotPopup";
import { Marker } from "../map/MapMarker";

export const GarageMarker = ({
  marker,
}: {
  marker: SearchGaragesQuery["searchGarages"][number];
}) => {
  const { endTime, startTime } = useWatch<FormTypeSearchGarage>();

  const [showPopup, setShowPopup] = useState(false);
  useKeypress(["Escape"], () => setShowPopup(false));
  if (!marker.address?.lat || !marker.address.lng) {
    return null;
  }

  return (
    <>
      <Dialog
        title="Booking"
        widthClassName="max-w-3xl"
        open={showPopup}
        setOpen={setShowPopup}
      >
        <FormProviderBookSlot defaultValues={{ endTime, startTime }}>
          <BookSlotPopup garage={marker} />
        </FormProviderBookSlot>
      </Dialog>
      <Marker
        latitude={marker.address.lat}
        longitude={marker.address.lng}
        onClick={(e) => {
          e.originalEvent.stopPropagation();
          setShowPopup((state) => !state);
        }}
      >
        <ParkingIcon />
      </Marker>
    </>
  );
};
