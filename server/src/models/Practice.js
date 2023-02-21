const Model = require("./Model.js");

class Practice extends Model {
  static get tableName() {
    return "practices";
  }

  static get relationMappings() {
    const { User } = require("./index.js");
    return {
      users: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: "practices.userId",
          to: "users.id",
        },
      },
    };
  }
  static get jsonSchema() {
    return {
      type: "object",
      required: ["name", "location", "poolLength", "units", "duration"],
      properties: {
        name: { type: "string" },
        location: { type: "string" },
        poolLength: { type: ["integer", "string"] },
        units: { type: ["boolean", "string"] },
        duration: { type: ["integer", "string"] },
      },
    };
  }
}

module.exports = Practice;
