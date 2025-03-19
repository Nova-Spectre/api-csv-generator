# API to CSV Generator

This Express.js application integrates data from three different API endpoints, extracts specific values from their responses, combines them, and generates a CSV file.

## Features

- Express.js server with RESTful API endpoints
- Integration with multiple external APIs
- Asynchronous data fetching with Promise.all
- CSV generation using fast-csv
- Robust error handling
- Logging with Winston

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Nova-Spectre/api-csv-generator
   cd api-csv-generator
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the server:
   ```bash
   npm start
   # or
   npm run dev
   ```

## API Endpoints

### Generate CSV

- **URL:** `/api/generate-csv`
- **Method:** `GET`
- **Description:** Fetches data from three different APIs, combines it by ID, and generates a CSV file
- **Success Response:**
  - **Code:** 200
  - **Content:** 
    ```json
    {
      "success": true,
      "message": "CSV generated successfully",
      "filePath": "./data/api-data-2023-11.csv"
    }
    ```
- **Error Response:**
  - **Code:** 500
  - **Content:** 
    ```json
    {
      "success": false,
      "message": "Failed to generate CSV",
      "error": "Error message details"
    }
    ```

## CSV Format

The generated CSV file will have the following structure:

```
name,title,body
John Doe,Sample Title 1,This is the first comment body
Jane Smith,Sample Title 2,This is the second comment body
...
```

