import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/svelte';
import AsChildKbd from './kbd/AsChildKbd.svelte';
import GroupKbd from './kbd/GroupKbd.svelte';

test('renders semantic keycaps and a labelled shortcut group with stable hooks', () => {
  const { component } = render(GroupKbd);

  const group = screen.getByRole('group', { name: 'Command K' });
  const key = screen.getByTestId('key');

  expect(group.tagName).toBe('SPAN');
  expect(component.getRefs().groupRef).toBe(group);
  expect(group.getAttribute('data-scope')).toBe('kbd');
  expect(group.getAttribute('data-part')).toBe('group');
  expect(group.getAttribute('data-slot')).toBe('kbd-group');
  expect(group.getAttribute('aria-label')).toBe('Command K');
  expect(key.tagName).toBe('KBD');
  expect(key.getAttribute('data-scope')).toBe('kbd');
  expect(key.getAttribute('data-part')).toBe('root');
  expect(key.getAttribute('data-slot')).toBe('kbd-root');
  expect(key.dataset).toMatchObject({ scope: 'kbd', part: 'root' });
});

test('preserves semantic children and refs with asChild', () => {
  const { component } = render(AsChildKbd);

  const group = screen.getByRole('group', { name: 'Command K' });
  const key = screen.getByTitle('Escape');
  const refs = component.getRefs();

  expect(group.tagName).toBe('SPAN');
  expect(refs.groupRef).toBe(group);
  expect(key.tagName).toBe('KBD');
  expect(refs.keyRef).toBe(key);
  expect(group.getAttribute('data-part')).toBe('group');
  expect(group.getAttribute('data-slot')).toBe('kbd-group');
  expect(key.getAttribute('data-part')).toBe('root');
  expect(key.getAttribute('data-slot')).toBe('kbd-root');
});