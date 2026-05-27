# USTP SmartVote — Mobile App

React Native mobile app for the USTP SmartVote student election system with face biometric verification.

## Deployment

| Platform | URL |
|----------|-----|
| Backend API | https://it323-appdev-smartvote-fastapi.onrender.com |
| Android APK | Download from Expo EAS / included in submission |

## Tech Stack

| | |
|-|-|
| Framework | React Native 0.81, Expo SDK 54 |
| Routing | Expo Router (file-based) |
| HTTP | Axios |
| Storage | AsyncStorage |
| Camera | expo-camera |
| Build | EAS Build |

## Features

- Student login with email + face biometric verification
- Admin login (goes directly to dashboard, no face verification)
- Register face for biometric verification
- Cast votes per position (President, VP, Secretary, Treasurer, Auditor)
- View live election results
- Admin dashboard — voter turnout, candidate tallies, voter log, election settings

## Local Development

```bash
npm install
npx expo start
```

The app connects to `https://it323-appdev-smartvote-fastapi.onrender.com/api` by default.

For local backend, update `api.js`:
```js
const BASE_URL = 'http://<your-local-ip>:8001/api';
```

## Build APK (EAS)

```bash
eas build --profile preview --platform android
```

Download the APK from the Expo dashboard after the build completes.

## Group Members

- Nepthalie Brynt R. Asinero
- Dan Ivan E. Labin
- Christian Paul L. Bahian
- Ronald E. Yu

## Course

IT323 - Application Development and Emerging Technologies