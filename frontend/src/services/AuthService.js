export const AuthService = {
  async login(role) {
    await new Promise((resolve) => setTimeout(resolve, 200))
    return {
      token: `demo-token-${role}`,
      role,
    }
  },
}
