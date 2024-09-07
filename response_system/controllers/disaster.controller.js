
const catchAsyncErrors = require("../lib/catchAsync")
const validator = require("../services/validator.service")
const disasterService = require('../services/disaster.service')

exports.createDisaster = catchAsyncErrors(async(req, res)=>{
    const validateResponse = validator.validateCreateDisasterPayload(req.body)
    if(validateResponse.error)return res.status(400).json({message: validateResponse.error.message})
    const disaster = await disasterService.createDisaster({...validateResponse.value})
    return res.status(201).json(disaster)
})

exports.getDisasters = catchAsyncErrors(async(req, res)=>{
    const {startDate, endDate, type, status} = req.query
    const page = req.query.page || 1
    const pageSize = req.query.pageSize || 15
    let disasters
    if(startDate){
        disasters = await disasterService.getByDate(startDate)
        disasters = disasters.filter(disaster =>{
            const dateFactor = disaster.endDate <= (endDate || Date.now()) 
            const typeFactor = disaster.disasterType.toString() === type.toString()
            const statusFactor = disaster.status === status
            return dateFactor && (type?typeFactor:true) && (status?statusFactor:true)
        })
    }
    if(!disasters){
        disasters = await disasterService.getDisasters()
    }
    const data = {
        total: disasters.length,
        filters: {startDate, endDate, type, status},
        page,
        pageSize,
        data: disasters.slice[(page - 1) * pageSize,((page - 1) * pageSize) + pageSize]
    }
    return res.status(200).json(data)
})