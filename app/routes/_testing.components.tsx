import { Avatar, Input } from "~/components";

export default function () {
  return (
    <div className="flex flex-col items-start gap-8 p-12">
      <div className="grid grid-cols-3 gap-8">
        <Input size="sm" />
        <Input size="md" />
        <Input size="lg" />
        <Input size="md" appearance="success" />
        <Input size="md" appearance="error" />
        <Input size="md" disabled />
      </div>
      <div className="grid grid-cols-3 gap-8">
        <Avatar size="sm">KL</Avatar>
        <Avatar size="md">KL</Avatar>
        <Avatar size="lg">KL</Avatar>
      </div>
    </div>
  );
}
