export interface LogicalOperations<T> {
  or?: LogicalOperations<T>;
  and?: LogicalOperations<T>;
}
