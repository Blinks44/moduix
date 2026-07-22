import { createListCollection, useListCollection } from '@ark-ui/react/collection';
import { useFilter } from '@ark-ui/react/locale';
import { Button, Card, Checkbox, Combobox, Field, Select } from '@moduix/react';

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
  const { contains } = useFilter({ sensitivity: 'base' });
  const { collection, filter } = useListCollection({
    initialItems: people,
    filter: contains,
  });

  return (
    <form
      className="form"
      onSubmit={(event) => {
        event.preventDefault();
        console.log(Object.fromEntries(new FormData(event.currentTarget)));
      }}
    >
      <Card>
        <Card.Header>
          <Card.Title>Create project</Card.Title>
          <Card.Description>Share the details your team needs to get started.</Card.Description>
        </Card.Header>

        <Card.Body className="fields">
          <Field required>
            <Field.Label>
              Project name
              <Field.RequiredIndicator />
            </Field.Label>
            <Field.Input name="name" />
          </Field>

          <Field required>
            <Field.Label>
              Team
              <Field.RequiredIndicator />
            </Field.Label>
            <Select collection={teams} name="team">
              <Select.Control>
                <Select.Trigger>
                  <Select.ValueText placeholder="Choose a team" />
                  <Select.Indicator />
                </Select.Trigger>
              </Select.Control>
              <Select.Positioner>
                <Select.Content>
                  {teams.items.map((item) => (
                    <Select.Item key={item.value} item={item}>
                      <Select.ItemText>{item.label}</Select.ItemText>
                      <Select.ItemIndicator />
                    </Select.Item>
                  ))}
                </Select.Content>
              </Select.Positioner>
            </Select>
          </Field>

          <Field required>
            <Field.Label>
              Reviewer
              <Field.RequiredIndicator />
            </Field.Label>
            <Combobox
              collection={collection}
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
                    {collection.items.map((item) => (
                      <Combobox.Option key={item.value} item={item}>
                        {item.label}
                      </Combobox.Option>
                    ))}
                  </Combobox.List>
                </Combobox.Content>
              </Combobox.Positioner>
            </Combobox>
          </Field>

          <Field>
            <Field.Label>Summary</Field.Label>
            <Field.Textarea name="summary" placeholder="What are you planning to build?" rows={3} />
          </Field>

          <Checkbox name="notifications">
            <Checkbox.Control />
            <Checkbox.Label>Send status notifications</Checkbox.Label>
          </Checkbox>
        </Card.Body>

        <Card.Footer>
          <Button className="submit" type="submit">
            Create project
          </Button>
        </Card.Footer>
      </Card>
    </form>
  );
}