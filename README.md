# NextJS Formik Yup Vitest Text Case Converter

![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Vitest](https://img.shields.io/badge/Vitest-6E9F18?style=for-the-badge&logo=vitest&logoColor=white)
![Formik](https://img.shields.io/badge/Formik-172B4D?style=for-the-badge&logo=formik&logoColor=white)

A modern, user-friendly text case conversion tool built with Next.js and React. This application allows you to easily transform text between different case formats with additional formatting options.

## Features

- **Multiple Case Type Conversions:**
  - Lower Case
  - Upper Case
  - Camel Case
  - Pascal Case
  - Snake Case
  - Kebab Case
  - Title Case
  - Sentence Case
  - Train Case
  - Dot Case
  - Screaming Snake Case
  - Studly Caps

- **Additional Formatting Options:**
  - Alphanumeric filtering
  - Custom character replacement
  - Copy to clipboard functionality

- **User-Friendly Interface:**
  - Real-time validation
  - Toast notifications for errors
  - Result display in a popup modal

## Technologies Used

- Next.js
- React
- TypeScript
- Formik
- Yup
- Tailwind CSS
- Vitest

![Screenshot 1](./screenshots/Screenshot_1.png)
![Screenshot 2](./screenshots/Screenshot_2.png)
![Screenshot 3](./screenshots/Screenshot_3.png)

## Getting Started

1. Install dependencies:

```
  yarn
```

2. Run the development server:

```
  yarn dev
```
## Usage

- Enter your text in the input field

- Select your desired case type from the dropdown menu

- (Optional) Enable additional formatting options:

  - Check "Alphanumeric" to filter out non-alphanumeric characters
  - Check "Replace" to specify a custom replacement character

- Click "Format" to see the result

- Copy the converted text from the popup modal

## Testing

The project uses Vitest as its testing framework. Run the tests using:
```
  yarn test
  
  yarn test:ui
```
