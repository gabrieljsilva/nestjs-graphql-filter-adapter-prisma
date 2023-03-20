"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaFilterAdapter = void 0;
const utils_1 = require("./utils");
class PrismaFilterAdapter {
    getQuery(filters) {
        let query = {};
        if (filters.equals) {
            query = (0, utils_1.mergeObjects)(query, this.createEqualsQuery(filters.equals));
        }
        if (filters.like) {
            query = (0, utils_1.mergeObjects)(query, this.createLikeQuery(filters.like));
        }
        if (filters.not) {
            query = (0, utils_1.mergeObjects)(query, this.createNotQuery(filters.not));
        }
        if (filters.and) {
            query = (0, utils_1.mergeObjects)(query, this.createAndQuery(filters.and));
        }
        if (filters.or) {
            query = (0, utils_1.mergeObjects)(query, this.createOrQuery(filters.or));
        }
        return query;
    }
    createEqualsQuery(filter) {
        return filter;
    }
    createAndQuery(filter, query = {}) {
        query['AND'] = this.getQuery(filter);
        if (filter.and) {
            this.createAndQuery(filter.and, query['AND']);
        }
        return query;
    }
    createOrQuery(filter, query = {}) {
        query['OR'] = this.getQuery(filter);
        if (filter.or) {
            this.createOrQuery(filter.or, query['OR']);
        }
        return query;
    }
    createNotQuery(notOperation) {
        return {
            NOT: notOperation,
        };
    }
    createLikeQuery(likeRawQuery, query = {}, fieldName) {
        for (const key in likeRawQuery) {
            const isObjectOrArray = typeof likeRawQuery[key] === 'object';
            if (isObjectOrArray) {
                this.createLikeQuery(likeRawQuery[key], query, key);
            }
            else {
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
exports.PrismaFilterAdapter = PrismaFilterAdapter;
//# sourceMappingURL=index.js.map