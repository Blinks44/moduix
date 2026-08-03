import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/react';
import { Sidebar } from '../src';

test('keeps the default panel, inset, and resize ids aligned', () => {
  render(
    <Sidebar panelId="navigation" data-testid="sidebar">
      <Sidebar.Panel data-testid="panel" />
      <Sidebar.ResizeTrigger data-testid="resize" />
      <Sidebar.Trigger />
      <Sidebar.Inset data-testid="inset">Content</Sidebar.Inset>
    </Sidebar>,
  );

  const panel = screen.getByTestId('panel');
  const inset = screen.getByTestId('inset');
  const resize = screen.getByTestId('resize');

  expect(screen.getByTestId('sidebar')).toHaveAttribute('data-side', 'left');
  expect(panel.id).toMatch(/:panel:navigation$/);
  expect(inset.id).toMatch(/:panel:content$/);
  expect(resize.id).toMatch(/:splitter:navigation:content$/);
  expect(resize).toHaveAttribute('aria-controls', `${panel.id} ${inset.id}`);
  expect(resize).toHaveAttribute('aria-label', 'Resize sidebar');
  expect(screen.getByRole('button', { name: 'Toggle sidebar' })).toHaveAttribute(
    'aria-expanded',
    'true',
  );
});

test('reverses the resize pair for a right sidebar', () => {
  render(
    <Sidebar side="right" panelId="inspector">
      <Sidebar.Inset />
      <Sidebar.Trigger />
      <Sidebar.ResizeTrigger data-testid="resize" />
      <Sidebar.Panel />
    </Sidebar>,
  );

  const resize = screen.getByTestId('resize');

  expect(resize.id).toMatch(/:splitter:content:inspector$/);
  expect(resize).toHaveAttribute('data-side', 'right');
});