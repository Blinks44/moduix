import { PinInput } from '@moduix/react';

export default function GroupedPinInput() {
  return (
    <PinInput count={6} className="customRoot">
      <PinInput.Label>Auth code</PinInput.Label>
      <PinInput.Control>
        {[0, 1, 2].map((index) => (
          <PinInput.Input key={index} index={index} />
        ))}
        <PinInput.Separator />
        {[3, 4, 5].map((index) => (
          <PinInput.Input key={index} index={index} />
        ))}
      </PinInput.Control>
    </PinInput>
  );
}