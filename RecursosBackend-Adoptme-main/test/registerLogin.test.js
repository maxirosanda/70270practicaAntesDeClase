import chai from 'chai';
import superTest from 'supertest';

const expect = chai.expect;
const requester = superTest('http://localhost:8080');

describe('Test avanzado', () => {
    let cookie;
    
    it('Debe registrar correctamente a un usuario', async function () {
        const mockUser = {
            first_name: "Mauricio",
            last_name: "Espinosa",
            email: "correomau2@correo.com",
            password: "123"
        }

        const { _body } = await requester.post('/api/sessions/register').send(mockUser);
        // Sólo nos basta que esté definido el payload, indicando que tiene un _id registrado
        expect(_body.payload).to.be.ok;
    });

    it('Debe loguear correctamente al usuario Y DEVOLVER UNA COOKIE', async function () {
        // Enviamos al login los mismos datos del usuario que recién registramos.
        const mockUser = {
            email: 'correomau@correo.com',
            password: '123'
        }

        // Ahora, obtendremos de supertest los headers de la respuesta y extraeremos el header "set-cookie"
        // En caso de que éste venga correctamente, significa que el endpoint efectivamente devuelve una cookie.
        // Guardaremos el valor de la cookie en la variable "cookie" declarada arriba.
        const result = await requester.post('/api/sessions/login').send(mockUser);
        const cookieResult = result.headers['set-cookie'][0];

        expect(cookieResult).to.be.ok;

        cookie = {
            name: cookieResult.split('=')[0],
            value: cookieResult.split('=')[1]
        }

        expect(cookie.name).to.be.ok.and.eql('coderCookie');
        expect(cookie.value).to.be.ok;
    });

    it('Debe enviar la cookie que contiene el usuario y destructurar éste correctamente', async function () {
        // Enviamos la cookie que guardamos arriba a partir de un set.
        const { _body } = await requester.get('/api/sessions/current').set('Cookie', [`${cookie.name}=${cookie.value}`]);

        // Luego, el método current debería devolver el correo del usuario que se guardó desde el login.
        // Indicando que efectivamente se guardó una cookie con el valor del usuario (correo).
        expect(_body.payload.email).to.be.eql('correomau@correo.com');
    });
});
