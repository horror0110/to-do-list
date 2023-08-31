import Todo from "@/models/Todo";
import connectDB from "@/utils/db"
import { NextResponse } from "next/server";

export const DELETE = async(request , {params})=>{

    await connectDB();
    try {

        await Todo.deleteMany({email: params.id});

        return new NextResponse("all todo has been deleted" , {status: 200 , headers: {"content-type" :"application/json"}})

    }
    catch(err){
        return new NextResponse(err.message , {status: 500});
    }

  
}