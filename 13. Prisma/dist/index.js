"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
function createUser(data) {
    return __awaiter(this, void 0, void 0, function* () {
        return prisma.user.create({ data });
    });
}
function getUsers() {
    return __awaiter(this, void 0, void 0, function* () {
        return prisma.user.findMany();
    });
}
function getUserById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return prisma.user.findUnique({ where: { id } });
    });
}
function updateUser(id, data) {
    return __awaiter(this, void 0, void 0, function* () {
        return prisma.user.update({ where: { id }, data });
    });
}
function deleteUser(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return prisma.user.delete({ where: { id } });
    });
}
function createAddress(data) {
    return __awaiter(this, void 0, void 0, function* () {
        return prisma.address.create({ data });
    });
}
function getAddresses() {
    return __awaiter(this, void 0, void 0, function* () {
        return prisma.address.findMany();
    });
}
function getAddressById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return prisma.address.findUnique({ where: { id } });
    });
}
function updateAddress(id, data) {
    return __awaiter(this, void 0, void 0, function* () {
        return prisma.address.update({ where: { id }, data });
    });
}
function deleteAddress(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return prisma.address.delete({ where: { id } });
    });
}
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        // Create user
        const newUser = yield createUser({
            email: 'test@example.com',
            firstName: 'John',
            lastName: 'Doe',
        });
        console.log('Created user:', newUser);
        // Get all users
        const users = yield getUsers();
        console.log('All users:', users);
        // Get user by ID
        const userById = yield getUserById(newUser.id);
        console.log('User by ID:', userById);
        // Update user
        const updatedUser = yield updateUser(newUser.id, { lastName: 'Smith' });
        console.log('Updated user:', updatedUser);
        // Delete user
        const deletedUser = yield deleteUser(newUser.id);
        console.log('Deleted user:', deletedUser);
        // Create Address
        const newAddress = yield createAddress({
            street: '123 Main St',
            city: 'Anytown',
            state: 'CA',
            pincode: '12345',
            userId: newUser.id, // Assuming userById exists
        });
        console.log('Created address:', newAddress);
        // Get all addresses
        const addresses = yield getAddresses();
        console.log('All addresses:', addresses);
        // Get address by ID
        const addressById = yield getAddressById(newAddress.id);
        console.log('Address by ID:', addressById);
        // Update address
        const updatedAddress = yield updateAddress(newAddress.id, { pincode: '54321' });
        console.log('Updated address:', updatedAddress);
        // Delete address
        const deletedAddress = yield deleteAddress(newAddress.id);
        console.log('Deleted address:', deletedAddress);
    });
}
main()
    .catch((e) => {
    throw e;
})
    .finally(() => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.$disconnect();
}));
