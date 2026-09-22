import { ToggleGroup, ToggleGroupItem } from '@moduix/solid/toggle-group';

export default function ToggleGroupAsChildDemo() {
  return (
    <ToggleGroup defaultValue={['left']} aria-label="Text alignment">
      <ToggleGroupItem value="left" asChild={(props) => <button {...props()} type="button" />}>
        Left
      </ToggleGroupItem>
      <ToggleGroupItem value="center" asChild={(props) => <button {...props()} type="button" />}>
        Center
      </ToggleGroupItem>
      <ToggleGroupItem value="right" asChild={(props) => <button {...props()} type="button" />}>
        Right
      </ToggleGroupItem>
    </ToggleGroup>
  );
}
