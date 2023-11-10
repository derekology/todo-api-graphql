import { taskModel } from '../models/taskModel';
import { taskSchema } from '../schemas/validationSchemas';
import { QueryFilterType, TaskInput, TaskUpdateInput, TaskDeleteInput, SearchQuery, TaskDocument, UnknownTaskDocument } from '../schemas/interfaces';

const taskResolvers = {
    Query: {
        getAllTasks: async (): Promise<Document[]> => {
            return await taskModel.find();
        },
        searchTasks: async (_: unknown, { owner, name, category, operator }: SearchQuery): Promise<TaskDocument[]> => {
            const filter: QueryFilterType = {};

            if (operator && operator === 'or') {
                if (owner) {
                    filter.$or = [{ owner }];
                }
                if (name) {
                    filter.$or = filter.$or || [];
                    filter.$or.push({ name });
                }
                if (category) {
                    filter.$or = filter.$or || [];
                    filter.$or.push({ category });
                }
            } else {
                if (owner) {
                    filter.owner = owner;
                }
                if (name) {
                    filter.name = name;
                }
                if (category) {
                    filter.category = category;
                }
            }

            return await taskModel.find(filter);
        },
    },

    Mutation: {
        addTask: async (_: unknown, { taskInput }: { taskInput: TaskInput }): Promise<UnknownTaskDocument> => {
            const { error, value } = taskSchema.validate(taskInput);

            if (error) {
                throw new Error(error.details[0].message);
            }

            const newTask = await taskModel.create(taskInput);
            return newTask;
        },
        deleteTask: async (_: unknown, { id, userId }: TaskDeleteInput): Promise<string> => {
            const task = await taskModel.findById(id);

            if (!task) {
                throw new Error(`Task not found`);
            }

            if (task.owner !== userId) {
                throw new Error(`You are not authorized to delete this task`);
            }

            await taskModel.findByIdAndDelete(id);
            return `Task deleted successfully!`;
        },
        updateTask: async (_: unknown, { id, userId, category, name, description }: TaskUpdateInput): Promise<UnknownTaskDocument> => {
            const task = await taskModel.findById(id);

            if (!task) {
                throw new Error(`Task not found`);
            }

            if (task.owner !== userId) {
                throw new Error(`You are not authorized to update this task`);
            }

            if (category) {
                task.category = category;
            }
            if (name) {
                task.name = name;
            }
            if (description) {
                task.description = description;
            }

            const { error, value } = taskSchema.validate({
                owner: task.owner,
                name: task.name,
                description: task.description,
                category: task.category,
            });

            if (error) {
                throw new Error(error.details[0].message);
            }

            await task.save();
            return task;
        },
    },
};

export default taskResolvers;
