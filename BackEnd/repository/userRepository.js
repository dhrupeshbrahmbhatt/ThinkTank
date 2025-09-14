// BackEnd/repository/userRepository.js
import User from "../Models/user.js";

class UserRepository {
  // Create a new user
  async create(userData) {
    const user = new User(userData);
    return await user.save();
  }

  // Find user by email
  async findByEmail(email) {
    return await User.findOne({ email });
  }

  // Find user by email with password
  async findByEmailWithPassword(email) {
    return await User.findOne({ email }).select("+password");
  }

  // Find user by ID
  async findById(id) {
    return await User.findById(id);
  }

  // Check if user exists by email
  async existsByEmail(email) {
    const user = await User.findOne({ email });
    return !!user;
  }

  // Add refresh token to user
  async addRefreshToken(userId, token) {
    return await User.findByIdAndUpdate(
      userId,
      {
        $push: {
          refreshTokens: { token },
        },
      },
      { new: true }
    );
  }

  // Remove refresh token from user
  async removeRefreshToken(userId, token) {
    return await User.findByIdAndUpdate(
      userId,
      {
        $pull: {
          refreshTokens: { token },
        },
      },
      { new: true }
    );
  }

  // Remove all refresh tokens from user
  async removeAllRefreshTokens(userId) {
    return await User.findByIdAndUpdate(
      userId,
      {
        $set: { refreshTokens: [] },
      },
      { new: true }
    );
  }

  // Check if refresh token exists for user
  async hasRefreshToken(userId, token) {
    const user = await User.findById(userId);
    if (!user) return false;

    return user.refreshTokens.some((tokenObj) => tokenObj.token === token);
  }

  // Update user profile
  async updateProfile(userId, updateData) {
    return await User.findByIdAndUpdate(userId, updateData, {
      new: true,
      runValidators: true,
    });
  }
}

// ✅ Export as ES module
const userRepository = new UserRepository();
export default userRepository;
