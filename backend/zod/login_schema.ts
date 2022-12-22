import { z } from "zod";

const loginSchema = z.object({
  body: z.object({
    email: z.string({ required_error: "Kolom email wajib diisi" }).email("Email tidak valid"),
    password: z.string({ required_error: "Kolom password wajib diisi" }).min(4, "Password minimal terdiri dari 4 karakter")
  })
});

export default loginSchema;
