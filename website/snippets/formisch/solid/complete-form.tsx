import { createListCollection, useListCollection } from '@ark-ui/solid/collection';
import { useFilter } from '@ark-ui/solid/locale';
import { Field as FormischField, Form, createForm } from '@formisch/solid';
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
import { Field } from '@moduix/solid/field';
import { Input } from '@moduix/solid/input';
import { Select } from '@moduix/solid/select';
import { Textarea } from '@moduix/solid/textarea';
import { For } from 'solid-js';
import * as v from 'valibot';
import styles from '@/components/examples/formisch/formisch-complete-form.module.css';

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
  const { contains } = useFilter({ sensitivity: 'base' })();
  const { collection, filter } = useListCollection({
    initialItems: people,
    filter: contains,
  });
  const form = createForm({
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
      class={styles.form}
      of={form}
      onSubmit={async (values) => {
        await new Promise((resolve) => setTimeout(resolve, 600));
        console.log(values);
      }}
    >
      <Card>
        <CardHeader>
          <CardTitle>Create project</CardTitle>
          <CardDescription>Share the details your team needs to get started.</CardDescription>
        </CardHeader>

        <CardBody class={styles.fields}>
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
                  onValueChange={(details) => field.onInput(details.value[0] ?? '')}
                  invalid={field.errors !== null}
                >
                  <Select.Control>
                    <Select.Trigger
                      ref={field.props.ref as unknown as (element: HTMLButtonElement) => void}
                      autofocus={field.props.autofocus}
                      onFocus={field.props.onFocus}
                      onBlur={field.props.onBlur}
                    >
                      <Select.ValueText placeholder="Choose a team" />
                    </Select.Trigger>
                    <Select.Indicator />
                  </Select.Control>
                  <Select.Positioner>
                    <Select.Content>
                      <For each={teams.items}>
                        {(item) => (
                          <Select.Item item={item}>
                            <Select.ItemText>{item.label}</Select.ItemText>
                            <Select.ItemIndicator />
                          </Select.Item>
                        )}
                      </For>
                    </Select.Content>
                  </Select.Positioner>
                  <Select.HiddenSelect />
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
                  collection={collection()}
                  name={field.props.name}
                  value={field.input ? [field.input] : []}
                  onValueChange={(details) => field.onInput(details.value[0] ?? '')}
                  onInputValueChange={(details) => filter(details.inputValue)}
                  invalid={field.errors !== null}
                >
                  <Combobox.Control>
                    <Combobox.Input
                      ref={field.props.ref}
                      autofocus={field.props.autofocus}
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
                        <For each={collection().items}>
                          {(item) => <Combobox.Option item={item}>{item.label}</Combobox.Option>}
                        </For>
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
                  onCheckedChange={(details) => field.onInput(details.checked === true)}
                  onFocus={field.props.onFocus}
                  onBlur={field.props.onBlur}
                >
                  <CheckboxControl />
                  <CheckboxLabel>Send status notifications</CheckboxLabel>
                  <CheckboxHiddenInput />
                </Checkbox>
                <Field.ErrorText>{field.errors?.[0]}</Field.ErrorText>
              </Field>
            )}
          </FormischField>
        </CardBody>

        <CardFooter>
          <Button class={styles.submit} type="submit" loading={form.isSubmitting}>
            {form.isSubmitting ? 'Creating…' : 'Create project'}
          </Button>
        </CardFooter>
      </Card>
    </Form>
  );
}