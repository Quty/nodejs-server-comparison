export interface DataProvider {
  getData: (...args: any[]) => any;
}
