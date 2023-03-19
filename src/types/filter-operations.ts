import { LogicalOperations } from './logical-operations';
import { EqualityOperations } from './equality-operations';

export type FilterOperations<T> = LogicalOperations<T> & EqualityOperations<T>;
