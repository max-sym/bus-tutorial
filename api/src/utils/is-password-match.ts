import bcrypt from "bcryptjs"

export const isPasswordMatch = async (password: string, password2: string) =>
  bcrypt.compare(password, password2)
