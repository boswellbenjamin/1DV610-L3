# Random Person Generator

This is a web application that generates realistic random person data, with optional AI-generated portraits based on the generated data. The web application is built using the `Vue` framework `Nuxt`, and uses the `person-data-generator` module that I created in the `L2 - Assignment`, and later uploaded to `NPM`

## For End Users

### What is this?

The Random Person Generator creates realistic fake identity data for testing, design mockups, or placeholder content. Get random profiles with names, ages, professions, locations, emails, and optional AI portraits.

### How to use

1. Visit the application at: [Press me :)](https://random-person-generator-psi.vercel.app/)
2. On page load, a random person is automatically generated
3. Click "Generate person with image" to create a new person with an AI portrait (may take some time.)
4. Click "Generate person without image" for instant generation with a placeholder image.

### Generated Data

Each person includes:

- Full name (first and last name)
- Age
- Gender
- Profession
- Email address
- Complete address (country, city, postal code, street address)
- Optional AI-generated portrait

All location data is based on real-world locations with valid cities and postal codes.

## For Developers

### Installation

```bash
# Clone the repository
git clone https://github.com/boswellbenjamin/1DV610-L3.git
cd 1DV610-L3

# Install dependencies
pnpm install
```

### Configuration

Create a `.env` file in the root directory:

```
REPLICATE_API_TOKEN=your_api_key_here
```

The application uses Replicate for portrait generation. Get a key from https://replicate.com

### Development

```bash
# Start development server
pnpm run

# Build for production
pnpm build

# Preview production build
pnpm preview
```

The development server runs at http://localhost:3000 (if not other has been specified)

### Project Structure

```
l3/
├── app/
│   ├── components/
│   │   └── personComponent.vue    # Main person display component
│   ├── layouts/
│   │   └── default.vue           # Default layout
│   └── pages/
│       └── index.vue             # Home page
├── server/
│   └── api/
│       └── generate-portrait.post.ts  # API endpoint for portrait generation
├── public/
│   └── blank-profilepic.svg      # Placeholder image
├── requirements.md               # Requirements specification
├── test-cases.md                # Test cases
├── reflection.md                # Clean Code reflection
└── README.md                    # This file
```

### Dependencies

- **nuxt** (^4.1.2): Vue.js framework
- **person-data-generator** (^0.1.5): Module for generating random person data
- **vue** (^3.5.21): JavaScript framework
- **@nuxtjs/tailwindcss** (^6.14.0): CSS framework

### API Endpoints

#### POST /api/generate-portrait

Generates an AI portrait for a person.

**Request body:**

```json
{
  "firstName": "John",
  "lastName": "Doe",
  "age": 30,
  "gender": "male",
  "profession": "Engineer",
  "country": "USA",
  "city": "New York",
  "postalCode": "10001",
  "address": "123 Main St",
  "email": "john.doe@example.com"
}
```

**Response:**

```json
{
  "imageUrl": "https://..."
}
```

Returns placeholder image URL on failure.

## For Module Users (person-data-generator)

This application uses the `person-data-generator` module. To use it in your own projects:

```bash
npm install person-data-generator
```

```javascript
import { Person } from "person-data-generator";

// Generate a random person
const person = Person.random();

// Access person data
console.log(person.getName());
console.log(person.getEmail());
console.log(person.getCity());
```

See the module documentation at: https://www.npmjs.com/package/person-data-generator

## Testing

See [test-cases.md](test-cases.md) for detailed test cases and testing instructions.

To run manual tests:

1. Start the development server or access the deployed application
2. Follow the test cases in test-cases.md
3. Verify each expected output matches the actual behavior

## Requirements

See [requirements.md](requirements.md) for the complete requirements specification including functional and non-functional requirements.

## Code Quality

This project follows Clean Code principles as outlined in "Clean Code: A Handbook of Agile Software Craftsmanship" by Robert C. Martin. See [reflection.md](reflection.md) for detailed reflections on how each chapter has influenced the code.

Key principles applied:

- Meaningful names for variables, functions, and classes
- Small, focused functions that do one thing
- Proper error handling with try-catch blocks
- Clear formatting and organization
- Object-oriented design with proper encapsulation

## Deployment

The application is deployed on `Vercel` at https://random-person-generator-psi.vercel.app/

To deploy your own instance:

### Vercel (Recommended)

```bash
pnpm install -g vercel
vercel
```

Remember to set the `REPLICATE_API_TOKEN` environment variable in your deployment platform.

## License

MIT

## Author

Benjamin Boswell

## Acknowledgments

- Built with Nuxt.js
- Uses person-data-generator module from L2 Assignment
- AI portraits powered by Replicate
