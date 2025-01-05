import { z } from "zod";

export const formSchemaRegister = z.object({
  name: z.string().nonempty({ message: "Name is required." }),
  image: z.string().optional(),
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long." }),
});

export const formSchemaLogin = formSchemaRegister.pick({
  email: true,
  password: true,
});
