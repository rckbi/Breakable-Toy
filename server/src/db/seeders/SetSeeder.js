import { User, Set } from "../../models/index.js";

class SetSeeder {
  static async seed() {
    await Set.query().delete();

    const firstUser = await User.query().findOne({ userName: "rckbi" });
    const secondUser = await User.query().findOne({ userName: "michelle" });
    const thirdUser = await User.query().findOne({ userName: "justin" });
    const fourthUser = await User.query().findOne({ userName: "nyck" });

    const firstSet = await Set.query().insert({
      Amount: "5",
      Distance: "200",
      Stroke: "free",
      Interval: "160",
      Notes: "warm-up",
      userId: firstUser.id,
    });
    const secondSet = await Set.query().insert({
      Amount: "5",
      Distance: "200",
      Stroke: "free",
      Interval: "160",
      Notes: "warm-up",
      userId: secondUser.id,
    });
//     const thirdSet = await Set.query().insert({
//       name: "MIAA State Championship",
//       location: "120 Vassar St, Cambridge, MA 02139",
//       poolLength: "25",
//       units: "0",
//       duration: "90",
//       userId: thirdUser.id,
//     });
//     const fourthSet = await Set.query().insert({
//       name: "Training Trip",
//       location: "1FH4H+H79, Vega Baja, 00693, Puerto Rico",
//       poolLength: "50",
//       units: "1",
//       duration: "150",
//       userId: fourthUser.id,
//     });
//   }
// }
export default SetSeeder;
