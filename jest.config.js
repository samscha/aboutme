/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/__mocks__/fileMock.js',
    '\\.(css|scss)$': '<rootDir>/__mocks__/styleMock.ts',
    '^.+\\.tsx?$': 'ts-jest',
  },
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  /*
  "setupFilesAfterEnv": [
    "@testing-library/jest-dom/extend-expect"
]
*/
};

// module.exports = {
//   moduleNameMapper: {
//     '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
//       '<rootDir>/__mocks__/fileMock.js',
//     '\\.(css|scss)$': '<rootDir>/__mocks__/styleMock.ts',
//     '^.+\\.tsx?$': 'ts-jest',
//   },
//   setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
//   testEnvironment: 'jsdom',
//   transform: {
//     '^.+\\.tsx?$': 'ts-jest',
//   },
// };
