import { Link } from "@remix-run/react";

export default function () {
  return (
    <div className="flex gap-8 p-12">
      <Link
        to="/components"
        className="cursor-pointer rounded bg-blue-200 px-3 py-2 transition-colors hover:bg-blue-300"
      >
        Go to testing components
      </Link>
    </div>
  );
}
