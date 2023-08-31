import Todo from "@/models/Todo";

import connectDB from "@/utils/db";

import { NextResponse } from "next/server";


export const POST = async(request)=>{

    const {email , todo} = await request.json();

    await connectDB();

    const newTodo = new Todo({
      email,
      todo
    });

    try {

        await Todo.create(newTodo);

        
      return new NextResponse( "Todo has been created", {
        status: 200,
        headers: { "content-type": "application/json" },
      });

    }
    catch(err){
       return new NextResponse(err.message , {status: 500});
    }

}


