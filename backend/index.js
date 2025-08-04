require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const cors = require('cors')
const bcrypt = require('bcryptjs')

const app = express()
app.use(express.json())
app.use(cors())

mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log("Mongo DB Connected Successfully")
})
.catch((error=> {
    console.log(`Error: ${error}`)
}))

const userSchema = new mongoose.Schema({
    username: {type:String, required:true, unique:true},
    password: {type:String, required:true}
})
const User = mongoose.model('user', userSchema)

const jobSchema = new mongoose.Schema({
  company_logo_url: { type: String, required: true },
  employment_type: { type: String, required: true },
  job_description: { type: String, required: true },
  location: { type: String, required: true },
  package_per_annum: { type: String, required: true },
  rating: { type: Number, required: true },
  title: { type: String, required: true }
}, { timestamps: true });

const Job = mongoose.model('Job', jobSchema);

const SECRET_KEY = 'yourSecretKey'

app.post('/signup', async (req, res) => {
  const { username, password, graduationStatus, workStatus, designation, bio } = req.body;

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword, graduationStatus, workStatus, designation, bio });
    await newUser.save();

    res.status(201).json({ message: 'User created successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong' });
  }
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong' });
  }
});

app.get('/jobs', async (req, res) => {
  try {
    const jobs = await Job.find();
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch jobs' });
  }
});


app.post('/jobs', async (req, res) => {
  const {
    company_logo_url,
    employment_type,
    job_description,
    location,
    package_per_annum,
    rating,
    title
  } = req.body;

  try {
    const newJob = new Job({
      company_logo_url,
      employment_type,
      job_description,
      location,
      package_per_annum,
      rating,
      title
    });

    await newJob.save();
    res.status(201).json({ message: 'Job added successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to add job', error: error.message });
  }
});

app.get('/jobs/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const job = await Job.findById(id);
    if (!job) return res.status(404).json({ message: 'Job not found' });

    res.json(job);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch job', error: error.message });
  }
})


const port = 3000 
app.listen(port, () => {
    console.log(`server running at http://localhost:${port}`)
})

