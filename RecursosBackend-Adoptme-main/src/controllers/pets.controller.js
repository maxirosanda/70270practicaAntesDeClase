import PetDTO from "../dto/Pet.dto.js";
import { petsService } from "../services/index.js"
import __dirname from "../utils/index.js";
import CustomError from "../utils/errors/customError.js";
import EErrors from "../utils/errors/enums.js";
import { generatePetErrorInfo } from "../utils/errors/info.js";

const getAllPets = async(req,res) => {
    const pets = await petsService.getAll();
    res.send({status:"success",payload:pets})
}

const getPetById = async(req,res) => {
    const petId = req.params.pid;
    const pet = await petsService.getBy(petId);
    if (!pet) {
        return res.status(404).send({ status: "error", message: "pet not found" });
    }
    res.send({status:"success",payload:pet})
}

const createPet = async (req,res,next)=> {
    try {
        const {name,specie,birthDate} = req.body;
    if (!name || !specie || !birthDate) {
        req.logger.error("Incomplete values");
        
        ("Error trying to create Pet");
        CustomError.createError({
            name: "Pet creation error",
            cause: generatePetErrorInfo({name, specie, birthDate}),
            message: "Error Trying to create Pet",
            code: EErrors.INVALID_TYPES_ERROR
        });  
    }
    const pet = PetDTO.getPetInputFrom({name,specie,birthDate});
    const result = await petsService.create(pet);
    res.send({status:"success",payload:result})
    } catch (error) {
        next(error)
    }
}

const updatePet = async(req,res) =>{
    const petUpdateBody = req.body;
    const petId = req.params.pid;
    const result = await petsService.update(petId,petUpdateBody);
    res.status(200).send({status:"success",message:"pet updated"})
}

const deletePet = async(req,res)=> {
    const petId = req.params.pid;
    const result = await petsService.delete(petId);
    if (!result) {
        return res.status(404).send({ status: "error", message: "pet not found" });
    }
    res.status(200).send({status:"success",message:"pet deleted"});
}

const createPetWithImage = async(req,res) =>{
    const file = req.file;
    const {name,specie,birthDate} = req.body;
    console.log({name,specie,birthDate})
    if(!name||!specie||!birthDate) return res.status(400).send({status:"error",error:"Incomplete values"})
    console.log(file);
    const pet = PetDTO.getPetInputFrom({
        name,
        specie,
        birthDate,
        image:`${__dirname}/../public/img/${file.filename}`
    });
    console.log(pet);
    const result = await petsService.create(pet);
    res.send({status:"success",payload:result})
}
export default {
    getAllPets,
    getPetById,
    createPet,
    updatePet,
    deletePet,
    createPetWithImage
}