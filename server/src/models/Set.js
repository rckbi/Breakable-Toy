const Model = require("./Model.js");

class Set extends Model {
  static get tableName() {
    return "sets";
  }

  static get relationMappings() {
    const { User } = require("./index.js");
    return {
      users: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: "sets.userId",
          to: "users.id",
        },
      },
    };
  }
  static get jsonSchema() {
    return {
      type: "object",
      required: ["amount", "distance", "stroke", "interval"],
      properties: {
        amount: { type: ["integer", "string"] },
        distance: { type: ["integer", "string"] },
        stroke: { type: "string" },
        interval: { type: ["integer", "string"] },
      },
    };
  }
}

module.exports = Set;
