import { createListCollection, useListCollection } from '@ark-ui/react/collection';
import { useFilter } from '@ark-ui/react/locale';
import { Field as FormischField, Form, useForm } from '@formisch/react';
import { Button } from '@moduix/react/button';
import { Card } from '@moduix/react/card';
import { Checkbox } from '@moduix/react/checkbox';
import { Combobox } from '@moduix/react/combobox';
import { Field } from '@moduix/react/field';
import { Input } from '@moduix/react/input';
import { Select } from '@moduix/react/select';
import { Textarea } from '@moduix/react/textarea';
import * as v from 'valibot';

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

const projectSchema = v.object({
  name: v.pipe(v.string(), v.minLength(1, 'Enter a project name.')),
  team: v.pipe(v.string(), v.minLength(1, 'Choose a team.')),
  reviewer: v.pipe(v.string(), v.minLength(1, 'Choose a reviewer.')),
  summary: v.string(),
  notifications: v.boolean(),
});

export default function ProjectForm() {
  const { contains } = useFilter({ sensitivity: 'base' });
  const { collection, filter } = useListCollection({ initialItems: people, filter: contains });
  const form = useForm({
    schema: projectSchema,
    initialInput: {
      name: '',
      team: '',
      reviewer: '',
      summary: '',
      notifications: false,
    },
    validate: 'submit',
    revalidate: 'input',
  });

  return (
    <Form
      className="form"
      of={form}
      onSubmit={async (values) => {
        await new Promise((resolve) => setTimeout(resolve, 600));
        console.log(values);
      }}
    >
      <Card>
        <Card.Header>
          <Card.Title>Create project</Card.Title>
          <Card.Description>Share the details your team needs to get started.</Card.Description>
        </Card.Header>

        <Card.Body className="fields">
          <FormischField of={form} path={['name']}>
            {(field) => (
              <Field invalid={field.errors !== null} required>
                <Field.Label>
                  Project name
                  <Field.RequiredIndicator />
                </Field.Label>
                <Input {...field.props} value={field.input ?? ''} />
                <Field.ErrorText>{field.errors?.[0]}</Field.ErrorText>
              </Field>
            )}
          </FormischField>

          <FormischField of={form} path={['team']}>
            {(field) => (
              <Field invalid={field.errors !== null} required>
                <Field.Label>
                  Team
                  <Field.RequiredIndicator />
                </Field.Label>
                <Select
                  collection={teams}
                  name={field.props.name}
                  value={field.input ? [field.input] : []}
                  onValueChange={(details) => field.onChange(details.value[0] ?? '')}
                  invalid={field.errors !== null}
                >
                  <Select.Control>
                    <Select.Trigger onFocus={field.props.onFocus} onBlur={field.props.onBlur}>
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
                <Field.ErrorText>{field.errors?.[0]}</Field.ErrorText>
              </Field>
            )}
          </FormischField>

          <FormischField of={form} path={['reviewer']}>
            {(field) => (
              <Field invalid={field.errors !== null} required>
                <Field.Label>
                  Reviewer
                  <Field.RequiredIndicator />
                </Field.Label>
                <Combobox
                  collection={collection}
                  name={field.props.name}
                  value={field.input ? [field.input] : []}
                  onValueChange={(details) => field.onChange(details.value[0] ?? '')}
                  onInputValueChange={(details) => filter(details.inputValue)}
                  invalid={field.errors !== null}
                >
                  <Combobox.Control>
                    <Combobox.Input
                      ref={field.props.ref}
                      autoFocus={field.props.autoFocus}
                      onFocus={field.props.onFocus}
                      onBlur={field.props.onBlur}
                      placeholder="Search people"
                    />
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
                <Field.ErrorText>{field.errors?.[0]}</Field.ErrorText>
              </Field>
            )}
          </FormischField>

          <FormischField of={form} path={['summary']}>
            {(field) => (
              <Field>
                <Field.Label>Summary</Field.Label>
                <Textarea
                  {...field.props}
                  value={field.input ?? ''}
                  placeholder="What are you planning to build?"
                  rows={3}
                />
              </Field>
            )}
          </FormischField>

          <FormischField of={form} path={['notifications']}>
            {(field) => (
              <Field invalid={field.errors !== null}>
                <Checkbox
                  name={field.props.name}
                  checked={field.input ?? false}
                  invalid={field.errors !== null}
                  onCheckedChange={(details) => field.onChange(details.checked === true)}
                  onFocus={field.props.onFocus}
                  onBlur={field.props.onBlur}
                >
                  <Checkbox.Control />
                  <Checkbox.Label>Send status notifications</Checkbox.Label>
                </Checkbox>
                <Field.ErrorText>{field.errors?.[0]}</Field.ErrorText>
              </Field>
            )}
          </FormischField>
        </Card.Body>

        <Card.Footer>
          <Button className="submit" type="submit" loading={form.isSubmitting}>
            {form.isSubmitting ? 'Creating…' : 'Create project'}
          </Button>
        </Card.Footer>
      </Card>
    </Form>
  );
}