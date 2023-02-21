/* eslint-disable no-console */
import { connection } from "../boot.js";
import UserSeeder from "./seeders/UserSeeder.js";
import PracticeSeeder from "./seeders/PracticeSeeder.js";
class Seeder {
  static async seed() {
    console.log("Seeding users...");
    await UserSeeder.seed();

    console.log("Seeding practices...");
    await PracticeSeeder.seed();

    console.log("Done!");
    await connection.destroy();
  }
}

export default Seeder;
