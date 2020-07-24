import axios, { Method } from 'axios';
import APIError from './types/error';
import Quote from './types/quote';
import QuoteQuery from './types/quote-query';
import SubscribeQuery from './types/subscribe';
import Booking from './types/booking';
import ProductStatus from './types/product-status';
import Claim from './types/claim';

export enum ServerURL {
  development = 'https://development-partner-api.hikoala.co',
  staging = 'https://staging-partner-api.hikoala.co',
  production = 'https://partner-api.hikoala.co',
  default = 'https://development-partner-api.hikoala.co',
}

export enum Version {
  v0 = 'v0',
  v1 = 'v1',
  default = 'v1',
}

class Options {
  target: ServerURL = ServerURL.default;

  token: string;

  version: Version = Version.default;
}

export class Koala {
  version = Version.default;
  target: string = ServerURL.default;
  token: string;

  constructor(options?: Partial<Options>) {
    const _options: Partial<Options> = options ?? {};
    this.token = process.env.KOALA_PARTNER_TOKEN || _options.token;
    this.target =
      _options.target ?? (process.env.KOALA_PARTNER_API || ServerURL.default);
    this.version = _options.version ?? Version.default;
  }

  private async sendRequest(
    method: Method,
    path: string,
    input?: any,
  ): Promise<any> {
    const api = axios.create({
      baseURL: this.baseURL,
      timeout: 15000,
    });

    api.interceptors.request.use((config) => {
      config.headers.Authorization = `Bearer ${this.token}`;
      config.headers.Accept = 'application/json';
      if (input) config.headers['Content-Type'] = 'application/json';
      return config;
    }, Promise.reject);

    api.interceptors.response.use(
      (response) => response,
      (error) => {
        return Promise.reject(APIError.fromJSON(error.response.data));
      },
    );
    const response = await api.request({
      method,
      url: `${this.baseURL}/${path}`,
      data: input,
    });
    if (response.status > 299) {
      throw APIError.fromJSON(response.data);
    } else {
      return response.data;
    }
  }

  get baseURL(): string {
    return `${this.target}/partner/${this.version}`;
  }

  async quotes(query: QuoteQuery): Promise<Quote[]> {
    const res = await this.sendRequest('GET', '/quotes', query);
    return Object.values(res).map(Quote.fromJSON);
  }

  async subscribe(query: SubscribeQuery): Promise<Booking> {
    const res = await this.sendRequest('POST', '/subscribe', query);
    return Booking.fromJSON(res);
  }

  async checkProduct(
    bookingNumber: string,
    productId: number,
  ): Promise<ProductStatus> {
    const res = await this.sendRequest(
      'GET',
      `/booking/${bookingNumber}/claim/${productId}`,
    );
    return ProductStatus.fromJSON(res);
  }

  async claimProduct(bookingNumber: string, productId: number): Promise<Claim> {
    const res = await this.sendRequest(
      'POST',
      `/booking/${bookingNumber}/claim/${productId}`,
    );
    return Claim.fromJSON(res);
  }
}
