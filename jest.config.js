module.exports = {
    roots: ['./src'],
    transform: {
        '\\.ts$': 'ts-jest',
    },
    testRegex: '\\.spec\\.ts$',
    moduleFileExtensions: ['ts', 'json', 'js'],
    moduleNameMapper: {
        '@models': '<rootDir>/src/models',
        '@decorators': '<rootDir>/src/decorators',
    },
    setupFilesAfterEnv: [
        '<rootDir>/src/tests/setup.ts',
    ],
}
