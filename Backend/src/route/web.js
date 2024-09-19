import express from 'express';
import homeControler, { getHomePage, handleGetAllToDo, handldCreateNewToDo, handleDeleteToDo, handleEditToDo } from "../controllers/homeController"
let router = express.Router();

const initWebRoutes = (app) => {
    router.get('/', getHomePage);


    router.get('/api/get-all-todo', handleGetAllToDo);
    router.post('/api/create-new-todo', handldCreateNewToDo);
    router.delete('/api/delete-todo', handleDeleteToDo);
    router.put('/api/edit-todo', handleEditToDo);

    return app.use("/", router);
}

module.exports = initWebRoutes;