import { ListCustomerBookings } from "@parknest/ui/app/components/templates/ListCustomerBookings";
import { IsLoggedIn } from "@parknest/ui/app/components/organisms/isLoggedIn";

export default function Page() {
  return (
    <IsLoggedIn>
      <ListCustomerBookings />
    </IsLoggedIn>
  );
}
