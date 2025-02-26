import { expect } from 'chai';
import { createHash, passwordValidation } from "../src/utils/index.js";

describe('Testing bcrypt utils', () => {
    it('El método createHash debe poder encriptar una contraseña', async function() {
        const password = "password123";
        const hash = await createHash(password);
        expect(hash).to.not.equal(password);
    });

    it('El método passwordValidation debe poder comparar una contraseña con un hash', async function() {
        const password = "password123";
        const hash = await createHash(password);
        const result = await passwordValidation({ password: hash }, password);
        expect(result).to.be.true;
    });

    it('El método passwordValidation debe fallar si la contraseña hasheada se altera', async function() {
        const password = "password123";
        const hash = await createHash(password);
        const alteredHash = hash.slice(0, -1) + (hash.slice(-1) === 'a' ? 'b' : 'a'); // Alter the last character
        const result = await passwordValidation({ password: alteredHash }, password);
        expect(result).to.be.false;
    });
});