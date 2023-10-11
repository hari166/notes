import mongoose from "mongoose"
import { title } from "process"


const Schema = mongoose.Schema

const notesSchema = new Schema({
    title: {
        type: String,
    },
    content: {
        type: String,
    },
    date: {
        type: Date
    }
})

const workspaceSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    notes: [notesSchema]
    
})

const userSchema = new Schema({
    userId: {
        type: String,
        required: true
    },
    workspaces: [workspaceSchema]
})



const Workspace = mongoose.model('Workspace', workspaceSchema)
const Note = mongoose.model('Note', notesSchema)
const User = mongoose.model('User', userSchema)
export { Workspace, Note, User }