import { LoaderFunctionArgs } from "@remix-run/node";

export async function loader({ request }: LoaderFunctionArgs) {
  return null;
}

export default function () {
  return <div>app</div>;
}
