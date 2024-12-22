import {ConsoleLogger} from "@/core/logging/console-logger";
import {Logger} from "@/core/logging/logger";

export class ConsoleLoggerFactory {
  static create(): Logger {
    return new ConsoleLogger();
  }
}
