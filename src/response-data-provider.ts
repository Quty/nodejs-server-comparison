import * as crypto from 'crypto';
import * as assert from 'assert';

import { DataProvider } from './server';

interface ResponseDataProviderConstructorParams {
  dataLength?: number;
}

const DEFAULT_DATA_LENGTH = 1024;

export class ResponseDataProvider implements DataProvider {
  dataLength: number;

  constructor(params?: ResponseDataProviderConstructorParams) {
    assert.ok(
      !params || (params?.dataLength && params?.dataLength > 0),
      new TypeError('dataLength must to be a positive number'),
    );

    this.dataLength = params?.dataLength ?? DEFAULT_DATA_LENGTH;
  }

  getData() {
    return crypto.randomBytes(this.dataLength);
  }
}
