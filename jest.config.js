module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  moduleNameMapper: {
    "\\.(css|less|sass|scss)$": "<rootDir>/__mocks__/styleMock.js"
  }
}
