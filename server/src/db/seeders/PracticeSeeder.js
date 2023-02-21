import { User, Practice } from "../../models/index.js";

class PracticeSeeder {
  static async seed() {
    await Practice.query().delete();

    const firstUser = await User.query().findOne({ userName: "ricky" });
    const secondUser = await User.query().findOne({ userName: "michelle" });
    const thirdUser = await User.query().findOne({ userName: "justin" });
    const fourthUser = await User.query().findOne({ userName: "nyck" });

    const firstPractice = await Practice.query().insert({
      name: "USA Futures Championship",
      location: "195 Marrett St, Hanscom AFB, MA 01731",
      poolLength: "50",
      units: "1",
      duration: "90",
      userId: firstUser.id,
    });
    const secondPractice = await Practice.query().insert({
      name: "Big East Championship",
      location: "1 Cunningham Square Providence, RI 02918",
      poolLength: "25",
      units: "1",
      duration: "120",
      userId: secondUser.id,
    });
    const thirdPractice = await Practice.query().insert({
      name: "MIAA State Championship",
      location: "120 Vassar St, Cambridge, MA 02139",
      poolLength: "25",
      units: "0",
      duration: "90",
      userId: thirdUser.id,
    });
    const fourthPractice = await Practice.query().insert({
      name: "Training Trip",
      location: "1FH4H+H79, Vega Baja, 00693, Puerto Rico",
      poolLength: "50",
      units: "1",
      duration: "150",
      userId: fourthUser.id,
    });
  }
}
export default PracticeSeeder;
