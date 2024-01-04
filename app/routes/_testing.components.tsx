import { Button, Icon } from "~/components";

export default function () {
  return (
    <div className="space-y-8 p-12">
      <div className="flex items-end gap-8">
        <Button size="sm">Small</Button>
        <Button>Medium</Button>
        <Button size="lg">Large</Button>
        <Button isDisabled size="lg">
          Large
        </Button>
      </div>
      <div className="flex items-end gap-8">
        <Button size="sm" appearance="secondary">
          Small
        </Button>
        <Button appearance="secondary">Medium</Button>
        <Button appearance="secondary" size="lg">
          Large
        </Button>
        <Button isDisabled appearance="secondary" size="lg">
          Large
        </Button>
      </div>
      <div className="flex items-end gap-8">
        <Button size="sm" appearance="tertiary">
          Small
        </Button>
        <Button appearance="tertiary">Medium</Button>
        <Button appearance="tertiary" size="lg">
          Large
        </Button>
        <Button isDisabled appearance="tertiary" size="lg">
          Large
        </Button>
      </div>
      <div className="flex items-end gap-8">
        <Button size="sm" appearance="outline">
          Small
        </Button>
        <Button appearance="outline">Medium</Button>
        <Button appearance="outline" size="lg">
          Large
        </Button>
        <Button isDisabled appearance="outline" size="lg">
          Large
        </Button>
      </div>
      <div className="flex items-end gap-8">
        <Icon name="chevronDoubleBackwards" className="text-2xl" />
      </div>
    </div>
  );
}
