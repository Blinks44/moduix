import { Collapsible } from '@moduix/react';
import { ChevronDown as ChevronDownIcon } from 'lucide-react';

const recoveryKeys = ['alien-bean-pasta', 'wild-irish-burrito', 'horse-battery-staple'];

export default function CustomCompositionCollapsibleDemo() {
  return (
    <Collapsible>
      <Collapsible.Trigger asChild>
        <button type="button" className="collapsible-custom-trigger">
          Styled recovery keys
          <Collapsible.Indicator className="collapsible-custom-indicator">
            <ChevronDownIcon />
          </Collapsible.Indicator>
        </button>
      </Collapsible.Trigger>
      <Collapsible.Content>
        <Collapsible.Body className="collapsible-custom-content-body">
          <ul className="collapsible-keys-list">
            {recoveryKeys.map((key) => (
              <li key={key}>{key}</li>
            ))}
          </ul>
        </Collapsible.Body>
      </Collapsible.Content>
    </Collapsible>
  );
}