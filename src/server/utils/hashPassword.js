import bcrypt from 'bcryptjs';

async function hashPassword(password) {
    try {
        const salt = await bcrypt.genSalt(10);
        password = await bcrypt.hash(password, salt);
        return password;
    } catch (err) {
        return err;
    }
}

export default hashPassword;
