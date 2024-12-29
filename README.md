# Calendar Communication Tracker

A comprehensive calendar-based communication tracker for businesses to efficiently manage relationships, log communications, and track follow-ups with companies.

## 🚀 Project Overview

The **Calendar Communication Tracker** is a web-based application designed to centralize communication logs, scheduled follow-ups, and reporting to optimize business communication. It helps businesses track and manage interactions with companies through a dynamic calendar view and real-time activity feed. The app is built using **React** on the frontend and **Node.js** on the backend, offering seamless interaction and smooth user experience.

## 🛠️ Features

### 1. **Admin Module**
- **Company Management:**
  - Add, edit, or delete company details, including:
    - Name, Location
    - LinkedIn Profile
    - Contact Information (Email, Phone)
    - Communication Periodicity
    - Configure communication methods with flags to enforce mandatory steps.
- **Communication Method Management:**
  - Define different communication methods (e.g., Email, Phone, Meeting) and set sequences for each method.

### 2. **User Module**
- **Dashboard:**
  - A real-time, dynamic grid displaying:
    - Companies
    - Recent communications
    - Upcoming communication tasks
- **Communication Logging:**
  - Record communication activities, add notes, and set statuses like overdue or completed.
- **Notifications:**
  - Get alerts for upcoming or overdue communication tasks.
- **Calendar View:**
  - Calendar-style visualization for past and future communications, allowing users to track and manage tasks.

### 3. **Reporting & Analytics (Optional)**
- **Communication Frequency Report:**
  - Visualize the frequency of communication methods (e.g., how often emails or calls are made).
- **Engagement Effectiveness:**
  - Analyze communication success, track responses, and view effectiveness over time.
- **Overdue Communication Trends:**
  - Track trends of overdue communications, visualized in trendlines or heatmaps.
- **Real-Time Activity Feed:**
  - View live communication activities with sortable filters by user, date, or company.

## 🧰 Technologies Used

### Frontend:
- **React**, **React Hooks**, **JSX**, **CSS Modules**
- **React Big Calendar** for calendar view
- **Material UI / Tailwind CSS** for UI styling

### Backend:
- **Node.js**, **Express**, **MongoDB**

### Authentication:
- **JWT (JSON Web Tokens)** for secure user authentication

### State Management:
- **Context API** (for managing state across components)

### Testing:
- **Jest** (optional for unit tests)

### Version Control:
- **Git** with **GitHub** for repository management

### Deployment:
- **Frontend:** Vercel 
- **Backend:** Heroku, AWS, DigitalOcean (for deploying backend)

## ⚙️ Setup and Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/sultan0990/Entnt-Assesment25.git
   ```
2. Navigate to the project directory:
   ```
   cd Entnt-Assesment25
   ```
3. Install dependencies:
   ```
   npm install
   ```
4. Run the development server:
   ```
   npm start
   ```
5. Open http://localhost:3000 in your browser to view the app.

---

## 📂 Folder Structure
```
src/
│
├── components/
│   ├── notification.js
│   ├── notification.css
│   └── ...
├── routes/
│   ├── adminModule.js
│   ├── userDashboard.js
│   └── ...
├── context/
│   └── data.js
├── App.js
├── index.js
└── ...
```

---

## 📝 Future Enhancements  

- **Advanced Search Functionality:** Implement search filters to allow users to search for companies and communication logs based on different criteria.  
- **Role-Based Permissions:** Expand user roles with different levels of permissions (Admin, Manager, User) for better access control.  
- **Mobile App:** Develop a mobile version of the app to make communication tracking accessible on the go.  
- **Analytics Dashboard:** Enhance reporting with a more detailed analytics dashboard that shows insights on communication effectiveness and trends.  
- **Cloud Integration:** Integrate with cloud storage services for document storage and sharing between users.

---




## Thank you 🤝
