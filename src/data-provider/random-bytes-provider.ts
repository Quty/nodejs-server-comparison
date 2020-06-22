import * as crypto from 'crypto';
import * as assert from 'assert';

import { DataProvider } from './data-provider';

interface ResponseDataProviderConstructorParams {
  dataLength?: number;
}

const DEFAULT_DATA_LENGTH = 1024;

export class RandomBytesProvider implements DataProvider {
  dataLength: number;

  constructor(params?: ResponseDataProviderConstructorParams) {
    assert.ok(
      !params?.dataLength || params?.dataLength > 0,
      new TypeError('dataLength must be a positive number'),
    );

    this.dataLength = params?.dataLength ?? DEFAULT_DATA_LENGTH;
  }

  getData() {
    return {
      contentType: 'application/octet-stream',
      data: crypto.randomBytes(this.dataLength),
    };
  }
}
