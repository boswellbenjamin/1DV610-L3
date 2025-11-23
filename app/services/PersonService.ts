import { PersonGenerator } from "person-data-generator/person-generator.js";

interface PortraitResponse {
  imageUrl: string;
}

export interface PersonData {
  getName(): string;
  getSurname(): string;
  getAge(): number;
  getGender(): string;
  getProfession(): string;
  getCountry(): string;
  getCity(): string;
  getPostalCode(): string;
  getAddress(): string;
  getEmail(): string;
}

export class PersonService {
  private personGenerator: PersonGenerator;
  private defaultImageUrl: string;

  constructor(defaultImageUrl: string = "/blank-profilepic.svg") {
    this.personGenerator = new PersonGenerator();
    this.defaultImageUrl = defaultImageUrl;
  }

  generatePerson(): PersonData {
    return this.personGenerator.generate();
  }

  async generatePortrait(person: PersonData): Promise<string> {
    try {
      const response = await $fetch<PortraitResponse>("/api/generate-portrait", {
        method: "POST",
        body: this.buildPortraitRequest(person),
      });
      return response.imageUrl;
    } catch (error) {
      console.error("Failed to generate portrait:", error);
      return this.defaultImageUrl;
    }
  }

  private buildPortraitRequest(person: PersonData): Record<string, unknown> {
    return {
      firstName: person.getName(),
      lastName: person.getSurname(),
      age: person.getAge(),
      gender: person.getGender(),
      profession: person.getProfession(),
      country: person.getCountry(),
      city: person.getCity(),
      postalCode: person.getPostalCode(),
      address: person.getAddress(),
      email: person.getEmail(),
    };
  }

  getDefaultImageUrl(): string {
    return this.defaultImageUrl;
  }
}
