"use client";
import { useFormLogin } from "@parknest/forms/src/login";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "../atoms/Button";
import { Form } from "../atoms/Form";
import { HtmlInput } from "../atoms/HtmlInput";
import { HtmlLabel } from "../atoms/HtmlLabel";

export interface ILoginFormProps {
  className?: string;
}

export const LoginForm = ({}: ILoginFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useFormLogin();

  const { replace } = useRouter();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: { email: string; password: string }) => {
    setLoading(true);

    try {
      const { email, password } = data;

      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.ok) {
        replace("/");
      } else {
        alert("Login failed. Please try again.");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("An unexpected error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <HtmlLabel title="Email" error={errors.email?.message}>
        <HtmlInput
          className="text-black"
          {...register("email", { required: "Email is required" })}
          placeholder="email"
        />
      </HtmlLabel>
      <HtmlLabel title="Password" error={errors.password?.message}>
        <HtmlInput
          className="text-black"
          type="password"
          {...register("password", { required: "Password is required" })}
          placeholder="******"
        />
      </HtmlLabel>

      <Button type="submit" loading={loading}>
        Submit
      </Button>

      <div className="mt-4 text-sm">
        Do not have an ParkNest account?
        <br />
        <Link
          href="/register"
          className="font-bold underline underline-offset-4"
        >
          Create one
        </Link>{" "}
        now.
      </div>
    </Form>
  );
};
