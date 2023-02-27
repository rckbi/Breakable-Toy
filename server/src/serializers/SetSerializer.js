class SetSerializer {
  static async getSummary(set) {
    const allowedAttributes = ["id", "content", "userId"];

    let serializedSets = {};
    for (const attribute of allowedAttributes) {
      serializedSets[attribute] = set[attribute];
    }
    return serializedSets;
  }
}

export default SetSerializer;
