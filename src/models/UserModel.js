const mongoose = require('mongoose');
const validator = require('validator');

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validator(value) {
        if (!validator.isEmail(value)) {
          throw new Error('Invalid email format');
        }
      },
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    location: {
      type: String,
      required: true,
    },
    skillOffered: {
      type: [String],
    },
    skillWanted: {
      type: [String],
    },
    bio: {
      type: String,
      maxlength: 500,
    },
    profileImage: {
      type: String,
      default:
        'https://res.cloudinary.com/dklbkdsr7/image/upload/v1752305325/SkillSwap/Profiles/defaultProfileImage_iclzmw_gjwvqk.png',
    },
  },
  { timestamps: true, collection: 'User' }
);

module.exports = mongoose.model('User', UserSchema);
