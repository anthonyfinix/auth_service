import bcrypt from 'bcrypt';

export default async function passwordCompare(password: string, hashedPassword: string) {
    return await bcrypt.compare(password, hashedPassword)
}