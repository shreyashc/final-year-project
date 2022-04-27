import { NextFunction, Request, Response } from "express";
import { env } from "../env";
import { generateToken, loginUser, MAX_AGE, signUpUser } from "./utils";

const logout = (_req: Request, res: Response) => {
  res.cookie(env.app.cookieName, "", { maxAge: 1 });
  res.redirect("/auth/login");
};

const signup_post = async (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  try {
    const { email, password: plainPassword, role, ...extraDetails } = req.body;

    const { savedUser, error } = await signUpUser(
      email,
      plainPassword,
      role || "visitor",
      { ...extraDetails }
    );
    if (error || !savedUser) {
      throw error;
    }
    const token = generateToken(savedUser.id, savedUser.role, savedUser.email);

    res.cookie(env.app.cookieName, token, {
      httpOnly: true,
      maxAge: MAX_AGE * 1000,
    });
    return res.json({ token });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      error: err,
    });
  }
};

const login_post = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const { loggedInUser: user, error } = await loginUser(email, password);

    if (error || !user) {
      throw error;
    }

    const token = generateToken(user.id, user.role, user.email);

    res.cookie(env.app.cookieName, token, {
      httpOnly: true,
      maxAge: MAX_AGE * 1000,
    });

    return res.json({
      token,
      userId: user.id,
      email: user.email,
      role: user.role,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
};

export { signup_post, login_post, logout };
