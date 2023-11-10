import bcrypt from 'bcrypt';
import { userModel } from '../models/userModel';
import { authSchema } from '../schemas/validationSchemas';
import { User, UserDocument, UnknownUserDocument } from '../schemas/interfaces';

const authResolvers = {
    Query: {
        getUsers: async (): Promise<UserDocument[]> => {
            return await userModel.find();
        },
        getUser: async (_: unknown, { id }: { id: string }): Promise<UserDocument | null> => {
            return await userModel.findById(id);
        },
    },

    Mutation: {
        register: async (_: unknown, { email, password }: User): Promise<UnknownUserDocument> => {
            const { error, value } = authSchema.validate({
                email,
                password,
            });

            if (error) {
                throw new Error(error.details[0].message);
            }

            const existingUser = await userModel.findOne({ email });

            if (existingUser) {
                throw new Error(`Email already exists`);
            }

            const hashedPassword = bcrypt.hashSync(password, 10);

            const newUser = await userModel.create({ email, password: hashedPassword });
            return newUser;
        },
        login: async (_: unknown, { email, password }: User): Promise<UnknownUserDocument | null> => {
            const { error, value } = authSchema.validate({
                email,
                password,
            });

            if (error) {
                throw new Error(error.details[0].message);
            }

            const user = await userModel.findOne({ email });

            if (!user || (user.password && !bcrypt.compareSync(password, user.password))) {
                throw new Error(`Invalid email or password`);
            }

            return user;
        },
    },
};

export default authResolvers;