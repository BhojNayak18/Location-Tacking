# **App Name**: ExecTracker

## Core Features:

- Salesforce OAuth Login: Authenticates users with Salesforce credentials using OAuth 2.0 and securely stores tokens.
- Real-time Location Tracking: Uses device GPS to periodically fetch latitude and longitude coordinates in the background.
- Background Location Updates: Implements a service (primarily for Android using WorkManager) to continue tracking even when the app is not in the foreground.
- Salesforce Data Sync: Transmits location data to Salesforce REST API, including error handling and retry mechanisms.
- Manual Location Push: Allows the user to manually trigger a location data send to Salesforce.
- Tracking Status Display: Displays the current tracking status, last sent location, and timestamps in a user-friendly format.
- Start/Stop Control: Button allows to Start or stop location tracking

## Style Guidelines:

- Primary color: Salesforce Blue (#00A1E0) to align with the Salesforce branding.
- Background color: Light Gray (#F5F5F5), offering a clean, neutral backdrop.
- Accent color: Green (#4CAF50) for success messages and active states, indicating positive actions and confirmations.
- Font: 'PT Sans', a clear and modern sans-serif, used for both body and headlines.
- Use simple, clear icons to represent location, tracking status, and connectivity.
- Clean and intuitive layout, prioritizing key information such as tracking status and last sent location.
- Subtle animations for loading and data transmission to provide user feedback without being intrusive.