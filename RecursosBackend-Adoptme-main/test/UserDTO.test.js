import { expect } from 'chai';
import UserDTO from '../src/dto/UserDTO.js';

describe('Testing UserDTO', () => {
    it('El DTO debe unificar el nombre y apellido en una única propiedad', () => {
        const user = {
            first_name: 'Juan',
            last_name: 'Perez',
            email: 'juan.perez@example.com',
            password: 'hashedpassword',
            role: 'user',
            pets: [],
            __v: 0
        };

        const userDTO = new UserDTO(user);
        expect(userDTO.fullName).to.equal('Juan Perez');
    });

    it('El DTO debe eliminar las propiedades innecesarias como password, first_name, last_name', () => {
        const user = {
            first_name: 'Juan',
            last_name: 'Perez',
            email: 'juan.perez@example.com',
            password: 'hashedpassword',
            role: 'user',
            pets: [],
            __v: 0
        };

        const userDTO = new UserDTO(user);
        expect(userDTO).to.not.have.property('password');
        expect(userDTO).to.not.have.property('first_name');
        expect(userDTO).to.not.have.property('last_name');
        expect(userDTO).to.not.have.property('__v');
    });
});