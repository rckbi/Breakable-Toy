import { User, Set, Practice } from "../../models/index.js";

class SetSeeder {
  static async seed() {
    await Set.query().delete();

    const firstPractice = await Practice.query().findOne({ name: "USA Futures Championship" });
    const secondPractice = await Practice.query().findOne({ name: "Big East Championship" });
    const thirdPractice = await Practice.query().findOne({ name: "MIAA State Championship" });
    const fourthPractice = await Practice.query().findOne({ name: "Training Trip" });

    const firstUser = await User.query().findOne({ userName: "rckbi" });
    const secondUser = await User.query().findOne({ userName: "michelle" });
    const thirdUser = await User.query().findOne({ userName: "justin" });
    const fourthUser = await User.query().findOne({ userName: "nyck" });

    const firstSet = await Set.query().insert({
      amount: "5",
      distance: "200",
      stroke: "free",
      interval: "160",
      notes: "warm-up",
      userId: firstUser.id,
      practiceId: firstPractice.id,
    });
    const secondSet = await Set.query().insert({
      amount: "10",
      distance: "50",
      stroke: "free",
      interval: "45",
      notes: "drill",
      userId: secondUser.id,
      practiceId: secondPractice.id,
    });
    const thirdSet = await Set.query().insert({
      amount: "8",
      distance: "100",
      stroke: "free",
      interval: "70",
      notes: "500 pace",
      userId: thirdUser.id,
      practiceId: thirdPractice.id,
    });
    const fourthSet = await Set.query().insert({
      amount: "2",
      distance: "300",
      stroke: "free",
      interval: "350",
      notes: "cool-down",
      userId: fourthUser.id,
      practiceId: fourthPractice.id,
    });
  }
}
export default SetSeeder;
