"use client";

import * as React from "react";

const subscribe = () => () => {};

export function useIsClient() {
  return React.useSyncExternalStore(
    subscribe,
    () => true,
    () => false
  );
}
