import questionService from "../services/QuestionsService";
import BaseController from "../utils/BaseController";

export class QuestionsController extends BaseController {


  constructor() {
    super("api/questions");
    this.router
      //NOTE  each route gets registered as a .get, .post, .put, or .delete, the first parameter of each method is a string to be concatinated onto the base url registered with the route in main. The second parameter is the method that will be run when this route is hit.
      .get("", this.getAll)
      .post("", this.create)
      .post("/:id/options", this.createOption)
      .delete("/:id", this.delete)
      .delete("/:id/options/:optionId", this.deleteOption)
  }

  async createOption(req, res, next) {
    try {
      let newQuestion = await questionService.addOption(req.params.id, req.body)
      if (newQuestion) {
        res.send(newQuestion)
      }

    } catch (error) {
      next(error)
    }
  }

  async deleteOption(req, res, next) {
    try {
      await questionService.deleteOption(req.params.id, req.params.optionId)
      res.send("option deleted")
    } catch (error) {
      next(error)
    }
  }

  async getAll(req, res, next) {
    try {
      let data = await questionService.getAll();
      return res.send(data);
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    try {
      let data = await questionService.create(req.body)
      res.send(data)
    } catch (error) { next(error) }
  }

  async delete(req, res, next) {
    try {
      await questionService.delete(req.params.id);
      res.send("deleted")
    } catch (error) {
      next(error)
    }
  }


}
