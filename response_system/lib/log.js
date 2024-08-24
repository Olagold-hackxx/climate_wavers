const logService = require("../services/log.service")
const { formatLog } = require("../utils/factory")

class LogBuilder{

    listen(){
        return async(req, res, next)=>{
            const details = formatLog(req)
            await logService.createLog({createdAt: Date.now(), details})
        }
    }
}

exports.logBuilder = new LogBuilder()
