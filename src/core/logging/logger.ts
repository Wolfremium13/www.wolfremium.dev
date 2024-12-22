export interface Logger {
  error(message: string): void;

  info(message: string): void;

  warn(message: string): void;
}

