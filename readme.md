## Installation

Follow these steps to set up the project locally:

### 1. Backend Setup (Laravel)

1. Navigate to the `server` directory:

   ```bash
   cd server
   ```

2. Install PHP dependencies using Composer:

   ```bash
   composer install
   ```

3. Copy the `.env.example` file to `.env`:

   ```bash
   cp .env.example .env
   ```

4. Generate the application key:

   ```bash
   php artisan key:generate
   ```

5. Configure the `.env` file with your database credentials and other environment variables.

6. Run database migrations:

   ```bash
   php artisan migrate
   ```

7. To create the symbolic link, you may use the storage:link Artisan command:
   ```
   php artisan storage:link
   ```
8. Start the Laravel development server:

   ```bash
   php artisan serve
   ```

   The backend will be available at `http://127.0.0.1:8000`.

---

### 2. Frontend Setup (React)

1. Navigate to the client directory:

   ```bash
   cd ../client
   ```

2. Install Node.js dependencies:

   ```bash
   npm install
   ```

3. Start the Vite development server:

   ```bash
   npm run dev
   ```

   The frontend will be available at the URL provided by Vite (e.g., `http://127.0.0.1:5173`).

---

## Running the Project

1. Ensure both the backend and frontend servers are running:

   - Backend: `php artisan serve`
   - Frontend: `npm run dev`

2. Open the frontend URL in your browser to interact with the application.

---

## Build for Production

To build the frontend for production:

1. Navigate to the client directory:

   ```bash
   cd client
   ```

2. Run the build command:

   ```bash
   npm run build
   ```
