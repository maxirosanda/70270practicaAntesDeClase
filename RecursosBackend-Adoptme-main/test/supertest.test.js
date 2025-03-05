import chai from 'chai';
import superTest from 'supertest';

const expect = chai.expect;
const requester = superTest('http://localhost:8080');

describe('Testing Adoptme', () => {
    describe('Test de mascotas', () => {
        
        let createdPetId = null;

        it('El endpoint POST /api/pets debe crear una mascota correctamente', async () => {
            const petMock = {
                name: "Patitas",
                specie: "Pez",
                birthDate: "10-10-2022",
            }

            const { statusCode, ok, _body } = await requester.post('/api/pets').send(petMock);
            
            console.log(statusCode);
            console.log(ok);
            console.log(_body);

            // Verificamos que la respuesta sea correcta
            expect(statusCode).to.equal(200);
            expect(ok).to.be.true;
            expect(_body).to.have.property('status', 'success');
            expect(_body.payload).to.include({ name: "Patitas", specie: "Pez" });
            expect(_body.payload).to.have.property('adopted', false); // Validación de la actividad

            // Guardamos el ID de la mascota creada para futuras pruebas
            createdPetId = _body.payload._id;
        });

        it('Debe retornar 400 si falta el campo name', async () => {
            const petMock = {
                specie: "Pez",
                birthDate: "10-10-2022",
            }

            const { statusCode, _body } = await requester.post('/api/pets').send(petMock);
            
            expect(statusCode).to.equal(400);
            expect(_body).to.have.property('status', 'error');
        });

        it('Debe obtener todas las mascotas con GET y la respuesta debe ser un array', async () => {
            const { statusCode, ok, _body } = await requester.get('/api/pets');

            expect(statusCode).to.equal(200);
            expect(ok).to.be.true;
            expect(_body).to.have.property('status', 'success');
            expect(_body.payload).to.be.an('array');
        });

        it('Debe actualizar la mascota con PUT', async () => {
    
            if (!createdPetId) {
                throw new Error('No se pudo obtener el ID de la mascota creada en la prueba anterior.');
            }

            const updateData = {
                name: "Patitas Actualizado"
            };

            const { statusCode, _body } = await requester.put(`/api/pets/${createdPetId}`).send(updateData);

            expect(statusCode).to.equal(200);
            expect(_body).to.have.property('status', 'success');
            
            // Verificar que el valor se actualizó correctamente
            const { statusCode: getStatusCode, _body: getBody } = await requester.get(`/api/pets/${createdPetId}`);
            expect(getStatusCode).to.equal(200);
            expect(getBody.payload).to.have.property('name', 'Patitas Actualizado');
        });

        it('Debe eliminar la mascota con DELETE', async () => {
            if (!createdPetId) {
                throw new Error('No se pudo obtener el ID de la mascota creada en la prueba anterior.');
            }

            const { statusCode, _body } = await requester.delete(`/api/pets/${createdPetId}`);

            expect(statusCode).to.equal(200);
            expect(_body).to.have.property('status', 'message');

            // Verificar que la mascota ya no existe
            const { statusCode: statusAfterDelete, _body: bodyAfterDelete } = await requester.get(`/api/pets/${createdPetId}`);
            expect(statusAfterDelete).to.equal(404);
            expect(bodyAfterDelete).to.have.property('status', 'error');
        });
    });
});
