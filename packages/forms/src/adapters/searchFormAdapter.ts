import {
  SearchGaragesQueryVariables,
  SlotWhereInput,
} from "@parknest/network/src/gql/generated";
import { useDebounce } from "@parknest/util/hooks/async";
import { useEffect, useMemo, useRef, useState } from "react";
import { FieldNamesMarkedBoolean, useFormContext } from "react-hook-form";
import { FormTypeSearchGarage } from "../searchGarages";
import { intFilter } from "./util";

type FormData = Partial<
  Pick<
    FormTypeSearchGarage,
    | "endTime"
    | "startTime"
    | "height"
    | "length"
    | "width"
    | "pricePerHour"
    | "types"
    | "locationFilter"
    | "skip"
    | "take"
  >
>;

export const useConvertSearchFormToVariables = () => {
  const [variables, setVariables] =
    useState<SearchGaragesQueryVariables | null>(null);

  const previousVariables = useRef<SearchGaragesQueryVariables | null>(null);

  const {
    formState: { dirtyFields },
    watch,
  } = useFormContext<FormTypeSearchGarage>();

  const formData = watch();
  const debouncedFormData = useDebounce(formData, 1000);

  const newVariables = useMemo(() => {
    const {
      endTime,
      startTime,
      locationFilter,
      length,
      width,
      height,
      pricePerHour,
      types,
      skip,
      take,
    } = debouncedFormData;

    if (!startTime || !endTime || !locationFilter) return null;

    const dateFilter: SearchGaragesQueryVariables["dateFilter"] = {
      start: startTime,
      end: endTime,
    };

    const slotsFilter = createSlotsFilter(dirtyFields, {
      length,
      width,
      height,
      pricePerHour,
      types,
    });

    const garagesFilter = createGaragesFilter(dirtyFields, { skip, take });

    return {
      dateFilter,
      locationFilter,
      ...(Object.keys(slotsFilter).length && {
        slotsFilter: slotsFilter as SlotWhereInput,
      }),
      ...(Object.keys(garagesFilter).length && { garagesFilter }),
    };
  }, [debouncedFormData, dirtyFields]);

  useEffect(() => {
    if (
      JSON.stringify(newVariables) !== JSON.stringify(previousVariables.current)
    ) {
      setVariables(newVariables);
      previousVariables.current = newVariables;
    }
  }, [newVariables]);

  return { variables };
};

export const createSlotsFilter = (
  dirtyFields: FieldNamesMarkedBoolean<FormTypeSearchGarage>,
  formData: FormData,
) => {
  const length = dirtyFields.length && intFilter(formData.length);
  const width = dirtyFields.width && intFilter(formData.width);
  const height = dirtyFields.height && intFilter(formData.height);
  const pricePerHour =
    dirtyFields.pricePerHour && intFilter(formData.pricePerHour);

  const type =
    dirtyFields.types && formData.types?.length
      ? { in: formData.types }
      : undefined;

  return {
    ...(length && { length }),
    ...(width && { width }),
    ...(height && { height }),
    ...(pricePerHour && { pricePerHour }),
    ...(type && { type }),
  };
};

export const createGaragesFilter = (
  dirtyFields: FieldNamesMarkedBoolean<FormTypeSearchGarage>,
  formData: FormData,
) => {
  const skip =
    dirtyFields.skip && formData.skip !== undefined ? formData.skip : undefined;
  const take =
    dirtyFields.take && formData.take !== undefined ? formData.take : undefined;

  return {
    ...(skip !== undefined && { skip }),
    ...(take !== undefined && { take }),
  };
};
