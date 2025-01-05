import { LoginForm } from "@parknest/ui/app/components/templates/LoginForm";
import { AuthLayout } from "@parknest/ui/app/components/molecules/AuthLayout";

export default function Page() {
  return (
    <AuthLayout title={"Login"}>
      <LoginForm />
    </AuthLayout>
  );
}
