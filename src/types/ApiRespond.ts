import mongoose,{Schema, Document} from "mongoose";
import { Message } from "postcss";

export interface ApiResponse{
    success: boolean;
    message: string;
    isAccesptingMessages?: boolean;
    messages?: Array<Message>
}