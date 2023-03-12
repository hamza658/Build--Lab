import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String
  },
  token: {
    type: String
  },
  ProfilePhoto: {
    type: String
  }
  ,
    Verified: {
      type: Boolean,
      default: false,
    },
});

const User = mongoose.model('User', UserSchema);

export default User;
