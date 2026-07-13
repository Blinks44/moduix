//#region demo

import { createListCollection, useListCollection } from '@ark-ui/react/collection';
import { useFilter } from '@ark-ui/react/locale';
import { Button, Card, Checkbox, Combobox, Field, Select } from '@moduix/react';
import { Controller, useForm } from 'react-hook-form';

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

type FormValues = {
  name: string;
  team: string;
  reviewer: string;
  summary: string;
  notifications: boolean;
};

export function ProjectForm() {
  const { contains } = useFilter({ sensitivity: 'base' });
  const { collection, filter } = useListCollection({
    initialItems: people,
    filter: contains,
  });
  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: '',
      team: '',
      reviewer: '',
      summary: '',
      notifications: false,
    } as FormValues,
  });

  return (
    <form className="form" noValidate onSubmit={handleSubmit((values) => console.log(values))}>
      <Card>
        <Card.Header>
          <Card.Title>Create project</Card.Title>
          <Card.Description>Share the details your team needs to get started.</Card.Description>
        </Card.Header>

        <Card.Body className="fields">
          <Field invalid={Boolean(errors.name)} required>
            <Field.Label>
              Project name
              <Field.RequiredIndicator />
            </Field.Label>
            <Field.Input
              {...register('name', {
                required: 'Enter a project name.',
              })}
            />
            <Field.ErrorText>{errors.name?.message}</Field.ErrorText>
          </Field>

          <Controller
            name="team"
            control={control}
            rules={{ required: 'Choose a team.' }}
            render={({ field, fieldState }) => (
              <Field invalid={fieldState.invalid} required>
                <Field.Label>
                  Team
                  <Field.RequiredIndicator />
                </Field.Label>
                <Select
                  collection={teams}
                  name={field.name}
                  value={field.value ? [field.value] : []}
                  onValueChange={(details) => field.onChange(details.value[0] ?? '')}
                  onInteractOutside={field.onBlur}
                >
                  <Select.Control>
                    <Select.Trigger ref={field.ref}>
                      <Select.ValueText placeholder="Choose a team" />
                    </Select.Trigger>
                    <Select.Indicators>
                      <Select.Indicator />
                    </Select.Indicators>
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
                <Field.ErrorText>{fieldState.error?.message}</Field.ErrorText>
              </Field>
            )}
          />

          <Controller
            name="reviewer"
            control={control}
            rules={{ required: 'Choose a reviewer.' }}
            render={({ field, fieldState }) => (
              <Field invalid={fieldState.invalid} required>
                <Field.Label>
                  Reviewer
                  <Field.RequiredIndicator />
                </Field.Label>
                <Combobox
                  collection={collection}
                  name={field.name}
                  value={field.value ? [field.value] : []}
                  onValueChange={(details) => field.onChange(details.value[0] ?? '')}
                  onInputValueChange={(details) => filter(details.inputValue)}
                >
                  <Combobox.Control>
                    <Combobox.Input
                      ref={field.ref}
                      onBlur={field.onBlur}
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
                <Field.ErrorText>{fieldState.error?.message}</Field.ErrorText>
              </Field>
            )}
          />

          <Field>
            <Field.Label>Summary</Field.Label>
            <Field.Textarea
              {...register('summary')}
              placeholder="What are you planning to build?"
              rows={3}
            />
          </Field>

          <Controller
            name="notifications"
            control={control}
            render={({ field }) => (
              <Checkbox
                name={field.name}
                checked={field.value}
                onCheckedChange={(details) => field.onChange(details.checked === true)}
                ref={field.ref}
                onBlur={field.onBlur}
              >
                <Checkbox.Control />
                <Checkbox.Label>Send status notifications</Checkbox.Label>
              </Checkbox>
            )}
          />
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

//#endregion