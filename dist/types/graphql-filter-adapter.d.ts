import { FilterOperations } from './filter-operations';
export declare abstract class GraphqlFilterAdapter {
    abstract getQuery<T = any>(filter: FilterOperations<T>): unknown;
}
//# sourceMappingURL=graphql-filter-adapter.d.ts.map