import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/react';
import {
  Collapsible,
  CollapsibleBody,
  CollapsibleContent,
  CollapsibleIndicator,
  CollapsibleTrigger,
} from '@/index';

test('lets consumer Tailwind classes override conflicting defaults', () => {
  render(
    <Collapsible className="w-1/2 text-primary" data-testid="collapsible-root">
      <CollapsibleTrigger className="gap-6 py-4 text-lg">
        Recovery details
        <CollapsibleIndicator className="size-5" />
      </CollapsibleTrigger>
      <CollapsibleContent className="text-lg">
        <CollapsibleBody className="gap-6 p-6">Keep this safe.</CollapsibleBody>
      </CollapsibleContent>
    </Collapsible>,
  );

  const root = screen.getByTestId('collapsible-root');
  const trigger = screen.getByRole('button', { name: 'Recovery details' });
  const indicator = root.querySelector('[data-slot="collapsible-indicator"]');
  const content = root.querySelector('[data-slot="collapsible-content"]');
  const body = root.querySelector('[data-slot="collapsible-body"]');

  expect([...root!.classList]).toEqual(expect.arrayContaining(['w-1/2', 'text-primary']));
  expect([...trigger!.classList]).toEqual(expect.arrayContaining(['gap-6', 'py-4', 'text-lg']));
  expect(indicator?.classList.contains('size-5')).toBe(true);
  expect(content?.classList.contains('text-lg')).toBe(true);
  expect([...body!.classList]).toEqual(expect.arrayContaining(['gap-6', 'p-6']));
});