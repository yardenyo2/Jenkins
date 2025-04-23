const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { register, login } = require('../../src/controllers/userController');

// Mock the database pool
jest.mock('../../src/db', () => ({
  pool: {
    query: jest.fn()
  }
}));

describe('User Controller Unit Tests', () => {
  let mockReq;
  let mockRes;
  let mockPool;

  beforeEach(() => {
    mockReq = {
      body: {
        email: 'test@example.com',
        password: 'password123'
      }
    };
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    mockPool = require('../../src/db').pool;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('register', () => {
    it('should register a new user successfully', async () => {
      mockPool.query.mockResolvedValueOnce([[]]); // No existing user
      mockPool.query.mockResolvedValueOnce([{ insertId: 1 }]); // Insert successful

      await register(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(201);
      expect(mockRes.json).toHaveBeenCalledWith(expect.objectContaining({
        message: 'User registered successfully',
        token: expect.any(String)
      }));
    });

    it('should return error if user already exists', async () => {
      mockPool.query.mockResolvedValueOnce([[{ id: 1 }]]); // Existing user found

      await register(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: 'User already exists'
      });
    });
  });

  describe('login', () => {
    it('should login successfully with valid credentials', async () => {
      const hashedPassword = await bcrypt.hash('password123', 10);
      mockPool.query.mockResolvedValueOnce([[
        { id: 1, email: 'test@example.com', password: hashedPassword, role: 'student' }
      ]]);

      await login(mockReq, mockRes);

      expect(mockRes.json).toHaveBeenCalledWith(expect.objectContaining({
        message: 'Login successful',
        token: expect.any(String)
      }));
    });

    it('should return error with invalid credentials', async () => {
      mockPool.query.mockResolvedValueOnce([[]]); // No user found

      await login(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(401);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: 'Invalid credentials'
      });
    });
  });
}); 