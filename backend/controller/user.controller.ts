import user from "../model/user.model.ts";
import { z } from "zod";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import type { Request, Response } from "express";

const userSchema = z.object({
  username: z.string().min(6, "Username must be at least 6 characters long"),
  email: z.string().email("Invalid email address!"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});


const generatedToken = (userId: string) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET as string, { expiresIn: process.env.JWT_EXPIRY } as any);
};

export const registerUser = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({ message: "All fields are required!" });
  }

  const existingUser = await user.findOne({ email });
  if (existingUser) {
    return res
      .status(400)
      .json({ message: "User with this email already exists!" });
  }

  const validation = userSchema.safeParse(req.body);
  if (!validation.success) {
    return res.status(400).json({
      message: "Validation failed!",
      errors: validation.error.message,
    });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const newuser = new user({
      username,
      email,
      password: hashedPassword,
    });
    const savedUser = await newuser.save();
    const token = generatedToken(savedUser._id.toString());


    res
      .cookie("token", token,{
        httpOnly:true,
        secure:false,
        sameSite:"lax",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .status(201)
      .json({ message: "User registered successfully!", user: newuser, "token":token});
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error registering user", error });
  }
};



export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Email and password are required!" });
  }
  const validation = userSchema.safeParse(req.body);
  const existingUser = await user.findOne({ email });
  if (!existingUser) {
    return res.status(400).json({ message: "Invalid email or password!" });
  }
  try {
    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password,
    );
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid email or password!" });
    }
    const token = generatedToken(existingUser._id.toString());
    res
    .cookie("token", token, {
      httpOnly:true,
      secure:false,
      sameSite:"lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    })
    .status(200)
    .json({ message: "Login successful!", user: existingUser, token });
  } catch (error) {}
};

export const logoutUser = async (req: Request, res: Response) => {
  res.cookie("token","",{
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "Logout successful!" });
};
