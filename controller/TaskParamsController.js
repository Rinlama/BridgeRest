const TaskParams = require("../models/TaskParams");
const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");
const Task = require("../models/Task");

const TaskParamsController = {
  createMany: (req, res) => {
    const bulkOps = req.body.map((d) => {
      return {
        updateOne: {
          filter: { _id: ObjectId(d._id) },
          update: d,
          upsert: true,
        },
      };
    });
    TaskParams.bulkWrite(bulkOps)
      .then((dbModel) => {
        const upserted = dbModel.result.upserted;
        if (upserted) {
          upserted.map((d) => {
            if (d._id) {
              Task.findOneAndUpdate(
                { _id: req.body.filter((d) => d.Task != "")[0].Task },
                { $push: { task_params: d._id } },
                { new: true }
              ).exec();
            }
          });
        }

        return res.json(dbModel);
      })
      .catch((err) => res.status(422).json(err));
  },
  create: (req, res) => {
    TaskParams.create(req.body)
      .then((dbModel) => {
        Task.findOneAndUpdate(
          { _id: req.params.Task },
          { task_params: dbModel._id },
          { new: true }
        );
        res.json(dbModel);
      })
      .catch((err) => res.status(422).json(err));
  },
  get: (req, res) => {
    TaskParams.find({ Task: req.query.task })
      .sort({ created_at: 1 })
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
  update: function (req, res) {
    TaskParams.findOneAndUpdate({ _id: req.params.id }, req.body)
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
  delete: function (req, res) {
    TaskParams.deleteOne({ _id: req.query.id })
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
};

module.exports = TaskParamsController;
