import { FilterOperations } from './types';
import { GraphqlFilterAdapter } from '@gabrieljsilva/nestjs-graphql-filter';
export declare class PrismaFilterAdapter implements GraphqlFilterAdapter {
    getQuery<Output = any, T = any>(filters: FilterOperations<T>): Output;
    private createEqualsQuery;
    private createAndQuery;
    private createOrQuery;
    private createNotQuery;
    private createLikeQuery;
}
//# sourceMappingURL=index.d.ts.map