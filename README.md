# Queue Management API

A simple REST API for managing a queue system using Express.js, Prisma, and Supabase PostgreSQL.

## Features

- ✅ CRUD operations for queue management
- ✅ Error handling for all endpoints
- ✅ Health check endpoint
- ✅ Supabase PostgreSQL integration
- ✅ Environment variable configuration

## Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Database Setup

#### Check Supabase Connection
Your current database URL is configured for Supabase. If you're getting connection errors:

1. **Check if your Supabase project is active:**
   - Go to [Supabase Dashboard](https://supabase.com/dashboard)
   - Make sure your project is not paused (free tier projects pause after inactivity)
   - If paused, click "Resume" to reactivate it

2. **Verify your database URL:**
   - In Supabase Dashboard → Settings → Database
   - Copy the connection string and update your `.env` file if needed

3. **Push your schema to the database:**
```bash
npm run db:push
```

### 3. Generate Prisma Client
```bash
npm run generate
```

### 4. Start the Application

#### Development mode (with auto-restart):
```bash
npm run dev
```

#### Production mode:
```bash
npm start
```

## API Endpoints

### Health Check
- **GET** `/health` - Check API and database status

### Queue Management
- **GET** `/queue` - Get all queue items
- **POST** `/queue` - Add new queue item
  ```json
  {
    "name": "Customer Name"
  }
  ```
- **PUT** `/queue/:id` - Update queue item status
  ```json
  {
    "status": "serving" // or "waiting", "completed", etc.
  }
  ```
- **DELETE** `/queue/:id` - Delete queue item

## Database Schema

```prisma
model Queue {
  id        Int      @id @default(autoincrement())
  name      String
  status    String   @default("waiting")
  createdAt DateTime @default(now())
}
```

## Environment Variables

Create a `.env` file with:
```
DATABASE_URL="your_supabase_connection_string"
PORT=4000
```

## Troubleshooting

### Database Connection Issues
1. Check if Supabase project is active (not paused)
2. Verify the DATABASE_URL in your `.env` file
3. Test connection with: `curl http://localhost:4000/health`

### Common Errors
- **"Can't reach database server"**: Your Supabase project might be paused
- **"@prisma/client did not initialize"**: Run `npm run generate`
- **"Table doesn't exist"**: Run `npm run db:push`

## Scripts

- `npm start` - Start the server
- `npm run dev` - Start with nodemon (development)
- `npm run generate` - Generate Prisma client
- `npm run db:push` - Push schema to database
