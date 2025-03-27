import { RegisterForm } from "@parknest/ui/app/components/templates/RegisterForm";
import { AuthLayout } from "@parknest/ui/app/components/molecules/AuthLayout";

export default function Page() {
  return (
    <AuthLayout title={"Register"}>
      <RegisterForm />
    </AuthLayout>
  );
}
