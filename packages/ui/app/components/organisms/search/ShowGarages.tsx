import { useLazyQuery } from "@apollo/client";
import { useConvertSearchFormToVariables } from "@parknest/forms/src/adapters/searchFormAdapter";
import { SearchGaragesDocument } from "@parknest/network/src/gql/generated";
import { useEffect } from "react";
import { GarageMarker } from "./GarageMarker";

export const ShowGarages = () => {
  const [searchGarages, { loading, data, error }] = useLazyQuery(
    SearchGaragesDocument,
  );
  console.log(error, data, loading);

  const { variables } = useConvertSearchFormToVariables();

  useEffect(() => {
    if (variables)
      searchGarages({
        variables,
      });
  }, [searchGarages, variables]);
  return (
    <>
      {data?.searchGarages.map((garage) => (
        <GarageMarker key={garage.id} marker={garage} />
      ))}
    </>
  );
};
