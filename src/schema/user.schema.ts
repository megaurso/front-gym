import { z } from "zod";

export const userSchema = z.object({
  name: z.string().nonempty("Nome é obrigatório!"),
  email: z.string().email("Email não é valido").nonempty("Email é obrigatório"),
  password: z.string().nonempty("Senha é obrigatória"),
  cpf: z.string().nonempty("Cpf é obrigatório"),
  phone: z.string().nonempty("Por favor insira um numero de telefone"),
  isAdmin: z.boolean().optional(),
  current_plan: z.string().optional(),
  ativo: z.boolean().optional()
});

export const infoUser = userSchema.extend({
  id: z.string(),
});

export const infoUserEdit = userSchema.extend({
  current_plan: z.string().optional(), 
  name: z.string().optional(),
  email: z.string().email("Email não é valido").optional(),
  cpf: z.string().optional(),
  phone: z.string().optional(),
});



export const loginSchema = userSchema.omit({
  name: true,
  phone: true,
  isAdmin: true,
  cpf: true,
});

export type UserInfoType = z.infer<typeof infoUser>;
export type InfoUserEdit = z.infer<typeof infoUserEdit>
export type UserData = z.infer<typeof userSchema>;
export type LoginData = z.infer<typeof loginSchema>;
