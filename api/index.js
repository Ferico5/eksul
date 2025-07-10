import express from 'express';
import cors from 'cors';
// import './models/RoomInfoModel.js';
// import './models/RegistrationModel.js';
import StudentsRoute from './routes/StudentsRoute.js';
import EksulRoute from './routes/EksulRoute.js';
import AttendanceRoute from './routes/AttendanceRoute.js';
import AdminRoute from './routes/AdminRoute.js';
// import RoomRoute from './routes/RoomRoute.js';
// import BookRoomRoute from './routes/BookRoomRoute.js';
// import PersonalInfoRoute from './routes/PersonalInfoRoute.js';
// import RegisterComplaintRoute from './routes/RegisterComplaintRoute.js';
// import FeedbackRoute from './routes/FeedbackRoute.js';
// import ComplaintActionRoute from './routes/ComplaintActionRoute.js';
import db from './config/Database.js';

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());
app.use(StudentsRoute);
app.use(EksulRoute);
app.use(AttendanceRoute);
app.use(AdminRoute);

// Sinkronisasi database
(async () => {
  try {
    await db.sync();
    console.log('Database synchronized successfully.');
  } catch (error) {
    console.error('Error syncing database:', error);
  }
})();

app.listen(port, () => {
  console.log(`App is listening to port ${port}`);
});
