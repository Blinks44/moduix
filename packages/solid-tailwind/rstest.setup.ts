import { afterEach, expect } from '@rstest/core';
import { cleanup } from '@solidjs/testing-library';
import * as jestDomMatchers from '@testing-library/jest-dom/matchers';

expect.extend(jestDomMatchers);

afterEach(() => {
  cleanup();
});