import { FilterOperations } from './filter-operations';

export abstract class GraphqlFilterAdapter {
  abstract getQuery<T = any>(filter: FilterOperations<T>): unknown;
}
