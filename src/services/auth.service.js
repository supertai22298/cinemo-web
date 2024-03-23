const mockUser = {
  username: 'cinemo-web',
  password: 'cinemo-web',
  role: 'User role',
  displayName: 'Cinemo User',
  email: 'cinemo-web@example.com',
};

export const authService = {
  async login(username, password) {
    if (username === mockUser.username && password === mockUser.password) {
      return { user: mockUser, success: true };
    }
    return { error: 'Username or password incorrectly', success: false };
  },
  async logout() {
    return { success: true };
  },
};
