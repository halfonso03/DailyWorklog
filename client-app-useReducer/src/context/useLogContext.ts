import { useContext } from "react";
import { LogContext } from "./LogContext";


export function useLogContext() {

  const logContext = useContext(LogContext);


  if (!logContext) {
    throw new Error(
      "useLogContext has to be used within <LogContext.Provider>"
    );
  }

  return logContext;
}
