import { expect, test } from '@rstest/core';
import { fireEvent, render, screen } from '@testing-library/react';
import { Button, Menu } from '../src';

function TestMenu() {
  return (
    <Menu defaultOpen>
      <Menu.Trigger asChild>
        <Button>Actions</Button>
      </Menu.Trigger>
      <Menu.Positioner>
        <Menu.Content>
          <Menu.Item value="edit">Edit</Menu.Item>
          <Menu.CheckboxItem checked={false} value="toolbar">
            <Menu.ItemIndicator />
            <Menu.ItemText>Show toolbar</Menu.ItemText>
          </Menu.CheckboxItem>
        </Menu.Content>
      </Menu.Positioner>
    </Menu>
  );
}

function CheckboxMenu() {
  return (
    <Menu defaultOpen>
      <Menu.Trigger asChild>
        <Button>Actions</Button>
      </Menu.Trigger>
      <Menu.Positioner>
        <Menu.Content>
          <Menu.CheckboxItem checked value="toolbar">
            <Menu.ItemIndicator />
            <Menu.ItemText>Show toolbar</Menu.ItemText>
          </Menu.CheckboxItem>
        </Menu.Content>
      </Menu.Positioner>
    </Menu>
  );
}

test('returns focus to the trigger after escape', () => {
  render(<TestMenu />);

  const trigger = screen.getByRole('button', { name: 'Actions' });
  trigger.focus();

  expect(screen.getByRole('menu')).toBeVisible();

  fireEvent.keyDown(document.activeElement!, { key: 'Escape' });

  expect(trigger).toHaveFocus();
});

test('renders the controlled checked state for checkbox items', () => {
  render(<CheckboxMenu />);

  const item = screen.getByRole('menuitemcheckbox', { name: 'Show toolbar' });

  expect(item).toHaveAttribute('data-state', 'checked');
  expect(screen.getByRole('menu')).toBeVisible();
});

test('preserves custom context trigger styling', () => {
  render(
    <Menu defaultOpen>
      <Menu.ContextTrigger asChild>
        <button type="button">Open context menu</button>
      </Menu.ContextTrigger>
      <Menu.Positioner>
        <Menu.Content>
          <Menu.Arrow />
          <Menu.Item value="edit">Edit</Menu.Item>
        </Menu.Content>
      </Menu.Positioner>
    </Menu>,
  );

  const trigger = screen.getByRole('button', { name: 'Open context menu' });
  expect(trigger.className).toBe('');

  const content = screen.getByRole('menu');
  expect(content).toBeVisible();
  expect(content.firstElementChild).toHaveAttribute('data-slot', 'menu-arrow');
});