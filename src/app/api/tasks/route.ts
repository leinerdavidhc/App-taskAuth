import { ConnectDB } from "@/libs/mongodb";
import Task from "@/models/task.model";
import User from "@/models/user.model";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    await ConnectDB();
    const { title, description, user } = await request.json();

    const UserFound = await User.findById(user);

    if (UserFound) {
      const task = await new Task({
        title,
        description,
        user,
      });
      const TaskSave = await task.save();
      return NextResponse.json({
        title,
        description,
        user: TaskSave.user,
        createdAt: TaskSave.createdAt,
        updatedAt: TaskSave.updatedAt,
      });
    } else {
      console.log("user does not exist");

      return NextResponse.json(
        {
          message: "user does not exist",
        },
        {
          status: 400,
        }
      );
    }
  } catch (error) {
    console.log(error);
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
