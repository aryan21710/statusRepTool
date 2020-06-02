const StatusModel = require("../Models/statusReport");

const postStatus = (req, res) => {
  if (req.body == null || !req.body.statusReport) {
    return res.status(400).send("NO STATUS REPORT RECEVIED FROM THE FRONTEND.");
  }

  const userId = req.signedInUser._id;
  const { statusReport } = req.body;

  StatusModel.find({ _id: userId }).exec((err, report) => {
    if (err || !report) {
      return res
        .status(401)
        .json({ error: `NO STATUS report FOUND FOR ${userId}` });
    }
    console.log("report found", report);

    const statusDocument = new StatusModel(statusReport);

    statusDocument.save((error, report) => {
      console.log("error", error);
      console.log("report", report);
      if (error) {
        return res.status(400).json({
          error: "FAILED TO SAVE STATUS REPORT ON THE BACKEND.",
        });
      }
      console.log("STATUS REPORT SUCCESSFULLY SAVED", report);
      return res.send(report);
    });
  });
};

const getAllStatusReports = (req, res) => {
  const userId = req.signedInUser._id;
  StatusModel.find({ _id: userId }).exec((err, reports) => {
    if (err || !reports) {
      return res
        .status(401)
        .json({ error: `NO STATUS reports FOUND FOR ${userId}` });
    }
    console.log("reports found", reports);
    return res.send(reports);
  });
};

module.exports = { postStatus, getAllStatusReports };
