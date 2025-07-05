import { Router } from "express";
import aiServicesController from "../controllers/aiServicesController.js";
const aiRouter = Router();

aiRouter.get("/", (req, res) => {
    res.send("AI Route");
});

aiRouter.post("/recommendations", aiServicesController.endpointRecommendations);

export default aiRouter;