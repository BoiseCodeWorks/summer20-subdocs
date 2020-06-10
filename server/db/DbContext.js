import ValueSchema from "../models/Value.js";
import QuestionSchema from "../models/Question.js"
import mongoose from "mongoose";

class DbContext {
  Values = mongoose.model("Value", ValueSchema);
  Questions = mongoose.model("Question", QuestionSchema);
}

export const dbContext = new DbContext();
