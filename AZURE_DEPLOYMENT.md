# GuruBramha Azure Deployment & Configuration Guide

This guide provides step-by-step instructions to configure and deploy the GuruBramha MERN application to Azure App Service, ensuring that accessing the default domain loads the application.

---

## 📋 Table of Contents
1. [Prerequisites](#1-prerequisites)
2. [Step-by-Step Deployment Steps](#2-step-by-step-deployment-steps)
   - [Phase A: Push Code & Trigger Build](#phase-a-push-code--trigger-build)
   - [Phase B: Configure Azure App Service (Azure Portal)](#phase-b-configure-azure-app-service-azure-portal)
3. [Troubleshooting & Verification](#3-troubleshooting--verification)

---

## 1. Prerequisites
- An active **Azure App Service** (Linux container) named `gurubramha-api`.
- The GitHub repository connected to Azure via a service principal or deployment credentials.
- MongoDB Atlas (or another MongoDB database) connection string.

---

## 2. Step-by-Step Deployment Steps

### Phase A: Push Code & Trigger Build
1. Stage and commit the latest code changes (including dynamic API routing updates):
   ```powershell
   git add .
   git commit -m "Configure dynamic API URL routing for production deployment"
   ```
2. Push your changes to the `main` branch of your GitHub repository:
   ```powershell
   git push origin main
   ```
3. This automatically triggers the GitHub Actions workflow defined in `.github/workflows/main_gurubramha-api.yml`. You can monitor its progress under the **Actions** tab of your GitHub repository.

---

### Phase B: Configure Azure App Service (Azure Portal)

Since the frontend is built and served directly from the Express backend in production, we need to supply the appropriate settings in the Azure Portal to let Node.js run properly and communicate with your backend resources.

#### Step 1: Configure Environment Variables
1. Navigate to the [Azure Portal](https://portal.azure.com).
2. Find and open your Web App resource named **`gurubramha-api`**.
3. In the left sidebar navigation, scroll to the **Settings** section and click on **Environment variables** (or **Configuration** depending on your Portal version).
4. Under **Application settings**, add the following environment variables:

| Name | Value | Description |
| :--- | :--- | :--- |
| `NODE_ENV` | `production` | Enables production mode optimizations. |
| `PORT` | `8080` (or leave blank) | Azure automatically maps incoming traffic, but defaults to `8080` or `5000`. |
| `MONGODB_URI` | `mongodb://...` | Your MongoDB connection string (ensure special characters in credentials are URL-encoded). |
| `JWT_SECRET` | `your_secure_jwt_token` | Secret key used for signing JWT authentication tokens. |
| `FRONTEND_URL` | `https://gurubramha-api.azurewebsites.net` | The public default domain URL of your Azure Web App (crucial for CORS authorization). |
| `RAZORPAY_KEY_ID` | `rzp_test_...` | Your Razorpay API Key ID. |
| `RAZORPAY_KEY_SECRET` | `...` | Your Razorpay API Key Secret. |
| `DIGILOCKER_CLIENT_ID` | `...` | Your DigiLocker Developer Client ID. |
| `DIGILOCKER_CLIENT_SECRET`| `...` | Your DigiLocker Developer Client Secret. |
| `DIGILOCKER_REDIRECT_URI` | `https://gurubramha-api.azurewebsites.net/api/digilocker/callback` | The OAuth callback URL registered with DigiLocker. |

5. Click **Apply** (or **Save**) at the bottom and click **Confirm**. This will automatically restart your app container to apply the environment variables.

> [!IMPORTANT]
> Make sure `FRONTEND_URL` and `DIGILOCKER_REDIRECT_URI` use the exact default domain provided by Azure (e.g. `https://gurubramha-api.azurewebsites.net`).

#### Step 2: Set the Startup Command
Because our GitHub Actions workflow compiles the React frontend and packages the server files at the root of the artifact, the root folder of the deployment contains `index.js`. We must explicitly configure Azure's Startup command to start the Express server.

1. On your App Service page, navigate to **Settings** -> **Configuration** (or **Configuration** -> **General settings**).
2. Go to the **General settings** tab.
3. Locate the **Startup Command** input box.
4. Input the following command:
   ```bash
   node index.js
   ```
5. Click **Save** at the top of the panel and confirm.

---

## 3. Troubleshooting & Verification

### How to verify if files are deployed correctly
You can check if the Express backend is running and static files are served by visiting the debug endpoint in your browser:
* URL: `https://gurubramha-api.azurewebsites.net/api/debug`

This endpoint returns a JSON payload displaying:
- The list of files inside the `public` directory.
- The size of `index.html`.
- A preview of `index.html`'s start tags to confirm the React production bundle is ready.

### Checking logs in real time
If you encounter a `502 Bad Gateway` or `Application Error`, check the logs:
1. In the Azure Portal, go to your Web App.
2. Scroll to the **Monitoring** section and select **Log Stream**.
3. Change the dropdown option to **App Logs** to view console output and startup diagnostics.
