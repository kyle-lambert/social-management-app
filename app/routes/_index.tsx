import { LoaderFunctionArgs } from "@remix-run/node";
import { bcrypt } from "~/lib/services/packages.server";

export async function loader({ request }: LoaderFunctionArgs) {
  const hash = await bcrypt.hash("password", 10);
  console.log({ hash });
  return null;
}

export default function () {
  return <div>_index</div>;
}
