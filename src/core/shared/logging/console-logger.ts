import {Logger} from "@/core/shared/logging/logger";

export class ConsoleLogger implements Logger {
  error(message: string): void {
    console.error(message);
  }

  info(message: string): void {
    console.info(message);
  }

  warn(message: string): void {
    console.warn(message);
  }
}
