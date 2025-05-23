import mongoose from "mongoose";
import User from "../src/dao/Users.dao.js"
import Assert from "assert"
import chai, { expect } from "chai"

mongoose.connect("mongodb+srv://maxirosanda:zeBUkeQJiiw9WYEI@cluster0.wh168.mongodb.net/adoptme?retryWrites=true&w=majority&appName=Cluster0")

const assert = Assert.strict;

describe('Testing Users Dao', () => {
    before(function () {
        this.usersDao = new User();
    });
    beforeEach(function(){
        this.timeout(5000);
    });
    after(function () {
        mongoose.connection.collections.users.drop();
    });
    it('El Dao debe poder obtener los usuarios en formato de arreglo', async function() {
        const result = await this.usersDao.get();
        expect(result).to.be.deep.equal([]);
    });
    
    it('El Dao debe agregar correctamente un elemento a la base de datos', async function() {
        const user = {
            first_name: "Test",
            last_name: "Test User",
            email: "test@gmail.com",
            password: "password123"
        };
        const result = await this.usersDao.save(user);
        expect(result).to.have.property('email');
    });

    it('Al agregar un nuevo usuario, éste debe crearse con un arreglo de mascotas vacío por defecto', async function() {
        const user = {
            first_name: "Test",
            last_name: "Test User",
            email: "test2@gmail.com",
            password: "password123"
        };
        const result = await this.usersDao.save(user);
        expect(result.pets).to.be.deep.equal([]);
    });

    it('El Dao puede obtener a un usuario por email', async function() {
        const email =  "test2@gmail.com";
        const result = await this.usersDao.getBy({email});
        expect(result).to.have.property('email');
        expect(result.email).to.be.equal(email);
    });

    it('El Dao debe actualizar correctamente un elemento en la base de datos', async function() {
        const user = {
            first_name: "Test",
            last_name: "Test User",
            email: "testupdate@gmail.com",
            password: "password123"
        };
        const createdUser = await this.usersDao.save(user);
        const updatedData = { first_name: "Updated" };
        const updatedUser = await this.usersDao.update(createdUser._id, updatedData);
        expect(updatedUser.first_name).to.be.equal(updatedData.first_name);
    });

    it('El Dao debe eliminar correctamente un elemento de la base de datos', async function() {
        const user = {
            first_name: "Test",
            last_name: "Test User",
            email: "testdelete@gmail.com",
            password: "password123"
        };
        const createdUser = await this.usersDao.save(user);
        await this.usersDao.delete(createdUser._id);
        const result = await this.usersDao.getBy({ email: "testdelete@gmail.com" });
        expect(result).to.be.equal(null)
    });
});