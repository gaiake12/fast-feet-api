export interface AppErrorProps {
  message: string;
  statusCode: number;
}

export class AppError extends Error {
  public readonly statusCode: number;
  public readonly message: string;

  constructor({ message, statusCode }: AppErrorProps) {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
  }
}
