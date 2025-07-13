const cloudinary = require('../../config/cloudinary');
const bcrypt = require('bcrypt');

const errorHandler = require('../../middleware/errorHandler');
const successHandler = require('../../middleware/successHandler');
const User = require('../../models/UserModel');

// Create a new user
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
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.send(
        errorHandler({
          status: 400,
          message: 'User with this email already exists',
        })
      );
    }
    // ✅ Hash password using await
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // ✅ Upload image to Cloudinary if available
    let uploadedImageUrl = '';
    if (profileImage) {
      const uploadResponse = await cloudinary.uploader.upload(profileImage, {
        folder: 'SkillSwap/Profiles',
        upload_preset: 'ml_default',
      });
      uploadedImageUrl = uploadResponse.secure_url;
    }

    const newUser = {
      name,
      email,
      password: hashedPassword,
      location,
      ...(uploadedImageUrl && { profileImage: uploadedImageUrl }),
      skillOffered,
      skillWanted,
      bio,
    };

    const SavedUser = await User.create(newUser);

    res.send(
      successHandler({
        status: 201,
        data: SavedUser,
        message: 'User created successfully',
      })
    );
  } catch (error) {
    res.send(
      errorHandler({
        status: 500,
        message: 'Error Creating User: ' + error.message,
      })
    );
  }
};

// Fetch user profile by ID
const getUserProfile = async (req, res) => {
  try {
    const { id } = req.user;

    // Fetch user profile by ID
    const userProfile = await User.findById(id).select('-password');

    if (!userProfile) {
      res.send(
        errorHandler({
          status: 404,
          message: 'User Not Found',
        })
      );
    }
    const user = {
      id: userProfile._id,
      name: userProfile.name,
      email: userProfile.email,
      location: userProfile.location,
      profileImage: userProfile.profileImage,
      skillOffered: userProfile.skillOffered,
      skillWanted: userProfile.skillWanted,
      bio: userProfile.bio,
    };

    res.send(
      successHandler({
        status: 200,
        data: user,
        message: 'User profile fetched successfully',
      })
    );
  } catch (error) {
    res.send(
      errorHandler({
        status: 500,
        message: 'Error fetching user profile: ' + error.message,
      })
    );
  }
};

// Fetch another user's profile by ID
const getOtherUserProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const userProfile = await User.findById(id).select('-password');
    if (!userProfile) {
      return res.send(
        errorHandler({
          status: 404,
          message: 'User Not Found',
        })
      );
    }
    const user = {
      id: userProfile._id,
      name: userProfile.name,
      email: userProfile.email,
      location: userProfile.location,
      profileImage: userProfile.profileImage,
      skillOffered: userProfile.skillOffered,
      skillWanted: userProfile.skillWanted,
      bio: userProfile.bio,
    };
    res.send(
      successHandler({
        status: 200,
        data: user,
        message: 'Other user profile fetched successfully',
      })
    );
  } catch (error) {
    res.send(
      errorHandler({
        status: 500,
        message: 'Error fetching other user profile: ' + error.message,
      })
    );
  }
};

const updateUserProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, location, profileImage, skillOffered, skillWanted, bio } =
      req.body;

    if (req.body.password) {
      return res.send(
        errorHandler({
          status: 400,
          message: 'Password cannot be updated through this endpoint',
        })
      );
    }
    if (req.body.email) {
      return res.send(
        errorHandler({
          status: 400,
          message: 'Email cannot be updated',
        })
      );
    }

    const user = await User.findById(id);

    if (!user) {
      return res.send(
        errorHandler({
          status: 404,
          message: 'User Not Found',
        })
      );
    }
    let imageUrl;
    if (profileImage) {
      const uploadResponse = await cloudinary.uploader.upload(profileImage, {
        folder: 'SkillSwap/Profiles',
        upload_preset: 'ml_default',
      });
      imageUrl = uploadResponse.secure_url;
    }
    const updatedData = {
      name: name || user.name,
      location: location || user.location,
      profileImage: imageUrl || user.profileImage,
      skillOffered: skillOffered || user.skillOffered,
      skillWanted: skillWanted || user.skillWanted,
      bio: bio || user.bio,
    };

    const updateUser = await User.findByIdAndUpdate(id, updatedData, {
      new: true,
    }).select('-password');

    res.send(
      successHandler({
        status: 200,
        data: updateUser,
        message: 'User profile updated successfully',
      })
    );
  } catch (error) {
    res.send(
      errorHandler({
        status: 500,
        message: 'Error updating user profile: ' + error.message,
      })
    );
  }
};

module.exports = {
  userSave,
  getUserProfile,
  getOtherUserProfile,
  getOtherUserProfile,
  updateUserProfile,
};
