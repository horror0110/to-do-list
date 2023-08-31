import Todo from "@/models/Todo";
import connectDB from "@/utils/db";
import { NextResponse } from "next/server";

export const GET = async(request , {params})=>{

   await connectDB();

   try{
      const todo =  await Todo.find({email: params.id});
    return new NextResponse(JSON.stringify(todo) , {status: 200 , headers: {"content-type": "application/json"}})
   }
   catch(err){
    return new NextResponse(err.message , {status: 500});
   }
}

export const DELETE = async (request , {params})=> {
   await connectDB();

   try {
      await Todo.findByIdAndDelete(params.id);

      return new NextResponse("Todo has been deleted" , {status:200 , headers: {"content-type": "applicaton/json"}})
   }
   catch(err){
      return new NextResponse(err.message , {status: 500});
   }
}

export const PUT = async (request , {params})=> {
   await connectDB();

   try {

      const {item} = await request.json();

      await Todo.findByIdAndUpdate(params.id , {todo: item});

      return new NextResponse("Todo has been updated" , {status:200 , headers: {"content-type": "applicaton/json"}})
   }
   catch(err){
      return new NextResponse(err.message , {status: 500});
   }
}



