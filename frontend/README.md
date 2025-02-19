Two main parts:

- **Frontend:** A basic setup that mimics React-like components for an easier development experience.
- **Backend:** A single file that handles text translation using an API when a user selects one of the four supported languages.

## Frontend

The frontend is organized into the following folders:

- **`pages/`**  
  Contains the different pages of the application.

- **`components/`**  
  Houses reusable components. For example, the top bar can be imported and used on any page.

- **`public/`**  
  Includes static assets such as images and other resources.

## Backend

- **`translator.js`**  
  A single backend file responsible for:
  - Interacting with an external API to translate site text.
  - Automatically translating content when a user selects one of four languages - hebrew, english, arabic, russian.
