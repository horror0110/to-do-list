import {mongoose} from "mongoose";
import { Schema } from "mongoose";

const TodoSchema = new Schema({
    email: {
        type:String,
    },
    todo: [{
        type: String,
        required: true
    }],
    createdData: {
        type:Date,
        default: Date.now()
    }
})

export default mongoose.models.Todo || mongoose.model("Todo", TodoSchema);