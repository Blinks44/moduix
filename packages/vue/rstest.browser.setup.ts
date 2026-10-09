import { afterEach } from '@rstest/core';
import { cleanup } from '@testing-library/vue';
import '../foundation/src/styles/style.css';
import '../foundation/src/styles/reset.css';

afterEach(cleanup);