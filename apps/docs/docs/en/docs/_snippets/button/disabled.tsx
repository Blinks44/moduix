import { Button } from '@moduix/react';

const labels = {
  button: 'Disabled',
  link: 'Disabled Link',
};

export default function ButtonDisabledDemo() {
  return (
    <div className="button-demo-row">
      <Button disabled>{labels.button}</Button>
      <Button asChild aria-disabled="true" variant="outline">
        <a href="#button" onClick={(event) => event.preventDefault()}>
          {labels.link}
        </a>
      </Button>
    </div>
  );
}