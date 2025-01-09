# Custom Browser Dashboard

## Overview
The **Custom Browser Dashboard** is a personalized web development project designed to enhance productivity and user experience. It functions as a browser homepage, similar to the Chrome dashboard, but with additional customization and functionality.

---

## Features

### 1. **Search Bar with Suggestions**
- **Search Engine Options**: Users can choose from Google, Bing, Yahoo, and DuckDuckGo as their preferred search engine.
- **Autocomplete Suggestions**: The search bar provides real-time suggestions based on user input.

### 2. **Quick Access Cards**
- **Editable and Deletable**: Users can edit or delete these cards as per their needs.
- **Maximum Limit**: Up to 10 quick access cards can be stored at a time.
- **Functionality**: Clicking on a card directly opens the associated website.

### 3. **Clock**
- Displays the exact current time in the format:  
  `Thu Jan 09 2025 13:37:57 GMT+0530 (India Standard Time)`

### 4. **Calendar**
- Shows the current date in a user-friendly format.

### 5. **Weather App Widget**
- **Weather Details**:
  - Location
  - Current temperature
  - High and low temperatures of the day
  - "Feels like" temperature
  - Weather description (e.g., "clear sky", "few clouds")
  - Atmospheric pressure
  - Precipitation
  - Visibility
  - Cloud percentage
  - Sunrise and sunset times
  - Wind speed and direction
- **Compass for Wind Direction**:
  - Displays wind direction using a static NESW compass (not functional as a real compass).

---

## Technical Specifications
- **Frontend**: HTML, CSS, JavaScript
- **API Integrations**: 
  - Weather data fetched from an external weather API.
- **Storage**: Utilizes local storage for saving quick access cards and user's location.

---

## How to Use

### Initial Setup
1. Clone or download the repository.
2. Open the project in a browser.

#### OR
1. Open https://byt-bender.github.io/browser-dashboard/

### Features Interaction
1. **Search Engine**:
   - Select a search engine using the dropdown menu next to the search bar.
   - Type your query and hit enter.
2. **Quick Access Cards**:
   - Add a card by clicking the "Add Card" button and providing the required details.
   - Edit a card by clicking the "Edit" option.
   - Delete a card by clicking the "Delete" option.
3. **Clock and Calendar**:
   - The clock and calendar are displayed automatically.
4. **Weather Widget**:
   - Allow your browser to access your location to fetch the latest weather details.

---

## Limitations
- Quick access cards are limited to 10.
- The NESW compass is static and not a live compass.
