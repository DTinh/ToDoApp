import { where } from "sequelize";
import db from "../models/index";
import { raw } from "body-parser";

let checkTitleTodo = (titleToDo) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { title: titleToDo }
            })
            if (user) {
                resolve(true)
            } else {
                resolve(false)
            }
        } catch (e) {
            reject(e)
        }
    })
}
let getAllToDo = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = '';
            if (userId === 'ALL') {
                users = await db.User.findAll();
            }
            if (userId && userId !== 'ALL') {
                users = await db.User.findOne({
                    where: { id: userId }
                })
            }
            resolve(users)
        } catch (e) {
            reject(e)
        }
    })
}
let createNewToDo = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let check = await checkTitleTodo(data.title);
            if (check === true) {
                resolve({
                    errCode: 1,
                    errMessage: `Your title is already in used, Please try another title`
                })
            } else {
                await db.User.create({
                    title: data.title,
                    description: data.description,
                })
            }
            resolve({
                errCode: 0,
                message: 'OK',
            })
        } catch (e) {
            reject(e)
        }
    })
}
let deleteToDo = (titleId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: titleId }
            })
            if (!user) {
                resolve({
                    errCode: 2,
                    errMessage: `The title isn't exist!`
                })
            }
            await db.User.destroy({
                where: { id: titleId }
            })
            resolve({
                errCode: 0,
                errMessage: `The user is deleted`
            })
        } catch (e) {
            reject(e)
        }
    })
}
let updateToDo = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id) {
                resolve({
                    errCode: 2,
                    errMessage: 'Missing required paramenters'
                })
            }

            let user = await db.User.findOne({
                where: { id: data.id },
                raw: false
            })
            if (user) {
                user.title = data.title;
                user.description = data.description;
                await user.save();

                resolve({
                    errCode: 0,
                    message: 'Update the todo succeed'
                })
            } else {
                resolve({
                    errCode: 1,
                    message: 'Todo is not found'
                })
            }


        } catch (e) {
            reject(e)
        }
    })
}
module.exports = {
    getAllToDo, createNewToDo, checkTitleTodo, deleteToDo, updateToDo
}