"use client";

import { useMutation } from "@apollo/client";
import { useFormRegister } from "@parknest/forms/src/register";
import { RegisterWithCredentialsDocument } from "@parknest/network/src/gql/generated";
import { Role } from "@parknest/util/types";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { Button } from "../atoms/Button";
import { Form } from "../atoms/Form";
import { HtmlInput } from "../atoms/HtmlInput";
import { HtmlLabel } from "../atoms/HtmlLabel";

export interface ISignupFormProps {
  className?: string;
  role?: Role;
}

export const RegisterForm = ({}: ISignupFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useFormRegister();

  const [registerWithCredentials, { loading }] = useMutation(
    RegisterWithCredentialsDocument,
  );

  const onSubmit = async (formData: {
    name: string;
    email: string;
    password: string;
  }) => {
    try {
      const { data, errors: mutationErrors } = await registerWithCredentials({
        variables: {
          registerWithCredentialsInput: formData,
        },
      });

      if (mutationErrors?.length) {
        alert(
          `Registration failed: ${mutationErrors.map((err) => err.message).join(", ")}`,
        );
        return;
      }

      if (data) {
        alert(
          `User ${data.registerWithCredentials.uid} created successfully! 🎉`,
        );
        await signIn("credentials", {
          email: formData.email,
          password: formData.password,
          callbackUrl: "/",
        });
      }
    } catch (error) {
      console.error("Error during registration:", error);
      alert("An unexpected error occurred. Please try again later.");
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <HtmlLabel title="Name" error={errors.name?.message}>
        <HtmlInput
          className="text-black"
          placeholder="Enter your name."
          {...register("name")}
        />
      </HtmlLabel>
      <HtmlLabel title="Email" error={errors.email?.message}>
        <HtmlInput
          className="text-black"
          placeholder="Enter your email."
          {...register("email")}
        />
      </HtmlLabel>
      <HtmlLabel title="Password" error={errors.password?.message}>
        <HtmlInput
          className="text-black"
          type="password"
          placeholder="······"
          {...register("password")}
        />
      </HtmlLabel>
      {Object.keys(errors).length > 0 && (
        <div className="text-xs text-gray-600">
          Please fix the above {Object.keys(errors).length} errors.
        </div>
      )}
      <Button type="submit" fullWidth loading={loading}>
        Register
      </Button>
      <div className="mt-4 text-sm">
        Already have a Parknest account?
        <br />
        <Link href="/login" className="font-bold underline underline-offset-4">
          Login
        </Link>{" "}
        now.
      </div>
    </Form>
  );
};
