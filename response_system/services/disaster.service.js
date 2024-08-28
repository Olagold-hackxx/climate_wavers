const fbService = require("./firebase.service")

const disasterCollection = "Disaster"

class DisasterService{

    async getDisasters(){
        const docs = await fbService.getAll(disasterCollection,)
        return docs.map(d=>({...d.data(), id: d.id}))
    }

    async getByDate(start){
        const docs = await fbService.queryCollection(disasterCollection, "startDate", ">=", start)
        return docs.map(d=>({...d.data(), id: d.id}))
    }

    async getByType(type){
        const docs = await fbService.queryCollection(disasterCollection, "disasterType", "==", type)
        return docs.map(d=>({...d.data(), id: d.id}))
    }

    async getByStatus(status){
        const docs = await fbService.queryCollection(disasterCollection, "status", "==", status)
        return docs.map(d=>({...d.data(), id: d.id}))
    }

    async getById(id){
        const doc = await fbService.getById(disasterCollection, id)
        return doc.data()
    }

    async createDisaster(obj){
        const doc = await fbService.createOne(disasterCollection, {...obj})
        const data = await this.getById(disasterCollection,doc.id)
        return data
    }


}

module.exports = Object.freeze(new DisasterService())