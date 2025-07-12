const successHandler = require('../../middleware/successHandler');
const UserModel = require('../../models/UserModel');
const cloudinary = require('../../config/cloudinary');
const bcrypt = require('bcrypt');

const userSave = async (req, res) => {
  const saltRounds = 10;

  try {
    const {
      name,
      email,
      password,
      location,
      profileImage,
      skillOffered,
      skillWanted,
      bio,
    } = req.body;

    console.log('req.body:', req.body);

    // ✅ Hash password using await
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // ✅ Upload image to Cloudinary if available
    let uploadedImageUrl = '';
    if (profileImage) {
      const uploadResponse = await cloudinary.uploader.upload(profileImage, {
        folder: 'SkillSwap/Profiles',
        upload_preset: 'ml_default',
      });
      console.log('Image uploaded to Cloudinary:', uploadResponse);
      uploadedImageUrl = uploadResponse.secure_url;
    }

    const newUser = {
      name,
      email,
      password: hashedPassword,
      location,
      profileImage: uploadedImageUrl,
      skillOffered,
      skillWanted,
      bio,
    };

    const SavedUser = await UserModel.create(newUser);

    res.send(
      successHandler({
        status: 201,
        data: SavedUser,
        message: 'User created successfully',
      })
    );
  } catch (error) {
     res.send(errorHandler({
            status: 500,
            message: 'Error Creating User: ' + error.message,
        }))
  }
};

module.exports = {
  userSave,
};
