import { PinInput, PinInputLabel, PinInputControl, PinInputInput, PinInputSeparator } from '@moduix/react/pin-input';

export default function GroupedPinInput() {
  return (
    <PinInput count={6}>
      <PinInputLabel>Auth code</PinInputLabel>
      <PinInputControl>
        {[0, 1, 2].map((index) => (
          <PinInputInput key={index} index={index} />
        ))}
        <PinInputSeparator />
        {[3, 4, 5].map((index) => (
          <PinInputInput key={index} index={index} />
        ))}
      </PinInputControl>
    </PinInput>
  );
}
