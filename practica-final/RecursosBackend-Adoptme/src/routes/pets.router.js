import { Router } from 'express';
import petsController from '../controllers/pets.controller.js';
import uploader from '../utils/uploader.js';

const router = Router();

router.get('/',petsController.getAllPets);
router.get('/:pid',petsController.getPet);
router.post('/',petsController.createPet);
router.post('/withimage',uploader.single('image'), petsController.createPetWithImage);
router.patch('/:pid',petsController.updatePet);
router.delete('/:pid',petsController.deletePet);

export default router;