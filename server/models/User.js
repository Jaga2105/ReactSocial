const { default: mongoose } = require("mongoose");

const UserSchema = new  mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            trim: true,
            maxlength: 32,
            unique: true,
          },
          email: {
            type: String,
            required: true,
            trim: true,
            maxlength: 32,
            unique: true,
          },
          password: {
            type: String,
            required: true,
          },
    },
    { timestamps: true }
)

module.exports = mongoose.model('User', UserSchema)