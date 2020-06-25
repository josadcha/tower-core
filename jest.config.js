module.exports = {
    'roots': [
        '<rootDir>'
    ],
    'transform': {
        '^.+\\.(tsx|ts)$': 'ts-jest',
        '^.+\\.(jsx|js)$': 'babel-jest',
        '^.+\\.svg$': '<rootDir>/svgTransform.js',
    },
    'testRegex': '(^.*|(\\.|/)(test|spec))\\.(tsx|ts)$',
    'moduleFileExtensions': [
        'ts',
        'tsx',
        'js',
        'jsx',
        'json',
    ],
    'snapshotSerializers': ['enzyme-to-json/serializer'],
    'transformIgnorePatterns': [
        "<rootDir>/node_modules/(?!lodash-es)"
    ],
    'moduleNameMapper': {
        '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
            '<rootDir>/__mocks__/fileMock.js'
    },
    'testURL': "http://localhost/tower",
    'collectCoverage': false,
    'collectCoverageFrom': [
        "<rootDir>/src/**/*.{ts,tsx,js,jsx}",
    ],
};
