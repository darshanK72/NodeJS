import {PrismaClient} from '@prisma/client';

const prisma = new PrismaClient();

async function createUser(data: any) {
  return prisma.user.create({ data });
}

async function getUsers() {
  return prisma.user.findMany();
}

async function getUserById(id: number) {
  return prisma.user.findUnique({ where: { id } });
}

async function updateUser(id: number, data: any) {
  return prisma.user.update({ where: { id }, data });
}

async function deleteUser(id: number) {
  return prisma.user.delete({ where: { id } });
}

async function createAddress(data: any) {
  return prisma.address.create({ data });
}

async function getAddresses() {
  return prisma.address.findMany();
}

async function getAddressById(id: number) {
  return prisma.address.findUnique({ where: { id } });
}

async function updateAddress(id: number, data: any) {
  return prisma.address.update({ where: { id }, data });
}

async function deleteAddress(id: number) {
  return prisma.address.delete({ where: { id } });
}

async function main() {
// Create user
const newUser = await createUser({
    email: 'test@example.com',
    firstName: 'John',
    lastName: 'Doe',
  });
  console.log('Created user:', newUser);

  // Get all users
  const users = await getUsers();
  console.log('All users:', users);

  // Get user by ID
  const userById = await getUserById(newUser.id);
  console.log('User by ID:', userById);

  // Update user
  const updatedUser = await updateUser(newUser.id, { lastName: 'Smith' });
  console.log('Updated user:', updatedUser);

  // Delete user
  const deletedUser = await deleteUser(newUser.id);
  console.log('Deleted user:', deletedUser);

  // Create Address
  const newAddress = await createAddress({
    street: '123 Main St',
    city: 'Anytown',
    state: 'CA',
    pincode: '12345',
    userId: newUser.id, // Assuming userById exists
  });
  console.log('Created address:', newAddress);

  // Get all addresses
  const addresses = await getAddresses();
  console.log('All addresses:', addresses);

  // Get address by ID
  const addressById = await getAddressById(newAddress.id);
  console.log('Address by ID:', addressById);

  // Update address
  const updatedAddress = await updateAddress(newAddress.id, { pincode: '54321' });
  console.log('Updated address:', updatedAddress);

  // Delete address
  const deletedAddress = await deleteAddress(newAddress.id);
  console.log('Deleted address:', deletedAddress);
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
