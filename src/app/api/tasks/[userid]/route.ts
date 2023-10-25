import { ConnectDB } from "@/libs/mongodb";
import Task from "@/models/task.model";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: any) {
    try {
        // Validar el parámetro "userid" antes de usarlo
        const userId = params.userid;

        if (!userId) {
            return NextResponse.error();
        }

        await ConnectDB();
        const taskData = await Task.findOne({ user: userId }).populate('user');

        if (!taskData) {
            return NextResponse.error();
        }

        return NextResponse.json(taskData);
    } catch (error) {
        console.error(error);
        return NextResponse.error();
    }
}
