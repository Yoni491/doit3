"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
const Item_1 = require("./models/Item");
exports.resolvers = {
    Query: {
        hello: () => "hi",
        items: () => Item_1.Item.find(),
    },
    Mutation: {
        createItem: (_, { name }) => __awaiter(void 0, void 0, void 0, function* () {
            const item = new Item_1.Item({ name });
            yield item.save();
            return item;
        }),
    },
};
//# sourceMappingURL=resolvers.js.map