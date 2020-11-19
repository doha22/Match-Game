const router = require("express").Router();
const matchController = require("../controller/matchController");



router.get("/All", matchController.getAllMatches);
router.post("/new",matchController.createNewMatch)
router.put("/update/:id",matchController.updateMatches)
router.post("/search_team",matchController.filterTeamNameMatches)
router.post("/search_date",matchController.filterDateMatches)


module.exports = router;