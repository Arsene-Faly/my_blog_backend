import z from "zod";

export const updateUserValidator = z.object({
    userId: z.string(),
    name: z.string()
          .nonempty("Le nom est requis")
          .trim()
          .min(2)
          .max(255),
    email: z.string()
           .nonempty("L'email est requis")
           .trim()
          .email("L'email n'est pas valide")
          .max(255),
});