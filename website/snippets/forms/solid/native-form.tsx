import { createListCollection, useListCollection } from '@ark-ui/solid/collection';
import { useFilter } from '@ark-ui/solid/locale';
import { Button } from '@moduix/solid/button';
import {
  Card,
  CardBody,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@moduix/solid/card';
import {
  Checkbox,
  CheckboxControl,
  CheckboxHiddenInput,
  CheckboxLabel,
} from '@moduix/solid/checkbox';
import { Combobox } from '@moduix/solid/combobox';
import { Field, FieldLabel, FieldRequiredIndicator } from '@moduix/solid/field';
import { Input } from '@moduix/solid/input';
import {
  Select,
  SelectControl,
  SelectTrigger,
  SelectValueText,
  SelectIndicator,
  SelectPositioner,
  SelectContent,
  SelectItem,
  SelectItemText,
  SelectItemIndicator,
  SelectHiddenSelect,
} from '@moduix/solid/select';
import { Textarea } from '@moduix/solid/textarea';
import { For } from 'solid-js';
import styles from '@/components/examples/forms/forms-native-form.module.css';

const teams = createListCollection({
  items: [
    { label: 'Platform', value: 'platform' },
    { label: 'Product', value: 'product' },
    { label: 'Design', value: 'design' },
  ],
});

const people = [
  { label: 'Ada Lovelace', value: 'ada' },
  { label: 'Grace Hopper', value: 'grace' },
  { label: 'Margaret Hamilton', value: 'margaret' },
  { label: 'Radia Perlman', value: 'radia' },
];

export default function NativeForm() {
  const { contains } = useFilter({ sensitivity: 'base' })();
  const { collection, filter } = useListCollection({
    initialItems: people,
    filter: contains,
  });

  const handleSubmit = (event: SubmitEvent) => {
    event.preventDefault();
    const form = event.currentTarget as HTMLFormElement;
    console.log(Object.fromEntries(new FormData(form)));
  };

  return (
    <form class={styles.root} onSubmit={handleSubmit}>
      <Card>
        <CardHeader>
          <CardTitle>Create project</CardTitle>
          <CardDescription>Share the details your team needs to get started.</CardDescription>
        </CardHeader>

        <CardBody class={styles.stack}>
          <Field required>
            <FieldLabel>
              Project name
              <FieldRequiredIndicator />
            </FieldLabel>
            <Input name="name" />
          </Field>

          <Field required>
            <FieldLabel>
              Team
              <FieldRequiredIndicator />
            </FieldLabel>
            <Select collection={teams} name="team">
              <SelectControl>
                <SelectTrigger>
                  <SelectValueText placeholder="Choose a team" />
                </SelectTrigger>
                <SelectIndicator />
              </SelectControl>
              <SelectPositioner>
                <SelectContent>
                  <For each={teams.items}>
                    {(item) => (
                      <SelectItem item={item}>
                        <SelectItemText>{item.label}</SelectItemText>
                        <SelectItemIndicator />
                      </SelectItem>
                    )}
                  </For>
                </SelectContent>
              </SelectPositioner>
              <SelectHiddenSelect />
            </Select>
          </Field>

          <Field required>
            <FieldLabel>
              Reviewer
              <FieldRequiredIndicator />
            </FieldLabel>
            <Combobox
              collection={collection()}
              name="reviewer"
              onInputValueChange={(details) => filter(details.inputValue)}
            >
              <Combobox.Control>
                <Combobox.Input placeholder="Search people" />
                <Combobox.ClearTrigger aria-label="Clear reviewer" />
                <Combobox.Trigger aria-label="Open reviewers" />
              </Combobox.Control>
              <Combobox.Positioner>
                <Combobox.Content>
                  <Combobox.Empty>No reviewers found.</Combobox.Empty>
                  <Combobox.List>
                    <For each={collection().items}>
                      {(item) => <Combobox.Option item={item}>{item.label}</Combobox.Option>}
                    </For>
                  </Combobox.List>
                </Combobox.Content>
              </Combobox.Positioner>
            </Combobox>
          </Field>

          <Field>
            <FieldLabel>Summary</FieldLabel>
            <Textarea name="summary" placeholder="What are you planning to build?" rows={3} />
          </Field>

          <Checkbox name="notifications">
            <CheckboxControl />
            <CheckboxLabel>Send status notifications</CheckboxLabel>
            <CheckboxHiddenInput />
          </Checkbox>
        </CardBody>

        <CardFooter>
          <Button class={styles.submit} type="submit">
            Create project
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}
