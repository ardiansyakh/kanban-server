const { Task } = require('../models')
class TaskController{
    static readAll(req, res, next){
        Task.findAll()
        .then(result => {
            if(result.length>0){
                res.status(200).json(result)
            }
            else{
                throw{name: 'TASK_NOT_FOUND'}
            }
        })
        .catch(err => {
            next(err)
        })
    }
    static readDetail(req, res, next){
        const {id} = req.params
        Task.findOne({
            where : {id},
        })
        .then(result=>{
            if(!result){
                throw {name: 'TASK_NOT_FOUND'}
            }else{
                res.status(200).json({result})
            }
        })
        .catch(err=>{
            next(err)
        })
    }
    static addTask(req, res, next){
        const { title, category } = req.body
        Task.create({ title, category,  userId: req.userId})
        .then(result => {
            res.status(201).json(result)
        })
        .catch(err => {
            next(err)
        })
    }
    static delete(req, res, next){
        const task = req.task
        Task.destroy({
            where:{id: task.id}
        })
        .then(() => {
            res.status(200).json({message: "Success deleted task"})
        })
        .catch(err => {
            next(err)
        })
    }
    static updateAll(req, res, next){
        const task = req.task
        const { title, category } = req.body
        Task.update({ title, category},
            {
                where: {id:task.id},
                returning: true
            })
        .then(result => {
            res.status(200).json(result[1])
        })
        .catch(err => {
            next(err)
        })
    }
    static updateCategory(req, res, next){
        const task = req.task
        const { category } = req.body
        Task.update({category}, {
            where: {id: task.id},
            returning: true
        })
        .then(result => {
            res.status(200).json(result[1])
        })
        .catch(err => {
            next(err)
        })
    }
}

module.exports = TaskController