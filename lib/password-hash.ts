import { compare, genSalt, hash } from "bcryptjs";

export const hashPassword = async (password: string) => {
  const salt = await genSalt(12);
  return hash(password, salt);
};

export const verifyPassword = async (
  password: string,
  hashedPassword: string
) => {
  const isValid = await compare(password, hashedPassword);
  return isValid;
};
