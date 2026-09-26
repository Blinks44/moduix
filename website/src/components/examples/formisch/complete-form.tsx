import { createListCollection, useListCollection } from '@ark-ui/react/collection';
import { useFilter } from '@ark-ui/react/locale';
import { Field as FormischField, Form, useForm } from '@formisch/react';
import { Button } from '@moduix/react/button';
import {
  Card,
  CardBody,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@moduix/react/card';
import {
  Checkbox,
  CheckboxControl,
  CheckboxHiddenInput,
  CheckboxLabel,
} from '@moduix/react/checkbox';
import {
  Combobox,
  ComboboxClearTrigger,
  ComboboxContent,
  ComboboxControl,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxList,
  ComboboxOption,
  ComboboxPositioner,
  ComboboxTrigger,
} from '@moduix/react/combobox';
import { Field, FieldErrorText, FieldLabel, FieldRequiredIndicator } from '@moduix/react/field';
import { Input } from '@moduix/react/input';
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
} from '@moduix/react/select';
import { Textarea } from '@moduix/react/textarea';
import * as v from 'valibot';
import styles from './formisch-complete-form.module.css';

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
      className={styles.form}
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

        <CardBody className={styles.fields}>
          <FormischField of={form} path={['name']}>
            {(field) => (
              <Field invalid={field.errors !== null} required>
                <FieldLabel>
                  Project name
                  <FieldRequiredIndicator />
                </FieldLabel>
                <Input {...field.props} value={field.input ?? ''} />
                <FieldErrorText>{field.errors?.[0]}</FieldErrorText>
              </Field>
            )}
          </FormischField>

          <FormischField of={form} path={['team']}>
            {(field) => (
              <Field invalid={field.errors !== null} required>
                <FieldLabel>
                  Team
                  <FieldRequiredIndicator />
                </FieldLabel>
                <Select
                  collection={teams}
                  name={field.props.name}
                  value={field.input ? [field.input] : []}
                  onValueChange={(details) => field.onChange(details.value[0] ?? '')}
                  invalid={field.errors !== null}
                >
                  <SelectControl>
                    <SelectTrigger onFocus={field.props.onFocus} onBlur={field.props.onBlur}>
                      <SelectValueText placeholder="Choose a team" />
                    </SelectTrigger>
                    <SelectIndicator />
                  </SelectControl>
                  <SelectPositioner>
                    <SelectContent>
                      {teams.items.map((item) => (
                        <SelectItem key={item.value} item={item}>
                          <SelectItemText>{item.label}</SelectItemText>
                          <SelectItemIndicator />
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </SelectPositioner>
                  <SelectHiddenSelect />
                </Select>
                <FieldErrorText>{field.errors?.[0]}</FieldErrorText>
              </Field>
            )}
          </FormischField>

          <FormischField of={form} path={['reviewer']}>
            {(field) => (
              <Field invalid={field.errors !== null} required>
                <FieldLabel>
                  Reviewer
                  <FieldRequiredIndicator />
                </FieldLabel>
                <Combobox
                  collection={collection}
                  name={field.props.name}
                  value={field.input ? [field.input] : []}
                  onValueChange={(details) => field.onChange(details.value[0] ?? '')}
                  onInputValueChange={(details) => filter(details.inputValue)}
                  invalid={field.errors !== null}
                >
                  <ComboboxControl>
                    <ComboboxInput
                      ref={field.props.ref}
                      autoFocus={field.props.autoFocus}
                      onFocus={field.props.onFocus}
                      onBlur={field.props.onBlur}
                      placeholder="Search people"
                    />
                    <ComboboxClearTrigger aria-label="Clear reviewer" />
                    <ComboboxTrigger aria-label="Open reviewers" />
                  </ComboboxControl>
                  <ComboboxPositioner>
                    <ComboboxContent>
                      <ComboboxEmpty>No reviewers found.</ComboboxEmpty>
                      <ComboboxList>
                        {collection.items.map((item) => (
                          <ComboboxOption key={item.value} item={item}>
                            {item.label}
                          </ComboboxOption>
                        ))}
                      </ComboboxList>
                    </ComboboxContent>
                  </ComboboxPositioner>
                </Combobox>
                <FieldErrorText>{field.errors?.[0]}</FieldErrorText>
              </Field>
            )}
          </FormischField>

          <FormischField of={form} path={['summary']}>
            {(field) => (
              <Field>
                <FieldLabel>Summary</FieldLabel>
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
                  <CheckboxControl />
                  <CheckboxLabel>Send status notifications</CheckboxLabel>
                  <CheckboxHiddenInput />
                </Checkbox>
                <FieldErrorText>{field.errors?.[0]}</FieldErrorText>
              </Field>
            )}
          </FormischField>
        </CardBody>

        <CardFooter>
          <Button className={styles.submit} type="submit" loading={form.isSubmitting}>
            {form.isSubmitting ? 'Creating…' : 'Create project'}
          </Button>
        </CardFooter>
      </Card>
    </Form>
  );
}