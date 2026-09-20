import { afterEach, expect } from '@rstest/core';
import * as jestDomMatchers from '@testing-library/jest-dom/matchers';
import { cleanup } from '@testing-library/vue';

expect.extend(jestDomMatchers);

afterEach(() => {
  cleanup();
});