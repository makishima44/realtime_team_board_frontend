import {
  BaseQueryFn,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";

export function getBaseUrl() {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  if (!baseUrl) {
    throw new Error("NEXT_PUBLIC_API_URL is not defined");
  }

  return baseUrl;
}

export const baseQuery: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  try {
    const rawBaseQuery = fetchBaseQuery({
      baseUrl: getBaseUrl(),
      prepareHeaders: (headers) => {
        headers.set("Content-Type", "application/json");

        return headers;
      },
      responseHandler: async (response) => {
        if (response.status === 204) {
          return null;
        }

        const text = await response.text();

        if (!text) {
          return null;
        }

        try {
          return JSON.parse(text);
        } catch {
          return text;
        }
      },
    });

    return await rawBaseQuery(args, api, extraOptions);
  } catch (error) {
    return {
      error: {
        status: "CUSTOM_ERROR",
        error:
          error instanceof Error ? error.message : "Unexpected request error",
      },
    };
  }
};
