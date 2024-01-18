import { Avatar, Button, Input, WorkspaceDropdown } from "~/components";

export default function () {
  return (
    <div className="flex flex-col gap-8 p-6">
      <div className="flex items-start gap-8">
        <Input size="sm" />
        <Input size="md" />
        <Input size="lg" placeholder="This is the placeholder" />
      </div>
      <div className="flex items-start gap-8">
        <Input size="md" appearance="success" />
        <Input size="md" appearance="error" />
        <Input size="md" disabled />
      </div>
      <div className="flex items-start  gap-8">
        <Avatar size="sm">KL</Avatar>
        <Avatar size="md">KL</Avatar>
        <Avatar size="lg">KL</Avatar>
      </div>
      <div className="flex items-start  gap-8">
        <WorkspaceDropdown
          workspaces={[
            { id: "w1", name: "Workspace 1" },
            { id: "w2", name: "Workspace 2" },
            { id: "w3", name: "Workspace 3" },
          ]}
        />
        <WorkspaceDropdown
          workspaces={[
            { id: "w1", name: "Workspace 1" },
            { id: "w2", name: "Workspace 2" },
            { id: "w3", name: "Workspace 3" },
          ]}
        />
        <WorkspaceDropdown
          workspaces={[
            { id: "w1", name: "Workspace 1" },
            { id: "w2", name: "Workspace 2" },
            { id: "w3", name: "Workspace 3" },
          ]}
        />
      </div>
      <div className="flex items-start gap-8">
        <Button iconEndName="Settings" size="sm" appearance="primary">
          Button primary
        </Button>
        <Button iconStartName="Check" size="md" appearance="primary">
          Button primary
        </Button>
        <Button size="lg" appearance="primary">
          Button primary
        </Button>
        <Button size="lg" appearance="primary" isDisabled>
          Button primary
        </Button>
      </div>
      <div className="flex items-start  gap-8">
        <Button size="sm" appearance="secondary">
          Button secondary
        </Button>
        <Button size="md" appearance="secondary">
          Button secondary
        </Button>
        <Button
          iconEndName="ChevronDoubleDown"
          size="lg"
          appearance="secondary"
        >
          Button secondary
        </Button>
        <Button size="lg" appearance="secondary" isDisabled>
          Button secondary
        </Button>
      </div>
      <div className="flex items-start  gap-8">
        <Button size="sm" iconStartName="SettingsAlt" appearance="tertiary">
          Button tertiary
        </Button>
        <Button isLoading size="md" appearance="tertiary">
          Button tertiary
        </Button>
        <Button size="lg" appearance="tertiary" iconStartName="SettingsAlt">
          Button tertiary
        </Button>
        <Button size="lg" appearance="tertiary" isDisabled>
          Button tertiary
        </Button>
      </div>
      <div className="flex items-start  gap-8">
        <Button size="sm" iconStartName="SettingsAlt" appearance="outline">
          Button outline
        </Button>
        <Button isLoading size="md" appearance="outline">
          Button outline
        </Button>
        <Button size="lg" appearance="outline" iconStartName="SettingsAlt">
          Button outline
        </Button>
        <Button size="lg" appearance="outline" isDisabled>
          Button outline
        </Button>
      </div>
      <div className="flex items-start  gap-8">
        <Button iconStartName="Search" size="lg" appearance="error">
          Button error
        </Button>
        <Button iconStartName="Search" size="lg" appearance="success">
          Button success
        </Button>
      </div>
    </div>
  );
}
