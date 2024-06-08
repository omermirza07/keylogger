
# Keylogger Dashboard

## Overview

Welcome to the Keylogger Dashboard project! This project is a real-time keylogger that tracks keystrokes, mouse clicks, and predicts possible passwords. The dashboard is designed with a cool Matrix-style digital rain background for a visually appealing interface.

## Features

- Real-time Keystroke Logging: Tracks and displays keystrokes in real-time.
- Mouse Click Tracking: Logs mouse clicks with coordinates and button type.
- Password Prediction: Analyzes keystrokes to predict possible passwords.
- Matrix-Style Background: Aesthetic, live Matrix-style digital rain background.

## Technologies Used

- Frontend: React, Bootstrap, Socket.IO
- Backend: Flask, Flask-SocketIO, Python
- Other Libraries: `keyboard` for capturing keystrokes, `mouse` for capturing mouse events
- Styling: Custom CSS for neon green text and dark theme

## Usage

- Open the dashboard in your browser (usually `http://localhost:3000`).
- The dashboard will display keystrokes, mouse clicks, and predicted passwords in real-time.
- The predicted passwords are updated every 60 seconds.

## Debugging Steps

### Print Statements
I used various print statements to the console for debugging, such as:
- Printing received keystrokes and mouse clicks.
- Printing data before and after processing.
- Printing error messages and stack traces.

### Console Logs
I used `console.log()` extensively in the React components to verify state changes and data flows.

### Backend Logs
I checked Flask and Socket.IO logs to monitor connections, data transfers, and potential errors.

## Functionality

### Keystroke Logging
- Data Structure: A list to store keystrokes.
- Algorithm: 
    - Capture keystrokes using the `keyboard` library.
    - Append keystrokes to the list.
    - Emit updated keystrokes to the frontend via Socket.IO.

### Mouse Click Tracking
- Data Structure: A list to store mouse click events with coordinates.
- Algorithm:
    - Capture mouse clicks using the `mouse` library.
    - Append click events (button type and coordinates) to the list.
    - Emit updated mouse clicks to the frontend via Socket.IO.

### Password Prediction
- Data Structure: A list to store predicted passwords.
- Algorithm:
    - Analyze keystrokes for patterns (e.g., sequences of letters and special characters).
    - Predict possible passwords based on these patterns.
    - Emit predicted passwords to the frontend via Socket.IO.

### Matrix-Style Background
- Implementation: Added a custom CSS and JavaScript to create a live Matrix-style digital rain background.



