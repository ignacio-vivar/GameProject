import { z } from "zod";

export const weaponSchema = z.object({
  name: z
    .string({ required_error: "name requerido" })
    .min(6, { message: "El minimo es 6 de longitud" })
    .max(12, { message: "El maximo es 12" }),
  damage: z
    .string({ required_error: "Ingrese un valor" })
    .min(1, { message: "El daño minimo es 10" })
    .max(4, { message: "El daño máximo es 1000" }),
});

export type weaponForm = z.infer<typeof weaponSchema>;
