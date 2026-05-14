"use client";

import { FetchBaseQueryError } from "@reduxjs/toolkit/query/react";

export type MutationResult<TArg, TResult = unknown> = {
  mutate: (arg: TArg) => void;
  mutateAsync: (arg: TArg) => Promise<TResult>;
  isPending: boolean;
  isError: boolean;
  error?: Error;
};

export function toError(error: unknown) {
  if (!error) {
    return undefined;
  }

  if (error instanceof Error) {
    return error;
  }

  const queryError = error as FetchBaseQueryError;

  if ("error" in queryError && typeof queryError.error === "string") {
    return new Error(queryError.error);
  }

  if ("data" in queryError) {
    if (typeof queryError.data === "string") {
      return new Error(queryError.data);
    }

    if (
      queryError.data &&
      typeof queryError.data === "object" &&
      "message" in queryError.data &&
      typeof queryError.data.message === "string"
    ) {
      return new Error(queryError.data.message);
    }
  }

  return new Error("Request failed");
}

export function useWrappedMutation<TArg, TResult>(
  mutation: readonly [
    (arg: TArg) => {
      unwrap: () => Promise<TResult>;
    },
    {
      isLoading: boolean;
      isError: boolean;
      error?: unknown;
    },
  ],
): MutationResult<TArg, TResult> {
  const [trigger, state] = mutation;

  return {
    mutate: (arg) => {
      void trigger(arg);
    },
    mutateAsync: (arg) => trigger(arg).unwrap(),
    isPending: state.isLoading,
    isError: state.isError,
    error: toError(state.error),
  };
}
