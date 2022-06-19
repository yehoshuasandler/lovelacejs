"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GroupByNodule = exports.TransformNodule = exports.JoinNodule = exports.FilterNodule = exports.Nodule = exports.Table = void 0;
const Table_1 = require("./entities/Table");
exports.Table = Table_1.default;
const Nodule_1 = require("./entities/Nodule");
exports.Nodule = Nodule_1.default;
const FilterNodule_1 = require("./entities/nodules/FilterNodule");
exports.FilterNodule = FilterNodule_1.default;
const JoinNodule_js_1 = require("./entities/nodules/JoinNodule.js");
exports.JoinNodule = JoinNodule_js_1.default;
const TransformNodule_js_1 = require("./entities/nodules/TransformNodule.js");
exports.TransformNodule = TransformNodule_js_1.default;
const GroupByNodule_js_1 = require("./entities/nodules/GroupByNodule.js");
exports.GroupByNodule = GroupByNodule_js_1.default;
exports.default = {
    Table: Table_1.default,
    Nodule: Nodule_1.default,
    FilterNodule: FilterNodule_1.default,
    JoinNodule: JoinNodule_js_1.default,
    TransformNodule: TransformNodule_js_1.default,
    GroupByNodule: GroupByNodule_js_1.default
};
