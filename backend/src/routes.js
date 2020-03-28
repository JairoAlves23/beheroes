const express = require("express");
const routes = express.Router();

const OngController = require("../src/controllers/ong_controllers");
const incidentController = require("../src/controllers/incident_controller");
const profileController = require("../src/controllers/profile_controller");
const sessionController = require("../src/controllers/session_controller");

routes.post("/sessions", sessionController.create);

routes.get("/ongs", OngController.index);
routes.post("/ongs", OngController.create);

routes.get("/incidents", incidentController.index);
routes.post("/incidents", incidentController.create);
routes.delete("/incidents/:id", incidentController.delete);

routes.get("/profile", profileController.index);

module.exports = routes;
