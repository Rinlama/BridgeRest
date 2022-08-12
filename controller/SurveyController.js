const Survey = require("../models/Survey");

const SurveyController = {
  create: (req, res) => {
    const body = {
      ...req.body.feature.attributes,
      attachments: req.body.feature.attachments,
      geometry: req.body.feature.geometry,
    };

    Survey.create(body)
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
  get: (req, res) => {
    Survey.find()
      .sort({ created_at: -1 })
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
  update: function (req, res) {
    Survey.findOneAndUpdate({ _id: req.params.id }, req.body)
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
};

module.exports = SurveyController;
