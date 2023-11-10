import taskResolvers from './resolvers/taskResolvers';
import userResolvers from './resolvers/authResolvers';

const resolvers = {
    Query: {
        ...taskResolvers.Query,
        ...userResolvers.Query
    },
    Mutation: {
        ...taskResolvers.Mutation,
        ...userResolvers.Mutation
    }
};

export default resolvers;