"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paginationFn = void 0;
const paginationFn = (sortedArray, limit, page) => {
    const startIndex = (Number(page) - 1) * Number(limit);
    const endIndex = startIndex + Number(limit);
    return sortedArray.slice(startIndex, endIndex);
};
exports.paginationFn = paginationFn;
//# sourceMappingURL=pagination.js.map