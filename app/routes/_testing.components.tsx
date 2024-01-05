import { Button, ButtonLink } from "~/components";

export default function () {
  return (
    <div className="space-y-8 p-12">
      <div className="flex items-end gap-8">
        <Button iconEndName="chevronDoubleBackwards" size="sm">
          Small
        </Button>
        <Button iconEndName="chevronDoubleBackwards" size="md">
          Medium
        </Button>
        <Button iconEndName="chevronDoubleBackwards" size="lg">
          Large
        </Button>
      </div>
      <div className="flex items-end gap-8">
        <ButtonLink
          appearance="secondary"
          iconEndName="chevronDoubleBackwards"
          size="sm"
        >
          Small
        </ButtonLink>
        <ButtonLink
          appearance="secondary"
          iconEndName="chevronDoubleBackwards"
          size="md"
        >
          Medium
        </ButtonLink>
        <ButtonLink
          appearance="secondary"
          iconEndName="chevronDoubleBackwards"
          size="lg"
        >
          Large
        </ButtonLink>
      </div>
      <div className="flex items-end gap-8">
        <Button
          appearance="secondary"
          iconEndName="chevronDoubleBackwards"
          size="sm"
        >
          Small
        </Button>
        <Button
          appearance="secondary"
          iconEndName="chevronDoubleBackwards"
          size="md"
        >
          Medium
        </Button>
        <Button
          appearance="secondary"
          iconEndName="chevronDoubleBackwards"
          size="lg"
        >
          Large
        </Button>
      </div>
      <div className="flex items-end gap-8">
        <ButtonLink
          appearance="ghost"
          iconEndName="chevronDoubleBackwards"
          size="sm"
        >
          Small
        </ButtonLink>
        <ButtonLink
          appearance="ghost"
          iconEndName="chevronDoubleBackwards"
          size="md"
        >
          Medium
        </ButtonLink>
        <ButtonLink
          appearance="ghost"
          iconEndName="chevronDoubleBackwards"
          size="lg"
        >
          Large
        </ButtonLink>
      </div>
    </div>
  );
}
