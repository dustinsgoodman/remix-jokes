import bcrypt from "bcryptjs";
import { db } from "./db.server"

type LoginForm = {
  username: string;
  password: string;
};

export const login = async ({
  username,
  password,
}: LoginForm) => {
  const user = await db.user.findUnique({
    where: { username },
  });
  if (!user) {
    return null;
  }

  const isCorrectPassword = await bcrypt.compare(
    password,
    user.passwordHash
  );
  if (!isCorrectPassword) {
    return null;
  }

  return user;
}
