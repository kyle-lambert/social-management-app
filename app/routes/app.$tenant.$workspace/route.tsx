import { type LoaderFunctionArgs } from "@remix-run/node";

export async function loader({ request, params }: LoaderFunctionArgs) {
  console.log("WORKSPACE:", params?.workspace);
  return {};
}

export default function () {
  return <div>app.$tenant.$workspace</div>;
}
