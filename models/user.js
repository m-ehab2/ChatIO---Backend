    const validator=require('validator')
    const mongoose = require('mongoose');
    const bcrypt = require('bcryptjs'); 
    const UserSchema = new mongoose.Schema({
        name: {
            type: String,
            required:[true,"please enter your name"]
        },
        email:{
            type:String,
            required: [true, "please enter your email"],
            validate:[validator.isEmail,'Please Enter a Valid Email']
        },
        password: {
            type: String,
            required: [true, 'please enter Password'],
            minlength:[8,"please enter more than or equal 8 chars"]
        },
        passwordConfirm:{
            type: String,
            required: [true, 'please confirm your password'],
            validate: {
            validator: function (val) {
                        return val == this.password;
                    },
                        message:"the password not the same"       
            }
        },
        passwordChangedAt: Date,
    }, {
        timestamps: true,
    })
    UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
        this.password = await bcrypt.hash(this.password, 12);
        this.passwordConfirm = undefined;
        next();
    })
    UserSchema.methods.correctPassword =async (password,userPassword) => {
        return await bcrypt.compare(password,userPassword)    
    }
    UserSchema.methods.changedPasswordAfter = function (JWTTimeStamp) {
  if (this.passwordChangedAt) {
    const timePasswordChanged = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    return JWTTimeStamp < timePasswordChanged;
  }
  return false;
};
    const User = mongoose.model('User', UserSchema);
    module.exports=User