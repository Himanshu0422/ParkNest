import { useLazyQuery } from "@apollo/client";
import { FormTypeSearchGarage } from "@parknest/forms/src/searchGarages";
import { SearchGaragesDocument } from "@parknest/network/src/gql/generated";
import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { GarageMarker } from "./GarageMarker";

export const ShowGarages = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [searchGarages, { loading, data, error }] = useLazyQuery(
    SearchGaragesDocument,
  );
  console.log(error, data, loading);

  const { watch } = useFormContext<FormTypeSearchGarage>();
  const { endTime: end, startTime: start, locationFilter } = watch();

  useEffect(() => {
    searchGarages({
      variables: { dateFilter: { end, start }, locationFilter },
    });
  }, [end, locationFilter, searchGarages, start]);
  return (
    <>
      {data?.searchGarages.map((garage) => (
        <GarageMarker key={garage.id} marker={garage} />
      ))}
    </>
  );
};
