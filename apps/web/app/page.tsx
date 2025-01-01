"use client";

import { add } from "@parknest/sample-package";
import { useQuery } from "@apollo/client";
import { CompaniesDocument } from "@parknest/network/src/gql/generated";

export default function Home() {
  const { data } = useQuery(CompaniesDocument);

  return (
    <main>
      Hello {add(343, 3)}
      <div>
        {data?.companies.map((company) => (
          <div className="p-4 rounded" key={company.id}>
            <div>{company.displayName}</div>
            <div>{company.id}</div>
          </div>
        ))}
      </div>
    </main>
  );
}
