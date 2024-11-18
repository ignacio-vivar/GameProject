import { z } from "zod";

export const userSchema = z.object({
  username: z
    .string({ required_error: "username requerido" })
    .min(8, { message: "Ingrese un username valido" }),

  password: z
    .string({ required_error: "password requerido" })
    .min(8, { message: "Ingrese una contraseña valido" }),
});

export type userForm = z.infer<typeof userSchema>;
