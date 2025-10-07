import { PersonAI } from "person-data-generator/person-ai.js";
import { Person } from "person-data-generator";

interface PersonData {
  firstName: string;
  lastName: string;
  age: number;
  gender: string;
  profession: string;
  country: string;
  city: string;
  postalCode: string;
  address: string;
  email: string;
}

export default defineEventHandler(async (event) => {
  const personData = await readBody<PersonData>(event);
  try {
    // Reconstruct the Person instance from the data
    const person = new Person(
      personData.firstName,
      personData.lastName,
      personData.age,
      personData.gender,
      personData.profession,
      personData.country,
      personData.city,
      personData.postalCode,
      personData.address,
      personData.email
    );


    const imageUrl = await PersonAI.generatePortraitFromEnv(person);
    return { imageUrl };
  } catch (error) {
    console.error("Portrait generation error:", error);
    // Return fallback image if generation fails
    return { imageUrl: "/blank-profilepic.svg" };
  }
});
