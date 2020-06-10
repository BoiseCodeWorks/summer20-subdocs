import mongoose from "mongoose";
import { dbContext } from "../db/DbContext"

class QuestionsService {



  async getAll() {
    return await dbContext.Questions.find({});
  }
  async create(rawData) {
    return await dbContext.Questions.create(rawData);
  }
  async delete(id) {
    await dbContext.Questions.findByIdAndDelete(id);
  }
  async addOption(id, body) {
    return await dbContext.Questions.findOneAndUpdate({ _id: id }, { $addToSet: { options: body } }, { new: true })
  }
  async deleteOption(id, optionId) {
    return await dbContext.Questions.findOneAndUpdate({ _id: id }, { $pull: { options: { _id: optionId } } }, { new: true })
  }

}

const questionService = new QuestionsService();
export default questionService;
