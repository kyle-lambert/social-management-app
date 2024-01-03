import { useActionData, useLoaderData, useLocation } from "@remix-run/react";
import { useEffect } from "react";

export const useDataLogger = () => {
  const url = useLocation();
  const loaderData = useLoaderData();
  const actionData = useActionData();

  useEffect(() => {
    console.log(url.pathname, { loader: loaderData, action: actionData });
  }, [loaderData, actionData]);
};
