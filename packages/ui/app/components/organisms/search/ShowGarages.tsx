import { useLazyQuery } from "@apollo/client";
import { useConvertSearchFormToVariables } from "@parknest/forms/src/adapters/searchFormAdapter";
import { SearchGaragesDocument } from "@parknest/network/src/gql/generated";
import { useEffect } from "react";
import { GarageMarker } from "./GarageMarker";

export const ShowGarages = () => {
  const [searchGarages, { data }] = useLazyQuery(SearchGaragesDocument, {
    fetchPolicy: "network-only",
  });

  const { variables } = useConvertSearchFormToVariables();
  useEffect(() => {
    console.log(variables);
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
