"use client";

import { FormProviderSearchGarage } from "@parknest/forms/src/searchGarages";
import { SearchPage } from "@parknest/ui/app/components/templates/SearchPage";

export default function Page() {
  return (
    <FormProviderSearchGarage>
      <SearchPage />
    </FormProviderSearchGarage>
  );
}
