import { Types } from "mongoose";

interface Note {
    _id: Types.ObjectId;
    title: string;
    content: string;
    date: Date;
}

interface Workspace {
    _id: Types.ObjectId;
    name: string;
    notes: Note[];
}

interface Workspaces {
    [id: string]: Workspace;
}

export { Note, Workspaces, Workspace }