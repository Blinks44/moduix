import { afterEach } from '@rstest/core';
import { cleanup } from '@testing-library/svelte';
import '../foundation/src/styles/style.css';
import '../foundation/src/styles/reset.css';

afterEach(cleanup);