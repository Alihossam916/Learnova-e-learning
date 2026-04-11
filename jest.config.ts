import type { Config } from "jest";
import nextJest from "next/jest.js";

const createJestConfig = nextJest({ dir: "./" });

const customConfig = async (): Promise<Config> => {
  const nextConfig = await createJestConfig({})();

  return {
    ...nextConfig,
    collectCoverage: true,
    coverageDirectory: "coverage",
    coverageProvider: "v8",
    testEnvironment: "node",
    moduleNameMapper: {
      ...nextConfig.moduleNameMapper,
      "^uuid$": "<rootDir>/__mocks__/uuid.js",
      "^next/headers$": "<rootDir>/__mocks__/next/headers.js",
      "^@/(.*)$": "<rootDir>/$1",
    },
  };
};

export default customConfig;