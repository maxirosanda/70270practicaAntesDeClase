
import { fakerDE as faker } from '@faker-js/faker'
/*
const generateProduct = () => {
    return {
        id: faker.database.mongodbObjectId(),
        title: faker.commerce.productName(),
        price: faker.commerce.price(),
        department: faker.commerce.department(),
        stock: faker.number.int({ min: 0, max: 100 }),
        image: faker.image.url()
    }
}


export const generateUser = () => {
    let numOfProducts = faker.number.int({ min: 1, max: 7 });
    let products = []
    for (let i = 0; i < numOfProducts; i++) {
        products.push(generateProduct())
    }

    return {
        id: faker.database.mongodbObjectId(),
        name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        sex: faker.person.sex(),
        birthDate: faker.date.birthdate(),
        phone: faker.phone.number(),
        products,
        image: faker.image.avatar(),
        email: faker.internet.email()
    }
}
    */


const generateProduct = () => {
    return {
        id: faker.database.mongodbObjectId(),
        title: faker.commerce.productName(),
        price: faker.commerce.price(),
        department: faker.commerce.department(),
        stock: faker.number.int({ min: 0, max: 100 }),
        image: faker.image.url(),
        code: faker.string.alphanumeric(10), // Código alfanumérico
        description: faker.commerce.productDescription() // Descripción del producto
    };
};

export const generateUser = () => {
    let numOfProducts = faker.number.int({ min: 1, max: 7 });
    let products = [];
    for (let i = 0; i < numOfProducts; i++) {
        products.push(generateProduct());
    }

    return {
        id: faker.database.mongodbObjectId(),
        name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        sex: faker.person.sex(),
        birthDate: faker.date.birthdate(),
        phone: faker.phone.number(),
        products,
        image: faker.image.avatar(),
        email: faker.internet.email(),
        role: faker.helpers.arrayElement(["buyer", "seller"]), // Rol en inglés
        isPremium: faker.datatype.boolean(), // Booleano para premium
        occupation: faker.person.jobTitle() // Ocupación laboral
    };
};
