import { LoaderFunctionArgs, redirect } from "@remix-run/node";

export async function loader({ request }: LoaderFunctionArgs) {
  return redirect("/login");
}

export default function () {
  return <div>_index</div>;
}
