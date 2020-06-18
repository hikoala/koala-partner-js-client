interface InnerErrorInterface {
  status: number;
  message: string;
  source: string;
}
interface ErrorInterface {
  error: InnerErrorInterface;
}

export default class APIError extends Error implements InnerErrorInterface {
  status: number;
  message: string;
  source: string;

  constructor(data: InnerErrorInterface) {
    super(data.message);
    this.status = data.status;
    this.message = data.message;
    this.source = data.source;
  }

  static fromJSON(data: ErrorInterface): APIError | Error {
    try {
      return new APIError(data.error);
    } catch {
      return new Error(`Unknown error: ${JSON.stringify(data)}`);
    }
  }
}
