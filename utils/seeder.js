require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/medovate';
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'secret';

const AdminSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: 'admin' },
  createdAt: { type: Date, default: Date.now }
});

const Admin = mongoose.models.Admin || mongoose.model('Admin', AdminSchema);

async function run() {
  try {
    await mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to MongoDB');

    const hashed = await bcrypt.hash(ADMIN_PASSWORD, 10);

    const existing = await Admin.findOne({ username: ADMIN_USERNAME });
    if (existing) {
      existing.password = hashed;
      await existing.save();
      console.log(`Updated admin user '${ADMIN_USERNAME}'`);
    } else {
      await Admin.create({ username: ADMIN_USERNAME, password: hashed });
      console.log(`Created admin user '${ADMIN_USERNAME}'`);
    }

    console.log('Seeder finished.');
    process.exit(0);
  } catch (err) {
    console.error('Seeder error:', err);
    process.exit(1);
  }
}

if (require.main === module) run();
