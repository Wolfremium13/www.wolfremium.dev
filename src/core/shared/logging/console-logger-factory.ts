import {ConsoleLogger} from "@/core/shared/logging/console-logger";
import {Logger} from "@/core/shared/logging/logger";

export class ConsoleLoggerFactory {
  static create(): Logger {
    return new ConsoleLogger();
  }
}
