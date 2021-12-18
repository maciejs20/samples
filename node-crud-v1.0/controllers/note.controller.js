const Note = require('../model/note.model.js')
// const dbConfig = require('../config/database.config.js')
const mongoose = require('mongoose')
const os = require('os')

// Retrieve and return connection state to DB.
exports.status = (req, res) => {
  const dbState = mongoose.connection.readyState
  let dbStateTxt = null
  switch (dbState) {
    case 0:
      dbStateTxt = 'disconnected'
      break
    case 1:
      dbStateTxt = 'connected'
      break
    case 2:
      dbStateTxt = 'connecting'
      break
    case 3:
      dbStateTxt = 'disconnecting'
      break
    default:
      dbStateTxt = 'unknonwn'
  }

  res.send(
    {
      // dbUrl: dbConfig.url,
      status: dbStateTxt,
      os: os.type(),
      arch: os.arch(),
      hostname: os.hostname()
    }
  )
}

// Create and Save a new Note
exports.create = (req, res) => {
  // Validate request
  if (!req.body.content) {
    return res.status(400).send({
      message: 'Note content can not be empty'
    })
  }

  // Create a Note
  const note = new Note({
    title: req.body.title || 'Untitled Note',
    content: req.body.content
  })

  // Save Note in the database
  note.save()
    .then(data => {
      res.send(data)
    }).catch(err => {
      res.status(500).send({
        message: err.message || 'Some error occurred while creating the Note.'
      })
    })
}

// Retrieve and return all notes from the database.
exports.findAll = (req, res) => {
  Note.find()
    .then(notes => {
      res.send(notes)
    }).catch(err => {
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving notes.'
      })
    })
}

// Find a single note with a noteId
exports.findOne = (req, res) => {
  console.log(`findOne: ${req.params.noteId}`)
  Note.findById(req.params.noteId)
    .then(note => {
      if (!note) {
        return res.status(404).send({
          message: 'Note not found with id ' + req.params.noteId
        })
      }
      res.send(note)
    }).catch(err => {
      if (err.kind === 'ObjectId') {
        return res.status(404).send({
          message: 'Note not found with id ' + req.params.noteId
        })
      }
      return res.status(500).send({
        message: 'Error retrieving note with id ' + req.params.noteId
      })
    })
}

// Update a note identified by the noteId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body.content) {
    return res.status(400).send({
      message: 'Note content can not be empty'
    })
  }

  // Find note and update it with the request body
  Note.findByIdAndUpdate(req.params.noteId, {
    title: req.body.title || 'Untitled Note',
    content: req.body.content
  }, { new: true })
    .then(note => {
      if (!note) {
        return res.status(404).send({
          message: 'Note not found with id ' + req.params.noteId
        })
      }
      res.send(note)
    }).catch(err => {
      if (err.kind === 'ObjectId') {
        return res.status(404).send({
          message: 'Note not found with id ' + req.params.noteId
        })
      }
      return res.status(500).send({
        message: 'Error updating note with id ' + req.params.noteId
      })
    })
}

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
  Note.findByIdAndRemove(req.params.noteId)
    .then(note => {
      if (!note) {
        return res.status(404).send({
          message: 'Note not found with id ' + req.params.noteId
        })
      }
      res.send({ message: 'Note deleted successfully!' })
    }).catch(err => {
      if (err.kind === 'ObjectId' || err.name === 'NotFound') {
        return res.status(404).send({
          message: 'Note not found with id ' + req.params.noteId
        })
      }
      return res.status(500).send({
        message: 'Could not delete note with id ' + req.params.noteId
      })
    })
}
