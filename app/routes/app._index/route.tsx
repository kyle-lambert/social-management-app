import { LoaderFunctionArgs } from "@remix-run/node";
import { useDataLogger } from "~/hooks";

export async function loader({ request }: LoaderFunctionArgs) {
  return null;
}

export default function () {
  useDataLogger();
  return <div>app._index</div>;
}
