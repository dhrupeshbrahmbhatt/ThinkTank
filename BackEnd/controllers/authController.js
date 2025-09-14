const jwt = require('jsonwebtoken');
const userRepository = require('../repository/userRepository');

class AuthController {
    // Register new user
    async register(req, res) {
        try {
            const { name, email, password, confirmPassword } = req.body;

            // Validation
            if (!name || !email || !password || !confirmPassword) {
                return res.status(400).json({
                    success: false,
                    message: 'All fields are required'
                });
            }

            if (password !== confirmPassword) {
                return res.status(400).json({
                    success: false,
                    message: 'Passwords do not match'
                });
            }

            if (password.length < 6) {
                return res.status(400).json({
                    success: false,
                    message: 'Password must be at least 6 characters long'
                });
            }

            // Check if user already exists
            const existingUser = await userRepository.existsByEmail(email);
            if (existingUser) {
                return res.status(409).json({
                    success: false,
                    message: 'User already exists with this email'
                });
            }

            // Create user
            const user = await userRepository.create({ name, email, password });

            // Generate tokens
            const accessToken = user.generateAccessToken();
            const refreshToken = user.generateRefreshToken();

            // Store refresh token
            await userRepository.addRefreshToken(user._id, refreshToken);

            res.status(201).json({
                success: true,
                message: 'User registered successfully',
                data: {
                    user,
                    tokens: {
                        accessToken,
                        refreshToken
                    }
                }
            });
        } catch (error) {
            console.error('Register error:', error);
            res.status(500).json({
                success: false,
                message: 'Internal server error'
            });
        }
    }

    // Login user
    async login(req, res) {
        try {
            const { email, password } = req.body;

            // Validation
            if (!email || !password) {
                return res.status(400).json({
                    success: false,
                    message: 'Email and password are required'
                });
            }

            // Find user with password
            const user = await userRepository.findByEmailWithPassword(email);
            if (!user) {
                return res.status(401).json({
                    success: false,
                    message: 'Invalid email or password'
                });
            }

            // Compare password
            const isPasswordValid = await user.comparePassword(password);
            if (!isPasswordValid) {
                return res.status(401).json({
                    success: false,
                    message: 'Invalid email or password'
                });
            }

            // Generate tokens
            const accessToken = user.generateAccessToken();
            const refreshToken = user.generateRefreshToken();

            // Store refresh token
            await userRepository.addRefreshToken(user._id, refreshToken);

            res.json({
                success: true,
                message: 'Login successful',
                data: {
                    user: await userRepository.findById(user._id), // Get user without password
                    tokens: {
                        accessToken,
                        refreshToken
                    }
                }
            });
        } catch (error) {
            console.error('Login error:', error);
            res.status(500).json({
                success: false,
                message: 'Internal server error'
            });
        }
    }

    // Refresh access token
    async refresh(req, res) {
        try {
            const { refreshToken } = req.body;

            if (!refreshToken) {
                return res.status(401).json({
                    success: false,
                    message: 'Refresh token required'
                });
            }

            // Verify refresh token
            const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
            const user = await userRepository.findById(decoded.id);

            if (!user) {
                return res.status(401).json({
                    success: false,
                    message: 'Invalid refresh token'
                });
            }

            // Check if refresh token exists in database
            const hasToken = await userRepository.hasRefreshToken(user._id, refreshToken);
            if (!hasToken) {
                return res.status(401).json({
                    success: false,
                    message: 'Invalid refresh token'
                });
            }

            // Remove old refresh token
            await userRepository.removeRefreshToken(user._id, refreshToken);

            // Generate new tokens
            const newAccessToken = user.generateAccessToken();
            const newRefreshToken = user.generateRefreshToken();

            // Store new refresh token
            await userRepository.addRefreshToken(user._id, newRefreshToken);

            res.json({
                success: true,
                message: 'Tokens refreshed successfully',
                data: {
                    tokens: {
                        accessToken: newAccessToken,
                        refreshToken: newRefreshToken
                    }
                }
            });
        } catch (error) {
            console.error('Refresh error:', error);
            res.status(401).json({
                success: false,
                message: 'Invalid refresh token'
            });
        }
    }

    // Logout user
    async logout(req, res) {
        try {
            const { refreshToken } = req.body;

            if (!refreshToken) {
                return res.status(400).json({
                    success: false,
                    message: 'Refresh token required'
                });
            }

            // Verify and get user
            const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
            const user = await userRepository.findById(decoded.id);

            if (user) {
                // Remove refresh token
                await userRepository.removeRefreshToken(user._id, refreshToken);
            }

            res.json({
                success: true,
                message: 'Logged out successfully'
            });
        } catch (error) {
            console.error('Logout error:', error);
            res.json({
                success: true,
                message: 'Logged out successfully'
            });
        }
    }

    // Get current user profile
    async getProfile(req, res) {
        try {
            const user = await userRepository.findById(req.user.id);
            
            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: 'User not found'
                });
            }

            res.json({
                success: true,
                data: {
                    user
                }
            });
        } catch (error) {
            console.error('Get profile error:', error);
            res.status(500).json({
                success: false,
                message: 'Internal server error'
            });
        }
    }
}

module.exports = new AuthController();
