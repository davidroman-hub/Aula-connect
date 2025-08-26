// Mock user data for development when MongoDB is not available
export const mockUsers = [
  {
    _id: { $oid: "507f1f77bcf86cd799439011" },
    username: "admin@test.com",
    password: "admin123", // In production, this should be hashed
    type: "admin",
    courses: [],
    adminOrg: 1
  },
  {
    _id: { $oid: "507f1f77bcf86cd799439012" },
    username: "user@test.com", 
    password: "user123", // In production, this should be hashed
    type: "user",
    courses: [],
  }
];

export const findUserByUsername = (username: string) => {
  return mockUsers.find(user => user.username === username);
};
