import { GraphqlFilterAdapter } from '@gabrieljsilva/nestjs-graphql-filter';

import { EqualityOperations, FilterOperations } from './types';
import { mergeObjects } from './utils';

export class PrismaFilterAdapter implements GraphqlFilterAdapter {
  getQuery<Output = any, T = any>(filters: FilterOperations<T>): Output {
    let query = {};

    if (filters.equals) {
      query = mergeObjects(query, this.createEqualsQuery(filters.equals));
    }

    if (filters.like) {
      query = mergeObjects(query, this.createLikeQuery(filters.like));
    }

    if (filters.not) {
      query = mergeObjects(query, this.createNotQuery(filters.not));
    }

    if (filters.and) {
      query = mergeObjects(query, this.createAndQuery(filters.and));
    }

    if (filters.or) {
      query = mergeObjects(query, this.createOrQuery(filters.or));
    }

    return query as Output;
  }

  private createEqualsQuery<T = any>(filter: FilterOperations<T>) {
    return filter;
  }

  private createAndQuery<T = any>(filter: FilterOperations<T>, query = {}) {
    query['AND'] = this.getQuery(filter);
    if (filter.and) {
      this.createAndQuery(filter.and, query['AND']);
    }

    return query;
  }

  private createOrQuery<T = any>(filter: FilterOperations<T>, query = {}) {
    query['OR'] = this.getQuery(filter);
    if (filter.or) {
      this.createOrQuery(filter.or, query['OR']);
    }

    return query;
  }

  private createNotQuery<T = any>(notOperation?: EqualityOperations<T>) {
    return {
      NOT: notOperation,
    };
  }

  private createLikeQuery<T = any>(
    likeRawQuery: Partial<T> | Array<Partial<T>>,
    query = {},
    fieldName?: string,
  ) {
    for (const key in likeRawQuery) {
      const isObjectOrArray = typeof likeRawQuery[key] === 'object';
      if (isObjectOrArray) {
        this.createLikeQuery(likeRawQuery[key], query, key);
      } else {
        const fieldValue = {
          contains: likeRawQuery[key],
          mode: 'insensitive',
        };
        if (fieldName) {
          const fieldNameHasDefined = query[fieldName];
          if (!fieldNameHasDefined) {
            query[fieldName] = {};
          }
          query[fieldName][key] = fieldValue;
          continue;
        }
        query[key] = fieldValue;
      }
    }

    return query;
  }
}
