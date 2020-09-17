module.exports = {
    roots: ["<rootDir>/src"],
    collectCoverage: true,
    collectCoverageFrom: [
        "src/**/*.{js,jsx,ts,tsx}",
        "!src/setupTests.js",
        "!src/index.js",
        "!**/node_modules/**"
    ],
    coverageDirectory: "coverage",
    testTimeout: 10000,
    coverageReporters: ["json", "lcov"],
    transform: {
        "^.+\\.(js|jsx|ts|tsx)$": "babel-jest",
        "\\.(gql|graphql)$": "@jagi/jest-transform-graphql"
    },
    testMatch: ["<rootDir>/src/**/__tests__/**/*.{spec,test}.{js,jsx,ts,tsx}"],
    moduleFileExtensions: ["js", "jsx", "ts", "tsx"],
    modulePaths: ["<rootDir>/src", "<rootDir>/node_modules"],
    moduleNameMapper: {
        "@vtexlab/cashflow": "<rootDir>/node_modules/@vtexlab/cashflow/es/index.js",
        "\\.(jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga|css|less)$": "<rootDir>/src/__mocks__/fileMock.js",
        "\\.(svg)$": "<rootDir>/src/__mocks__/svgMock.js"
    },
    transformIgnorePatterns: [
        "/node_modules/(?!(@vtex|@vtexlab|react-intl/src)/)"
    ],
    setupFiles: ["<rootDir>/src/setupTests.js"],
    setupFilesAfterEnv: ["<rootDir>/src/setupTestsAfterEnv.js"],
    clearMocks: true,
    restoreMocks: true,
}