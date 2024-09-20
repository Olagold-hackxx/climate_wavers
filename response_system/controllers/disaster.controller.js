const catchAsyncErrors = require("../lib/catchAsync");
const validator = require("../services/validator.service");
const disasterService = require("../services/disaster.service");
const aiService = require("../services/ai.service");
const { sendToQueue } = require("../lib/amqp");
const { getDefaultChannel } = require("../config/channels");
const queues = require("../constants/queues");
exports.createDisaster = catchAsyncErrors(async (req, res) => {
  const validateResponse = validator.validateCreateDisasterPayload(req.body);
  if (validateResponse.error)
    return res.status(400).json({ message: validateResponse.error.message });
  const disaster = await disasterService.createDisaster({
    ...validateResponse.value,
  });

  const recommendation = await aiService.getSafetyRecommendations(disaster.disasterType, disaster.magnitude)
  await sendToQueue(getDefaultChannel, queues.disaster_alert, {disasterType: disaster.disasterType, city: disaster.region})
  return res.status(201).json({disaster, recommendation});
});

exports.getDisasters = catchAsyncErrors(async (req, res) => {
  const { startDate, endDate, type, status } = req.query;
  const page = req.query.page || 1;
  const pageSize = req.query.pageSize || 15;
  let disasters;
  if (startDate) {
    disasters = await disasterService.getByDate(startDate);
    disasters = disasters.filter((disaster) => {
      const dateFactor = disaster.endDate <= (endDate || Date.now());
      const typeFactor = disaster.disasterType.toString() === type.toString();
      const statusFactor = disaster.status === status;
      return (
        dateFactor &&
        (type ? typeFactor : true) &&
        (status ? statusFactor : true)
      );
    });
  }
  if (!disasters) {
    disasters = await disasterService.getDisasters();
  }
  const data = {
    total: disasters.length,
    filters: { startDate, endDate, type, status },
    page,
    pageSize,
    data: disasters.slice(
      (page - 1) * pageSize,
      (page - 1) * pageSize + pageSize
    ),
  };
  return res.status(200).json(data);
});

exports.getDisaster = catchAsyncErrors(async(req, res)=>{
    const {id} = req.params
    const disaster = await disasterService.getById(id)
    if(!disaster)return res.status(404).json({message: "disaster not found"})
    return res.status(200).json(disaster)
})