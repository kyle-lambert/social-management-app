import { ActionFunctionArgs, redirect } from "@remix-run/node";

export async function action(params: ActionFunctionArgs) {
  return redirect("/login");
}
