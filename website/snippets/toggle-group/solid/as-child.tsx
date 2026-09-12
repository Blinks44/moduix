import { ToggleGroup } from '@moduix/solid/toggle-group';

export default function ToggleGroupAsChildDemo() {
  return (
    <ToggleGroup defaultValue={['left']} aria-label="Text alignment">
      <ToggleGroup.Item
        value="left"
        asChild={(props) => {
          const resolvedProps = props();

          return (
            <button {...resolvedProps} type="button">
              {resolvedProps.children}
            </button>
          );
        }}
      >
        Left
      </ToggleGroup.Item>
      <ToggleGroup.Item
        value="center"
        asChild={(props) => {
          const resolvedProps = props();

          return (
            <button {...resolvedProps} type="button">
              {resolvedProps.children}
            </button>
          );
        }}
      >
        Center
      </ToggleGroup.Item>
      <ToggleGroup.Item
        value="right"
        asChild={(props) => {
          const resolvedProps = props();

          return (
            <button {...resolvedProps} type="button">
              {resolvedProps.children}
            </button>
          );
        }}
      >
        Right
      </ToggleGroup.Item>
    </ToggleGroup>
  );
}