import { ManageValets } from "@parknest/ui/app/components/templates/ManageValets";
import { IsLoggedIn } from "@parknest/ui/app/components/organisms/isLoggedIn";

export default function Page() {
  return (
    <IsLoggedIn>
      <ManageValets />
    </IsLoggedIn>
  );
}
