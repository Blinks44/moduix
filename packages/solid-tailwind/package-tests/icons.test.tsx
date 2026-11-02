import { expect, test } from '@rstest/core';
import { renderToString } from 'solid-js/web';
import { CloseButton } from '../dist/components/close-button/index.jsx';
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronUpDownIcon,
  ChevronUpIcon,
  CloseIcon,
  CopyIcon,
  IndeterminateIcon,
  MinusIcon,
  PlusIcon,
} from '../dist/internal/icons/ui/Icons.jsx';

// Compile the shipped JSX as a consumer would; source tests cannot catch import renaming.
test('published JSX renders Lucide components as accessible SVG icons', () => {
  for (const Icon of [
    CheckIcon,
    ChevronDownIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
    ChevronUpDownIcon,
    ChevronUpIcon,
    CloseIcon,
    CopyIcon,
    IndeterminateIcon,
    MinusIcon,
    PlusIcon,
  ]) {
    const html = renderToString(() => <Icon />);
    expect(html).toContain('<svg');
    expect(html).toContain('<path');
    expect(html).toContain('aria-hidden="true"');
  }

  const button = renderToString(() => <CloseButton />);
  expect(button).toContain('<button');
  expect(button).toContain('<svg');
});