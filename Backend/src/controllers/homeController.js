import db from '../models/index';
import CRUDService from "../services/CRUDService";


let getHomePage = async (req, res) => {
    res.send('OKOK');
}


let handleGetAllToDo = async (req, res) => {
    let id = req.query.id;

    if (!id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing required paramenters',
            users: []
        })
    }

    let users = await CRUDService.getAllToDo(id);
    return res.status(200).json({
        errCode: 0,
        errMessage: 'OK',
        users
    })
}
let handldCreateNewToDo = async (req, res) => {
    let message = await CRUDService.createNewToDo(req.body);
    return res.status(200).json(message);
}
let handleDeleteToDo = async (req, res) => {
    if (!req.body.id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing required parameters',
        })
    }
    let message = await CRUDService.deleteToDo(req.body.id);
    return res.status(200).json(message);
}
let handleEditToDo = async (req, res) => {
    let data = req.body;
    let message = await CRUDService.updateToDo(data);
    return res.status(200).json(message);
}
module.exports = {
    getHomePage, handleGetAllToDo, handldCreateNewToDo, handleDeleteToDo, handleEditToDo
}