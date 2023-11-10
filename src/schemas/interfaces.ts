import { Document } from 'mongoose';

export interface QueryFilterType {
    $and?: QueryFilterType[];
    $or?: QueryFilterType[];
    owner?: string;
    name?: string;
    description?: string;
    category?: string;
}

export interface Task {
    id: string;
    name: string;
    description: string;
    category: string;
}

export interface TaskUpdateInput extends Task {
    userId: string;
}

export interface TaskDeleteInput {
    id: string;
    userId: string;
}

export interface TaskInput {
    owner: string;
    name: string;
    description: string;
    category: string;
}

export interface SearchQuery {
    owner: string | undefined;
    name: string | undefined;
    description: string | undefined;
    category: string | undefined;
    operator: string | undefined;
}

export interface User {
    email: string;
    password: string;
}

export interface UserDocument extends Document {
    email: string;
    password: string;
}

export interface UnknownUserDocument extends Document {
    email?: string | null | undefined;
    password?: string | null | undefined;
}

export interface TaskDocument extends Document {
    owner: string;
    name: string;
    description: string;
    category: string;
}

export interface UnknownTaskDocument extends Document {
    owner?: string | null | undefined;
    name?: string | null | undefined;
    category?: string | null | undefined;
    description?: string | null | undefined;
}