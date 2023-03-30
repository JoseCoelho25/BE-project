const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Schema = mongoose.Schema;

const UserSchema = new mongoose.Schema({
name: {
    type: String,
    required: [true, 'Please add a name']
},
email: {
    type: String,
    required: [true, 'Please add an email'],
    unique: true,
    match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please add a valid email'
    ]
},
role: {
    type: String,
    enum: ['user', 'publisher'],
    default: 'user'
},
password: {
    type: String,
    required: [true, 'Please add a password'],
    minlength: 5,
    select: false
},
resetPasswordToken: String,
resetPasswordExpire: Date,
cart: {
    items: [{
        productId: {type: Schema.Types.ObjectId, ref: 'Product', required: true}, 
        quantity: {type: Number, required: true},
        product: Object
    }],      
},
createdAt: {
    type: Date,
    default: Date.now
}
});

// Encrypt password using bcrypt
UserSchema.pre('save', async function(next) {
const salt = await bcrypt.genSalt(10);
this.password = await bcrypt.hash(this.password, salt);
});

//Encrypt password on update using bcrypt
UserSchema.pre('updateOne', async function(next) {
    const salt = await bcrypt.genSalt(10);
    console.log(this)
    this._update.password = await bcrypt.hash(this._update.password, salt);
    });

// Sign JWT and return
UserSchema.methods.getSignedJwtToken = function() {
return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE
});
};

// Match user entered password to hashed password in database
UserSchema.methods.matchPassword = async function(enteredPassword) {
return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', UserSchema);