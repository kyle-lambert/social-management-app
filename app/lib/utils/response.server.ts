import { json } from "@remix-run/node";

export const response = {
  OK: (message: string, init?: Omit<ResponseInit, "status">) => {
    return json(
      {
        name: "OK",
        message,
      } as const,
      { ...init, status: 200 },
    );
  },
  created: (message: string, init?: Omit<ResponseInit, "status">) => {
    return json(
      {
        name: "Created",
        message,
      } as const,
      { ...init, status: 201 },
    );
  },
  badRequest: (message: string, init?: Omit<ResponseInit, "status">) => {
    return json(
      {
        name: "Bad Request",
        message,
      },
      { ...init, status: 400 },
    );
  },
  unauthorized: (message: string, init?: Omit<ResponseInit, "status">) => {
    return json(
      {
        name: "Unauthorized",
        message,
      } as const,
      { ...init, status: 401 },
    );
  },
  notFound: (message: string, init?: Omit<ResponseInit, "status">) => {
    return json(
      {
        name: "Not Found",
        message,
      } as const,
      { ...init, status: 404 },
    );
  },
  unprocessableEntity: (
    message: string,
    init?: Omit<ResponseInit, "status">,
  ) => {
    return json(
      {
        name: "Unprocessable Entity",
        message,
      } as const,
      { ...init, status: 422 },
    );
  },
  serverError: (message: string, init?: Omit<ResponseInit, "status">) => {
    return json(
      {
        name: "Internal Server Error",
        message,
      } as const,
      { ...init, status: 500 },
    );
  },
};
