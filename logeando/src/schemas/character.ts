import { z } from "zod";

export const characterSchema = z.object({
  name: z
    .string({ required_error: "name requerido" })
    .min(5, { message: "5 letras minimo" })
    .max(10, { message: "10 como máximo" }),
  defense: z
    .string({ required_error: "Ingrese un valor" })
    .min(1, { message: "La defensa minima es 0" })
    .max(3, { message: "La defensa máxima es 500" }),
  // .transform((value) => {
  //   const num = Number(value);
  //   return isNaN(num) ? 0 : num; // Convierte a número si es posible
  // })
  // .refine((value) => value >= 0 && value <= 500, {
  //   message: "El valor de 'defense' debe estar entre 0 y 500.",
  // }),

  autohealth: z
    .string({ required_error: "auto cura de vida requerida 0-100" })
    .min(1, { message: "La autosalud minima es 0" })
    .max(3, { message: "La autosalud máxima es 100" }),
  // .transform((value) => {
  //   const num = Number(value);
  //   return isNaN(num) ? 0 : num; // Convierte a número si es posible
  // })
  // .refine((value) => value >= 0 && value <= 100, {
  //   message: "El valor de 'autohealth' debe estar entre 0 y 100.",
  // }),
  weapon_name: z
    .string({
      required_error: "Arma requerida (Excalibur | NitroExp)",
    })
    .refine((value) => value === "Excalibur" || value === "NitroExp", {
      message: "El nombre del arma debe ser 'Excalibur' o 'NitroExp'.",
    }),
});

export type characterForm = z.infer<typeof characterSchema>;
