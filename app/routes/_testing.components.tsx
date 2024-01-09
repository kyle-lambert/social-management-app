import { Button } from "~/components";

export default function () {
  return (
    <div className="flex flex-col items-start gap-8 p-12">
      <div className="inline-flex items-end justify-start gap-8">
        <Button iconEndName="Check" size="sm">
          Small
        </Button>
        <Button size="md">Medium</Button>
        <Button size="lg">Large</Button>
      </div>
      <div className="inline-flex items-end justify-start gap-8">
        <Button appearance="secondary" size="sm">
          Small
        </Button>
        <Button appearance="secondary" size="md">
          Medium
        </Button>
        <Button isLoading appearance="secondary" size="lg">
          Large
        </Button>
      </div>
      <div className="inline-flex items-end justify-start gap-8">
        <Button appearance="outline" size="sm">
          Small
        </Button>
        <Button appearance="outline" size="md">
          Medium
        </Button>
        <Button isLoading appearance="outline" size="lg">
          Large
        </Button>
      </div>
      <div className="inline-flex items-end justify-start gap-8">
        <Button appearance="ghost" size="sm">
          Small
        </Button>
        <Button appearance="ghost" size="md">
          Medium
        </Button>
        <Button isDisabled appearance="ghost" size="lg">
          Large
        </Button>
      </div>
    </div>
  );
}
