const mongoose = require("mongoose");
// const bcrypt = require("bcrypt");

const schema = new mongoose.Schema({
    name:{
        type:String,
        required : true,
    },
    email:{
        type:String,
        required : true,
        unique: true,
    },
    phone:{
        type:Number,
        required : true,
    },
    password:{
        type:String,
        required : true,
    }
})

schema.pre("save", async function (next) {
    if (this.isModified().isNew("password")) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

const User = mongoose.model("register",schema)
module.exports = User