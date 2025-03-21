const { Schema, model } = require("mongoose")
const { default: isEmail } = require("validator/lib/isEmail")
const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        trim: true,// delete spaces from the begin and the end !!
        minlength: 4,
        maxlength: 15,
    },
    email: {
        type: String,
        required: true,
        trin: true,
        validate: [isEmail, "field must be email"],
        unique: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 6,
        maxlength: 200,
    },
    avatar: {
        type: Object,
        default: {
            url: "https://images.unsplash.com/vector-1740737650825-1ce4f5377085?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            publicId: null,
        }
    },
    bio: {
        type: String,
        minlength: 1,
        maxlength: 600,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    isAcountVerified: {
        type: Boolean,
        default: false,
    }
}, {
    timestamps: true,
})
// user model
module.exports = model("users", UserSchema);