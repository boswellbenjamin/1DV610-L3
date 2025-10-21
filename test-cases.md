# Test Cases - Random Person Generator

## Manual Test Cases

| Test ID | Test Name                                       | Requirement   | Input/Actions                                                                        | Expected Output                                                                                                             | Test Status |
| ------- | ----------------------------------------------- | ------------- | ------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------- | ----------- |
| TC1     | Generate random person on page load             | FR1, FR7      | Navigate to application URL                                                          | A random person with complete data (name, age, profession, email, location) is displayed with a default blank profile image | Passed      |
| TC2     | Generate person with AI portrait                | FR2, FR4, FR7 | Click "Generate person with image" button                                            | Loading spinner appears, then a new random person is displayed with an AI-generated portrait                                | Passed      |
| TC3     | Generate person without image                   | FR3, FR7      | Click "Generate person without image" button                                         | A new random person is instantly displayed with all data fields populated and a blank placeholder profile image             | Passed      |
| TC4     | Loading state displayed during image generation | FR4           | Click "Generate person with image" button                                            | Loading spinner is visible while portrait is being generated, buttons are disabled                                          | Passed      |
| TC5     | Portrait generation failure handling            | FR5           | Trigger portrait generation when API fails                                           | Person data is displayed correctly with a blank placeholder image, no error messages shown to user                          | Not Tested  |
| TC6     | Buttons disabled during generation              | FR8           | Click "Generate person with image" then immediately try to click either button again | Both buttons are disabled while portrait is generating, clicks have no effect                                               | Passed      |
| TC7     | Valid location data generated                   | FR6           | Click "Generate person without image" 10 times, examine each location                | All generated cities exist in their respective countries, postal codes are realistic                                        | Passed      |
| TC8     | Email format validity                           | FR1           | Generate multiple persons and check email addresses                                  | All email addresses follow valid format                                                                                     | Passed      |
| TC9     | Data completeness                               | FR1           | Generate a person and inspect all data fields                                        | All required fields contain valid non-empty values                                                                          | Passed      |

## Test Instructions

1. Ensure the application is running locally or access the deployed public URL
2. Use a modern browser
3. Follow the "Input/Actions" column for each test case
4. Compare actual results with "Expected Output"
5. Document any bugs or unexpected behavior

## Test Coverage

- FR1: Covered by TC1, TC8, TC9
- FR2: Covered by TC2
- FR3: Covered by TC3
- FR4: Covered by TC4
- FR5: Covered by TC5
- FR6: Covered by TC7
- FR7: Covered by TC1, TC2, TC3
- FR8: Covered by TC6
