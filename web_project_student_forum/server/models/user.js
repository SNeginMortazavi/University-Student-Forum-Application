const mongoose = require('mongoose');
const Schema = mongoose.Schema; //Schema is the object so we can create the user blue print

//anytime we need to signup we should encrypt the password
const bcrypt = require('bcrypt-nodejs');
const crypto = require('crypto'); //built in node.js library

const UserSchema = new Schema({
    //all the attributes we need for each student
    email: { type: String, unique: true, lowercase: true },
    name: String,
    password: String,
    picture: String,
    // isSeller: { type: Boolean, default: false },
    address: {
        addr1: String,
        addr2: String,
        city: String,
        state: String,
        country: String,
        postalCode: String
    },
    created: { type: Date, default: Date.now },
});

/** pre is the built in function in mongoose,
 * it will encrypt the password before it saves it in database
*/
UserSchema.pre('save', function(next) {
    var user = this; //this refer to UserSchema

    //check if the field of the password in UserSchema has been changed
    if (!user.isModified('password')) return next();

    bcrypt.hash(user.password, null, null, function(err, hash) {
        if (err) return next(err);

        user.password = hash;
        next();
    });
});

/**
 * compare the password you entered and the assword in database
 * to create the custom function, it needs to add method
 * and then any name of our choice (comparePassword)
 * @param password
 * @returns compares the entered password with the password in datbase
 */
UserSchema.methods.comparePassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

/** the function to generate picture anytime you sign up
 *  gravatar is custom function
 *  later on we call this function to images in the database
 * @param size
 * @returns {string}
 */
UserSchema.methods.gravatar = function(size) {
    if (!this.size) size = 200;
    if (!this.email) {
        return 'https://gravatar.com/avatar/?s' + size + '&d=retro';
    } else {
        //if email exists then you need to hash password and use
        //mf5 algorithm is the cryptographic hsh function
        var md5 = crypto.createHash('md5').update(this.email).digest('hex');
        return 'https://gravatar.com/avatar/' + md5 + '?s' + size + '&d=retro';
    }

}

//export entire schema to be available outside
module.exports = mongoose.model('User', UserSchema);


