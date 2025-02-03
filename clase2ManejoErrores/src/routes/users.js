import { Router } from "express";
import CustomError from "../utils/errors/customError.js";
import EErrors from "../utils/errors/enums.js";
import { generateUserErrorInfo, generateUserErrorParam } from "../utils/errors/info.js";

const router = Router();
const users = [];

router.get("/", (req, res) => {
  res.send({status: "success", data: users});
});

router.post('/', (req, res) => {

    const { first_name, last_name, age, email } = req.body;
    if (!first_name || !last_name || !email) {
        CustomError.createError({
            name: "User creation error",
            cause: generateUserErrorInfo(first_name, last_name, age, email),
            message: "Error Trying to create User",
            code: EErrors.INVALID_TYPES_ERROR
        });
    }

    const user = {
        first_name,
        last_name,
        age,
        email
    }

    if (users.length === 0) {
        user.id = 1;
    } else {
        user.id = users[users.length - 1].id + 1;
    }

    users.push(user);
    res.send({ status: "success", payload: user });
});

router.get("/:uid", (req, res, next) => {
    const { uid } = req.params;
    const parsedUid = Number(uid);

    if (isNaN(parsedUid) || parsedUid <= 0) {
        CustomError.createError({
            name: "Invalid Parameter",
            cause: generateUserErrorParam(uid),
            message: "Error Trying to fetch User",
            code: EErrors.INVALID_PARAM
        })
    }

    res.send({ status: "success", message: `Fetching user with id ${parsedUid}` });
});

export default router;