import bcrypt from 'bcrypt';

export class Hash {
    static async make(text: string) {
        const saltRounds = 12;

        try {
            return await bcrypt.hash(text, saltRounds);
        } catch (error) {
            return null;
        }
    }

    static async compare(text: string, hash: string) {
        try {
            return await bcrypt.compare(text, hash);
        } catch (error) {
            return false;
        }
    }
}