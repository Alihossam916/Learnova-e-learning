// Manual mock for uuid — replaces the ESM-only uuid package in Jest
// v4 returns a predictable value, making tests deterministic
const v4 = jest.fn(() => "mock-uuid-1234");

module.exports = { v4 };