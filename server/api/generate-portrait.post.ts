import { PortraitGeneratorFactory } from "person-data-generator/person-ai.js";
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

    const portraitFactory = new PortraitGeneratorFactory();
    const portraitGenerator = portraitFactory.createFromEnv();
    const imageUrl = await portraitGenerator.generatePortrait(person);
    return { imageUrl };
  } catch (error) {
    console.error("Portrait generation error:", error);
    return { imageUrl: "/blank-profilepic.svg" };
  }
});
