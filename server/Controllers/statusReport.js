const StatusModel = require("../Models/statusReport");
const async = require("async");

const postStatus = (req, res) => {
  console.log("*************************************************");

  const { reportsWithUserIdAppended } = req.body;
  console.log("reportsWithUserIdAppended", reportsWithUserIdAppended);

  if (req.body == null) {
    return res.status(400).send("NO STATUS REPORT RECEVIED FROM THE FRONTEND.");
  }

  const userId = req.signedInUser._id;
  console.log(`request came for ${userId}`);

  StatusModel.find({ userIdForBackend: userId })
    .populate("userIdForBackend")
    .exec((err, report) => {
      if (err || !report) {
        return res
          .status(401)
          .json({ error: `NO STATUS report FOUND FOR ${userId}` });
      }
      console.log("no of reports present", report);

      // ASYNC FOREACH TO ITERATE OVER ASYNC OPERATION IN AN ARRAY.
      async.each(
        reportsWithUserIdAppended,
        function(report, callback) {
          const statusDocument = new StatusModel(report);

          statusDocument.save((error, report) => {
            console.log("error", error);
            error ? callback(error) : callback();
          });
        },
        function(err) {
          return err
            ? res.status(400).json({ error: err })
            : res.send(reportsWithUserIdAppended);
        }
      );
    });
};

const getAllStatusReports = (req, res) => {
    console.log("******************************getAllStatusReports*******************");
  const userId = req.signedInUser._id;
  console.log('getAllStatusReports req.body',req.body)
  console.log(`REQUEST TO GETALLSTATUS CAME FOR ${userId}`);
  StatusModel.find({ userIdForBackend: userId }).exec((err, reports) => {
    if (err || !reports) {
      return res
        .status(401)
        .json({ error: `NO STATUS reports FOUND FOR ${userId}` });
    }
    return res.send(reports);
  });
};

module.exports = { postStatus, getAllStatusReports };
