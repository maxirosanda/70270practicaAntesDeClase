import chai from 'chai';
import supertest from 'supertest';


const expect = chai.expect;
const requester = supertest('http://localhost:8080');

describe('Test de autenticación sin protección', () => {
    let cookie;
    let mockUser = {
        first_name: "Mauricio",
        last_name: "Espinosa",
        email: "correomau@correo.com",
        password: "123"
    };

    it('Debe loguear correctamente al usuario y devolver una cookie unprotectedCookie', async function () {
        const result = await requester.post('/api/sessions/unprotectedlogin').send(mockUser);

        const cookieResult = result.headers['set-cookie'][0];
        expect(cookieResult).to.be.ok;
        cookie = {
            name: cookieResult.split('=')[0],
            value: cookieResult.split('=')[1].split(';')[0] // Extraemos solo el valor del token
        };

        expect(cookie.name).to.be.eql('unprotectedCookie');
        expect(cookie.value).to.be.ok;
    });

    it('Debe devolver al usuario completo con todos sus campos', async function () {
        const result = await requester.get('/api/sessions/unprotectedCurrent')
            .set('Cookie', [`${cookie.name}=${cookie.value}`]);

        expect(result.status).to.be.eql(200);
        expect(result.body.status).to.be.eql("success");
        
        const user = result.body.payload;
        expect(user).to.have.property("first_name").that.is.eql(mockUser.first_name);
        expect(user).to.have.property("last_name").that.is.eql(mockUser.last_name);
        expect(user).to.have.property("email").that.is.eql(mockUser.email);
        expect(user).to.have.property("password"); // Solo para verificar que está presente (aunque debería estar hasheado)
    });
});
