# Location Tracker for Salesforce

A Next.js application designed to track the real-time location of field executives and sync the data with Salesforce. This provides a simple dashboard to manage and monitor location tracking status.


## ✨ Features

*   **Salesforce Authentication:** Secure login using Salesforce credentials via NextAuth.js.
*   **Real-time Location Tracking:** Automatically captures and sends location data at set intervals when active.
*   **Manual Sync:** Option to manually push the current location to Salesforce with a single click.
*   **Interactive Dashboard:** A user-friendly interface to:
    *   Start and stop background location tracking.
    *   View the last successfully synced location.
    *   See a history of location sync attempts with success/failure status.
    *   Display user information from their Salesforce profile.

## 🛠️ Tech Stack

*   **Framework:** [Next.js](https://nextjs.org/) (App Router)
*   **Language:** [TypeScript](https://www.typescriptlang.org/)
*   **Authentication:** [NextAuth.js](https://next-auth.js.org/) with the Salesforce Provider
*   **Styling:** [Tailwind CSS](https://tailwindcss.com/)
*   **UI Components:** [shadcn/ui](https://ui.shadcn.com/)

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

*   Node.js (v18 or later recommended)
*   A package manager like `npm`, `yarn`, or `pnpm`
*   A Salesforce Connected App to obtain OAuth credentials.

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/Location-Tracker.git
    cd Location-Tracker
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    # or
    pnpm install
    ```

3.  **Set up environment variables:**

    Create a `.env.local` file in the root of your project and add the following variables. You will get these from your Salesforce Connected App settings.

    ```env
    # NextAuth.js
    NEXTAUTH_URL=http://localhost:3000
    NEXTAUTH_SECRET= # Generate a secret: openssl rand -base64 32

    # Salesforce Credentials
    SALESFORCE_CLIENT_ID=YOUR_SALESFORCE_CLIENT_ID
    SALESFORCE_CLIENT_SECRET=YOUR_SALESFORCE_CLIENT_SECRET
    SALESFORCE_LOGIN_URL=https://login.salesforce.com # or your sandbox URL
    ```

4.  **Run the development server:**
    ```bash
    npm run dev
    ```

Open http://localhost:3000 with your browser to see the result.

## ☁️ Deployment

This application is ready to be deployed on platforms like Vercel or Netlify. Remember to set the environment variables in your deployment provider's settings.

## 📄 License

This project is licensed under the MIT License - see the `LICENSE` file for details.
