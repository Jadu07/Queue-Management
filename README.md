# Queue Management System

A full-stack queue management solution with **customer-facing web app**, **admin mobile app**, and a **backend API** powered by **Express.js, Prisma, and Supabase PostgreSQL**.

---

## Live Demo  
https://www.youtube.com/watch?v=Y-CP87FKIqk

---

https://github.com/user-attachments/assets/febe3925-f989-4ce6-a82b-2187dc694cea



- 🌐 **Customer Web App:** [queue-management-ten.vercel.app](https://queue-management-ten.vercel.app/)  
- ⚙️ **Backend API (Serving Route):** [queue-management-6cgk.onrender.com/serving](https://queue-management-6cgk.onrender.com/serving)  

---

## Project Details

- **Name:** Yashraj Chouhan  
- **URN Number:** 2024-B-13092005  

---

## Project Overview

### Problem Statement  
Many small businesses, clinics, salons,restaurants and service centers that don’t have access to computers or desktop browsers still rely on manual queue systems (paper slips, verbal announcements, or registers). This leads to confusion, long waiting times, and poor customer experience. Staff also face difficulties in keeping track of multiple entries. 

### Proposed Solution  
A full-stack queue management system with a web app for customers to join and track their queue status, a mobile app for admins to manage queues in real time without the need for desktops, and a backend API with Supabase + Prisma to store and manage queue data. The system automatically resets queue tokens daily at **5:30 AM** with timestamps, making it fully accessible for businesses that only have smartphones. 

### Target Users / Audience  
- Banks  
- Hospitals / Small Clinics 
- Government offices  
- Service centers
- Salons
- Restaurants
- Any organization requiring queue management  

### Expected Outcome  
A functional system where customers can easily join and track their queue position, and admins can manage the queue efficiently. Daily token numbering resets automatically at 5:30 AM, ensuring smooth daily operations.  

---

## Tech Stack

- **Frontend (Admin Portal):** React Native
- **Frontend (Customer Web UI):** React 
- **Backend API:** Express.js + Prisma ORM  
- **Database:** Supabase PostgreSQL  
- **Dev Tools:** Nodemon, dotenv  

---

## Features

✅ Customers can join and track their position in the queue (Web)  
✅ Admins can manage queue status in real time (Mobile)  
✅ REST API with Prisma + Supabase integration  
✅ Resets queue token numbers daily at Midnight 

---

## API Routes

### Customer Routes
- **POST** `/` → Create a new queue entry  
- **GET** `/serving` → Get the currently serving queue entry (by count)  
- **GET** `/:id` → Get the status of a specific queue entry  

### Admin Routes
- **GET** `/admin/active` → Get all active queue entries (waiting or serving)
- **GET** `/admin/stats` → Get dashboard statistics (waiting, serving, completed counts)
- **POST** `/admin/next` → Call next customer in queue (waiting → serving)
- **POST** `/admin/complete/:id` → Mark queue entry as completed
- **POST** `/admin/skip/:id` → Mark queue entry as skipped

---

## Timeline (Optional)

- **Phase 1:** Backend setup with Express + Prisma + Supabase  
- **Phase 2:** Customer Web UI (React + Tailwind)  
- **Phase 3:** Admin Mobile App (React Native)  
- **Phase 4:** Integration, testing & deployment  

---

## Future Enhancements

- Real-time updates with WebSockets  
- SMS/WhatsApp notifications for queue status  
- Authentication for admin portal  
