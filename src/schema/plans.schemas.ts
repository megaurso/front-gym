import { z } from "zod";

export const plansSchema = z.object({
  name: z.string().nonempty("Nome do plano é obrigatório!"),
  price: z.number().positive("Deve ser um valor positivo"),
  validity: z.enum(["Mensal", "Trimestral", "Semestral", "Anual"]),
  created_at: z.string(),
  updated_at: z.string(),
});

export const infoPlans = plansSchema.extend({
  id: z.string(),
});

export type PlansInfo = z.infer<typeof infoPlans>;
