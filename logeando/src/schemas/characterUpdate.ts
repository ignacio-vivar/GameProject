import { z } from "zod";

export const characterUpdateSchema = z.object({
  name: z.string({ required_error: "name requerido" }),
  defense: z.string({ required_error: "Ingrese un valor" }),

  autohealth: z.string({ required_error: "auto cura de vida requerida 0-100" }),

  weapon_name: z.string({
    required_error: "Arma requerida (Excalibur | NitroExp)",
  }),
});

export type characterUpdateForm = z.infer<typeof characterUpdateSchema>;
