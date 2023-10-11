import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

import { Note, Workspace, User } from './models/Schema.js'

const app = express()
app.use(cors())
app.use(express.json())

const port = 3000

import { MongoClient, ServerApiVersion } from 'mongodb'
const uri = process.env.DB_URI



// run2()
async function run2(){
    const note = new Note({title: 'Note4', content: 'Hey Again', date: new Date})
    try{
        const workspace = await Workspace.findById('6519700162fd5940bfb85aae')
        workspace.notes.push(note)
        await workspace.save()
        console.log(workspace)
    }
    catch(err){
        console.log(err)
    }
    // await workspace.save()
}

mongoose.connect(uri)
    .then(()=>{
        app.listen(port,()=>{
            console.log('Server running on port', port)
        })
    })
    .catch(err=>console.log(err))


app.post('/api/getWorkspaces',async(req,res)=>{
    try{
        const { userId } = req.body;
        if(!userId) return res.status(400).json({msg: 'User not logged in'})
        const workspaceMap = {};
        let user = await User.findOne({userId: userId})
        if(!user) { 
            const notes = []
            const workspace = new Workspace({name: 'Default', notes: notes})
            user = new User({userId: userId, workspaces: [workspace]})
            await user.save()
        }
        user['workspaces'].forEach(workspace => {
            workspaceMap[workspace._id] = workspace;
        });
        res.status(200).json(workspaceMap)
    }
    catch(err){
        console.log(err)
    }
})


app.put('/api/updateNoteTitle',async(req,res)=>{
    try {
        const { userId, workspaceId, noteId, title } = req.body;
        const user = await User.findOne({userId: userId})
        const workspace = user.workspaces.id(workspaceId)
        const note = workspace.notes.id(noteId)
        note.title = title
        await user.save()
        res.json()
    } catch (err) {
        console.log(err)
    }
})

app.put('/api/updateNoteContent',async(req,res)=>{
    try {
        const { userId, workspaceId, noteId, content } = req.body;
        const user = await User.findOne({userId: userId})
        const workspace = user.workspaces.id(workspaceId)
        const note = workspace.notes.id(noteId)
        note.content = content
        await user.save()
        res.json()
    } catch (err) {
        console.log(err)
    }
})

app.put('/api/addNote',async(req,res)=>{
    try {
        const { userId, workspaceId } = req.body;
        const user = await User.findOne({userId: userId})
        const workspace = user.workspaces.id(workspaceId)
        const note = new Note({
            title: 'New Note',
            content: '',
            date: new Date()
        })
        workspace.notes.push(note)
        await user.save()
        res.json()
    } catch (err) {
        console.log(err)
    }
})

app.put('/api/deleteNote',async(req,res)=>{
    try {
        const { userId, workspaceId, noteId } = req.body;
        const user = await User.findOne({userId: userId})
        const workspace = user.workspaces.id(workspaceId)
        workspace.notes.id(noteId).deleteOne()
        await user.save()
        res.json()
    } catch (err) {
        console.log(err)
    }
})

app.put('/api/addWorkspace',async(req,res)=>{
    try {
        const { userId, name } = req.body;
        const workspace = new Workspace({
            name: name,
            notes: []
        })
        const user = await User.findOne({userId: userId})
        user.workspaces.push(workspace)
        await user.save()
        res.json()
    } catch (err) {
        console.log(err)
    }
})

app.put('/api/deleteWorkspace',async(req,res)=>{
    try {
        const { userId, workspaceId } = req.body;
        const user = await User.findOne({userId: userId})
        user.workspaces.id(workspaceId).deleteOne()
        await user.save()
        res.json()
    } catch (err) {
        console.log(err)
    }
})

app.put('/api/updateWorkspaceName',async(req,res)=>{
    try {
        const { userId, workspaceId, name } = req.body;
        const user = await User.findOne({userId: userId})
        user.workspaces.id(workspaceId).name = name
        await user.save()
        res.json()
    } catch (err) {
        console.log(err)
    }
})

// app.listen(port,()=>{
//     console.log('Server running on port', port)
// })

process.on('uncaughtException', function (err) {
    console.error(err);
    console.log("Node NOT Exiting...");
});