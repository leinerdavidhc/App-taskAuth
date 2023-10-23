import { ConnectDB } from "@/libs/mongodb";
import Task from "@/models/task.model";
import { NextResponse } from "next/server";

export async function GET(request:Request,{params}:any){
    try {
        await ConnectDB()
        const TaskData=await Task.findOne({user:params.userid}).populate('user')
        return NextResponse.json(TaskData)
    } catch (error) {
        console.log(error);
        return NextResponse.error()
    }
}