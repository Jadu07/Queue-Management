# Queue Management System

A full-stack queue management solution with **customer-facing web app**, **admin mobile app**, and a **backend API** powered by **Express.js, Prisma, and Supabase PostgreSQL**.

---

## Tech Stack

- **Frontend (Customer Web UI):** React
- **Frontend (Admin Portal):** React Native  
- **Backend API:** Express.js + Prisma ORM  
- **Database:** Supabase PostgreSQL  
- **Dev Tools:** Nodemon, dotenv  

---

## Features

✅ Customers can join and track their position in the queue (Web)  
✅ Admins can manage queue status in real time (Mobile)  
✅ REST API with Prisma + Supabase integration   
✅ Resets queue token numbers daily at 5:30 AM (with timestamps)  

---

## API Routes 

### Customer Routes
- **POST** `/` → Create a new queue entry  
- **GET** `/serving` → Get the currently serving queue entry (by count)  
- **GET** `/:id` → Get the status of a specific queue entry  

### Admin Routes (In Progress)
- **PUT** `/queue/:id` → Update queue item status (`waiting`, `serving`, `completed`)  
- **DELETE** `/queue/:id` → Remove a queue item  
