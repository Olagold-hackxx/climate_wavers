const logService = require("../services/log.service")
const { formatLog } = require("../utils/factory")

class LogBuilder{

    listen(){
        return async(req, res, next)=>{
            const details = formatLog(req)
            await logService.createLog({createdAt: Date.now(), details})
        }
    }

    async formatLogs(start=Date.now() - (7 * 24 * 60 * 60 * 1000)){
        const logs = await logService.getLogs(start)
        return logs.join("\n\n")
    }
}

exports.logBuilder = new LogBuilder()