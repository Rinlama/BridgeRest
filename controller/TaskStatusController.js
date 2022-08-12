const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");
const TaskStatus = require("../models/TaskStatus");

const TaskStatusController = {
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
    TaskStatus.bulkWrite(bulkOps)
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
  create: (req, res) => {
    TaskStatus.create(req.body)
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
  get: (req, res) => {
    const role = req.user.roles.map((d) => d.name === "Admin_Role")[0];
    if (role) {
      TaskStatus.find()
        .sort({ created_at: 1 })
        .populate("task")
        .populate("survey")
        .populate({
          path: "current_position",
          populate: {
            path: "taskParams",
            model: "TaskParams",
          },
        })
        .populate({
          path: "history",
          populate: {
            path: "taskParams",
            model: "TaskParams",
          },
        })
        .then((dbModel) => res.json(dbModel))
        .catch((err) => res.status(422).json(err));
    } else {
      TaskStatus.find()
        .sort({ created_at: -1 })
        .populate("task")
        .populate("survey")
        .populate({
          path: "current_position",
          match: { status: "pending" },
          populate: {
            path: "taskParams",
            model: "TaskParams",
            match: { distribution: req.user.email },
          },
        })
        .populate({
          path: "history",
          populate: {
            path: "taskParams",
            model: "TaskParams",
          },
        })
        .then((dbModel) => res.json(dbModel))
        .catch((err) => res.status(422).json(err));
    }
  },
  update: function (req, res) {
    TaskStatus.findOneAndUpdate({ _id: req.body._id }, req.body)
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));

    // TaskStatus.deleteOne({ _id: req.query.id })
    //   .then((dbModel) => {
    //         TaskStatus.create(req.body)
    //           .then((dbModel) => res.json(dbModel))
    //           .catch((err) => res.status(422).json(err));
    //   })
    //   .catch((err) => res.status(422).json(err));
  },
  delete: function (req, res) {
    TaskStatus.deleteOne({ _id: req.query.id })
      .then((dbModel) => {
        res.json(dbModel);
      })
      .catch((err) => res.status(422).json(err));
  },
};

module.exports = TaskStatusController;
