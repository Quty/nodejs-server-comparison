export interface DataPayload {
  data: any;
  contentType: string;
}

export interface DataProvider {
  getData: (...args: any[]) => DataPayload;
}
