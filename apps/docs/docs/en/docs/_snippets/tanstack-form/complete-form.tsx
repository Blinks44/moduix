import { createListCollection, useListCollection } from '@ark-ui/react/collection';
import { useFilter } from '@ark-ui/react/locale';
import { Button, Card, Checkbox, Combobox, Field, Select } from '@moduix/react';
import { useForm } from '@tanstack/react-form';

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

export default function ProjectForm() {
  const { contains } = useFilter({ sensitivity: 'base' });
  const { collection, filter } = useListCollection({
    initialItems: people,
    filter: contains,
  });
  const form = useForm({
    defaultValues: {
      name: '',
      team: '',
      reviewer: '',
      summary: '',
      notifications: false,
    },
    onSubmit: ({ value }) => console.log(value),
  });

  return (
    <form
      className="form"
      noValidate
      onSubmit={(event) => {
        event.preventDefault();
        event.stopPropagation();
        void form.handleSubmit();
      }}
    >
      <Card>
        <Card.Header>
          <Card.Title>Create project</Card.Title>
          <Card.Description>Share the details your team needs to get started.</Card.Description>
        </Card.Header>

        <Card.Body className="fields">
          <form.Field
            name="name"
            validators={{
              onSubmit: ({ value }) => (!value ? 'Enter a project name.' : undefined),
            }}
          >
            {(field) => (
              <Field invalid={!field.state.meta.isValid} required>
                <Field.Label>
                  Project name
                  <Field.RequiredIndicator />
                </Field.Label>
                <Field.Input
                  name={field.name}
                  value={field.state.value}
                  onChange={(event) => field.handleChange(event.currentTarget.value)}
                  onBlur={field.handleBlur}
                />
                <Field.ErrorText>{field.state.meta.errors.join(', ')}</Field.ErrorText>
              </Field>
            )}
          </form.Field>

          <form.Field
            name="team"
            validators={{
              onSubmit: ({ value }) => (!value ? 'Choose a team.' : undefined),
            }}
          >
            {(field) => (
              <Field invalid={!field.state.meta.isValid} required>
                <Field.Label>
                  Team
                  <Field.RequiredIndicator />
                </Field.Label>
                <Select
                  collection={teams}
                  name={field.name}
                  value={field.state.value ? [field.state.value] : []}
                  onValueChange={(details) => field.handleChange(details.value[0] ?? '')}
                  onInteractOutside={field.handleBlur}
                >
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
                <Field.ErrorText>{field.state.meta.errors.join(', ')}</Field.ErrorText>
              </Field>
            )}
          </form.Field>

          <form.Field
            name="reviewer"
            validators={{
              onSubmit: ({ value }) => (!value ? 'Choose a reviewer.' : undefined),
            }}
          >
            {(field) => (
              <Field invalid={!field.state.meta.isValid} required>
                <Field.Label>
                  Reviewer
                  <Field.RequiredIndicator />
                </Field.Label>
                <Combobox
                  collection={collection}
                  name={field.name}
                  value={field.state.value ? [field.state.value] : []}
                  onValueChange={(details) => field.handleChange(details.value[0] ?? '')}
                  onInputValueChange={(details) => filter(details.inputValue)}
                >
                  <Combobox.Control>
                    <Combobox.Input onBlur={field.handleBlur} placeholder="Search people" />
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
                <Field.ErrorText>{field.state.meta.errors.join(', ')}</Field.ErrorText>
              </Field>
            )}
          </form.Field>

          <form.Field name="summary">
            {(field) => (
              <Field>
                <Field.Label>Summary</Field.Label>
                <Field.Textarea
                  name={field.name}
                  value={field.state.value}
                  onChange={(event) => field.handleChange(event.currentTarget.value)}
                  onBlur={field.handleBlur}
                  placeholder="What are you planning to build?"
                  rows={3}
                />
              </Field>
            )}
          </form.Field>

          <form.Field name="notifications">
            {(field) => (
              <Checkbox
                name={field.name}
                checked={field.state.value}
                onCheckedChange={(details) => field.handleChange(details.checked === true)}
                onBlur={field.handleBlur}
              >
                <Checkbox.Control />
                <Checkbox.Label>Send status notifications</Checkbox.Label>
              </Checkbox>
            )}
          </form.Field>
        </Card.Body>

        <Card.Footer>
          <form.Subscribe selector={(state) => [state.isSubmitting] as const}>
            {([isSubmitting]) => (
              <Button className="submit" type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Creating…' : 'Create project'}
              </Button>
            )}
          </form.Subscribe>
        </Card.Footer>
      </Card>
    </form>
  );
}