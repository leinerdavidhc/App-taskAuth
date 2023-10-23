import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { ConnectDB } from "@/libs/mongodb";
import User from "@/models/user.model";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  try {
    await ConnectDB();
    const { username, email, password } = await request.json();

    if (password.length < 6) {
      return NextResponse.json(
        {
          message: "Passwor is valid",
        },
        {
          status: 409,
        }
      );
    }

    const UserFound = await User.findOne({ email });
    if (UserFound) {
      return NextResponse.json(
        {
          message: "this user already exists",
        },
        { status: 400 }
      );
    }

    const passwordhash = await bcrypt.hash(password, 12);

    const user = await new User({
      username,
      email,
      password: passwordhash,
    });

    const UserSave = await user.save();
    console.log(UserSave);

    return NextResponse.json(
      {
        username: UserSave.username,
        email: UserSave.email,
        createdAt: UserSave.createdAt,
        updatedAt: UserSave.updatedAt,
      },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return NextResponse.json(
        {
          message: error.message,
        },
        {
          status: 400,
        }
      );
    }
    return NextResponse.error();
  }
}
