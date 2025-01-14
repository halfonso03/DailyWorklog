import { useContext } from "react";
import { LogContext, LogContextType } from "./LogContext";


export function useLogContext() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return useContext<LogContextType>(LogContext as any);
}
