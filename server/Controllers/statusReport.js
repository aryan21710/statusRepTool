const StatusModel = require("../Models/statusReport");
const async = require("async");

const postStatus = (req, res) => {
  console.log("req.body", req.body);

  if (req.body == null) {
    return res.status(400).send("NO STATUS REPORT RECEVIED FROM THE FRONTEND.");
  }

  const userId = req.signedInUser._id;
  console.log(`request came for ${userId}`);

  StatusModel.find({ _id: userId })
    .populate("userIdForBackend")
    .exec((err, report) => {
      if (err || !report) {
        return res
          .status(401)
          .json({ error: `NO STATUS report FOUND FOR ${userId}` });
      }
      console.log("report found", report);
      const { reportsWithUserIdAppended } = req.body;

      // ASYNC FOREACH TO ITERATE OVER ASYNC OPERATION IN AN ARRAY.
      async.each(reportsWithUserIdAppended, function(report,callback) {
        console.log(`iterating over report ${JSON.stringify(report)}`);
        const statusDocument = new StatusModel(report);

        statusDocument.save((error, report) => {
          console.log("error", error);
          console.log("STATUS REPORT SUCCESSFULLY SAVED", report);
          error ? callback(error) : callback()
          
        });
      }, function(err) {
           console.log('in err block')
          return err ? res.status(400).json({error: err}) : res.json({message: "ALL REPORTS SAVED"})
      });
    });
};

const getAllStatusReports = (req, res) => {
  const userId = req.signedInUser._id;
  console.log(`REQUEST TO GETALLSTATUS CAME FOR ${userId}`);
  StatusModel.find({ userIdForBackend: userId }).exec((err, reports) => {
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
