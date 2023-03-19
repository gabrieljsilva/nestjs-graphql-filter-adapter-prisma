"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaFilterAdapter = void 0;
const R = __importStar(require("ramda"));
class PrismaFilterAdapter {
    getQuery(filters) {
        let query = {};
        if (filters.equals) {
            query = R.mergeAll([query, this.createEqualsQuery(filters.equals)]);
        }
        if (filters.like) {
            query = R.mergeAll([query, this.createLikeQuery(filters.like)]);
        }
        if (filters.not) {
            query = R.mergeAll([query, this.createNotQuery(filters.not)]);
        }
        if (filters.and) {
            query = R.mergeAll([query, this.createAndQuery(filters.and)]);
        }
        if (filters.or) {
            query = R.mergeAll([query, this.createOrQuery(filters.or)]);
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