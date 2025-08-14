const express = require("express");
const router = express.Router();
const Notes = require("../Schema/noteSchema");
const fetchuser = require("../Middleware/authenticate_user");
const { body, validationResult } = require("express-validator")


//**Add new notes to user **//
//**Method:POST**//
//**Required Authentication**//
//**Addnote start here**//
router.post("/addnote",
    [
        body("title", "length of title cannot be empty").isLength({ min: 1 }),
        body("description").custom((value) => {
            if (value.length < 3) {
                throw new Error("Description must contain atleast 3 Character!");
            }
            return true;
        })
    ],
    fetchuser, async (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(501).json({
                "error": "validation error in Add note",
                "type": "/addnote -> note.js",
                "message": errors
            })
        }
        try {
            let success = false;
            const { title, description, tag } = req.body;
            const user_id = req.user.id;

            const response = await Notes.create({
                "user": user_id,
                "title": title,
                "description": description,
                "tag": tag.length === 0 ? undefined : tag,
            });
            success = true;
            res.status(201).json({ "notes": response, "success": success, });
        } catch (error) {
            return res.status(501).json({
                "error": "Internal server error in add notes",
                "type": "/addnote --> notes.js",
                "message": error.message,
            })
        }
    })
//**Addnote end here**//





//**Fetchall all notes to specific  user **//
//**Method:GET**//
//**Required Authentication**//
//**fetchnote start here**//
router.get('/fetchnote', fetchuser, async (req, res) => {
    try {
        let success = false;
        const { user } = req;
        const note = await Notes.find({ "user": user.id });

        success = true;
        res.status(201).json({ note, "success": success, });

    } catch (error) {
        return res.status(501).json({
            "error": "internal server error in fetch note",
            "type": "/fetchuser -> notes.js",
            "message": error.message,
        })
    }
})
//**fetchnote end here**//


//**update notes start here**//
//**method:put**//
//**user Autchentication is required**//
router.put("/update/:note_id", fetchuser, async (req, res) => {

    try {
        let success = false;
        const { title, description, tag } = req.body;
        const { user } = req;
        const { note_id } = req.params;
        const note = await Notes.findOne({ "_id": note_id });


        if (!note) {
            return res.status(401).json({
                "error": "Note not Found!!",
                "type": "/update/: ->note.js",
                "success": success,
            });
        }

        if (note.user.toString() !== user.id) {
            return res.status(401).json({
                "error": "You not Authorized user to update note",
                "type": "/update/: ->note.js",
                "success": success,
            });
        }

        console.log(req.body)
        const newnote = {};

        if (title) {
            newnote.title = title;
        }
        if (description) {
            newnote.description = description;
        }
        if (tag) {
            newnote.tag = tag;
        }

        const updated_note = await Notes.findByIdAndUpdate(note_id, { $set: newnote }, { new: true });
        success = true;
        res.status(201).json({
            updated_note,
            "success": success,
        });

    } catch (error) {
        return res.status(401).json({
            "error": "Internal server error in update note",
            "type": "/update/: ->note.js",
            "message": error.message,
        });
    }
})
//**update notes end here**//



//**detenote start here**//
//**method:DELETE**//
//**user authentication is required**//
router.delete("/deletenote/:note_id", fetchuser, async (req, res) => {
    try {
        let success = false;
        const { note_id } = req.params;
        const { id } = req.user;
        const note = await Notes.findById({ "_id": note_id });
        console.log(note);
        console.log(note.user, id);
        if (note.user.toString() !== id) {
            return res.status(401).json({
                "error": "You not Authorized user to delete a note",
                "type": "/delete/: ->note.js",
                "success": success,
            });
        }
        if (!note) {
            return res.status(401).json({
                "error": "Note not Found!!",
                "type": "/delete/: ->note.js",
                "success": success,
            });
        }

        const deletenote = await Notes.findByIdAndDelete({ "_id": note_id });
        success = true;
        res.status(201).json({ deletenote, "success": success, })
    } catch (error) {
        return res.status(401).json({
            "error": "Internal server error in delete note",
            "type": "/delete/: ->note.js",
            "message": error.message,

        });
    }
})
//**delete note END here**//


module.exports = router;