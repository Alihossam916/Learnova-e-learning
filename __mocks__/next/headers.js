// Shared in-memory cookie store — one object, never replaced
const fakeCookies = {};

// cookies() returns the same store object every time.
// NOT using jest.fn() so clearMocks:true can't accidentally reset it.
async function cookies() {
  return {
    get: (name) => (fakeCookies[name] ? { value: fakeCookies[name] } : undefined),
    set: (name, value) => { fakeCookies[name] = value; },
    delete: (name) => { delete fakeCookies[name]; },
  };
}

// Helpers for tests to inspect and reset the store
const getFakeCookies = () => fakeCookies;
const clearFakeCookies = () => {
  Object.keys(fakeCookies).forEach((key) => delete fakeCookies[key]);
};

module.exports = { cookies, getFakeCookies, clearFakeCookies };