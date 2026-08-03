import { expect, test } from '@rstest/core';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRef, useState } from 'react';
import { Field, PinInput, usePinInput } from '../src';

function ControlledPinInput() {
  const [value, setValue] = useState<string[]>([]);

  return (
    <PinInput count={4} value={value} onValueChange={(details) => setValue(details.value)}>
      <PinInput.Label>Verification code</PinInput.Label>
      <PinInput.Control>
        <PinInput.Inputs />
      </PinInput.Control>
    </PinInput>
  );
}

test('renders the recommended composition with Ark anatomy and form participation', () => {
  const { container } = render(
    <form>
      <PinInput count={4} defaultValue={['1', '2', '3', '4']} name="code" required>
        <PinInput.Label>Verification code</PinInput.Label>
        <PinInput.Control>
          <PinInput.Inputs />
        </PinInput.Control>
      </PinInput>
    </form>,
  );

  const form = container.querySelector('form');
  const inputs = screen.getAllByRole('textbox');

  expect(inputs).toHaveLength(4);
  expect(inputs[0]).toHaveAttribute('data-slot', 'pin-input-input');
  expect(container.querySelector('[data-slot="pin-input-hidden-input"]')).not.toBeNull();
  expect(new FormData(form!).get('code')).toBe('1234');
});

test('distributes pasted values through a controlled PinInput', async () => {
  const user = userEvent.setup();
  render(<ControlledPinInput />);

  const [firstInput] = screen.getAllByRole('textbox');
  await user.click(firstInput);
  await user.paste('1234');

  await waitFor(() => {
    expect(screen.getAllByRole('textbox').map((input) => input.getAttribute('value'))).toEqual([
      '1',
      '2',
      '3',
      '4',
    ]);
  });
});

test('keeps invalid, disabled, and read-only Field state on visible inputs', () => {
  render(
    <Field disabled invalid readOnly>
      <PinInput count={4}>
        <PinInput.Label>Verification code</PinInput.Label>
        <PinInput.Control>
          <PinInput.Inputs />
        </PinInput.Control>
      </PinInput>
      <Field.ErrorText>Enter a valid code.</Field.ErrorText>
    </Field>,
  );

  for (const input of screen.getAllByRole('textbox')) {
    expect(input).toBeDisabled();
    expect(input).toHaveAttribute('readonly');
    expect(input).toHaveAttribute('aria-invalid', 'true');
  }
  expect(screen.getByText('Enter a valid code.')).toBeVisible();
});

test('synchronizes native form reset through the automatic hidden input', async () => {
  const user = userEvent.setup();
  const { container } = render(
    <form>
      <PinInput count={4} defaultValue={['1']} name="code">
        <PinInput.Label>Verification code</PinInput.Label>
        <PinInput.Control>
          <PinInput.Inputs />
        </PinInput.Control>
      </PinInput>
      <button type="reset">Reset</button>
    </form>,
  );

  await user.click(screen.getAllByRole('textbox')[0]);
  await user.paste('9876');
  await user.click(screen.getByRole('button', { name: 'Reset' }));

  await waitFor(() => expect(new FormData(container.querySelector('form')!).get('code')).toBe('1'));
});

test('preserves RootProvider and root asChild composition', async () => {
  const user = userEvent.setup();
  const rootRef = createRef<HTMLDivElement>();

  function ProviderPinInput() {
    const pinInput = usePinInput({ count: 4, defaultValue: ['1'] });

    return (
      <>
        <button type="button" onClick={pinInput.clearValue}>
          Clear code
        </button>
        <PinInput.RootProvider value={pinInput}>
          <PinInput.Label>Provider code</PinInput.Label>
          <PinInput.Control>
            <PinInput.Inputs />
          </PinInput.Control>
        </PinInput.RootProvider>
      </>
    );
  }

  const { container } = render(
    <>
      <PinInput asChild count={4} ref={rootRef}>
        <section>
          <PinInput.Label>Custom code</PinInput.Label>
          <PinInput.Control>
            <PinInput.Inputs />
          </PinInput.Control>
        </section>
      </PinInput>
      <ProviderPinInput />
    </>,
  );

  expect(rootRef.current).toHaveAttribute('data-slot', 'pin-input-root');
  expect(container.querySelector('section [data-slot="pin-input-hidden-input"]')).not.toBeNull();
  await user.click(screen.getByRole('button', { name: 'Clear code' }));
  await waitFor(() => expect(screen.getByLabelText('Provider code')).toHaveValue(''));
});