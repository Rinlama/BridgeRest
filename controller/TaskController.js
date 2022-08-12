const Task = require("../models/Task");
const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");
const TaskParams = require("../models/TaskParams");

const TaskController = {
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
    Task.bulkWrite(bulkOps)
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
  create: (req, res) => {
    Task.create(req.body)
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
  get: (req, res) => {
    Task.find()
      .populate("task_params")
      .sort({ created_at: 1 })
      .then((dbModel) => {
        res.json(dbModel);
      })
      .catch((err) => res.status(422).json(err));
  },
  update: function (req, res) {
    Task.findOneAndUpdate({ _id: req.params.id }, req.body)
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
  delete: function (req, res) {
    Task.deleteOne({ _id: req.query.id })
      .then((dbModel) => {
        TaskParams.deleteMany({ task: req.query.id }, function (err, docs) {
          if (err) {
            console.log(err);
          }
        });
        res.json(dbModel);
      })
      .catch((err) => res.status(422).json(err));
  },
};

module.exports = TaskController;
