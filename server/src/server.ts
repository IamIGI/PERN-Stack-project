// #### Access the env files
import * as dotenv from 'dotenv';
dotenv.config();

// #### IMPORTS
import express from 'express';
import morgan from 'morgan';
import { ErrorRequestHandler } from 'express';

const app = express();

// #### MIDDLEWARES
//Accept JSON files
app.use(express.json());
// HTTP request logger middleware for node.js
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

//-----TEMP-----

let jobs = [
  {
    id: crypto.randomUUID(),
    company: 'apple',
    position: 'front-end',
  },
  {
    id: crypto.randomUUID(),
    company: 'google',
    position: 'back-end',
  },
];

app.get('/api/v1/jobs', (req, res) => {
  res.status(200).json({ jobs });
});

// GET SINGLE JOB
app.get('/api/v1/jobs/:id', (req, res) => {
  const { id } = req.params;
  const job = jobs.find((job) => job.id === id);
  if (!job) {
    return res
      .status(404)
      .json({ msg: `no job with id ${id}` });
  }
  res.status(200).json({ job });
});

// CREATE JOB
app.post('/api/v1/jobs', (req, res) => {
  const { company, position } = req.body;
  if (!company || !position) {
    return res.status(400).json({
      msg: 'place provide company and position',
    });
  }
  const job = {
    id: crypto.randomUUID(),
    company,
    position,
  };
  jobs.push(job);
  res.status(200).json({ job });
});

// EDIT JOB

app.patch('/api/v1/jobs/:id', (req, res) => {
  const { company, position } = req.body;
  if (!company || !position) {
    return res
      .status(400)
      .json({ msg: 'please provide company and position' });
  }
  const { id } = req.params;
  const job = jobs.find((job) => job.id === id);
  if (!job) {
    return res
      .status(404)
      .json({ msg: `no job with id ${id}` });
  }

  job.company = company;
  job.position = position;
  res.status(200).json({ msg: 'job modified', job });
});

// DELETE JOB

app.delete('/api/v1/jobs/:id', (req, res) => {
  const { id } = req.params;
  const job = jobs.find((job) => job.id === id);
  if (!job) {
    return res
      .status(404)
      .json({ msg: `no job with id ${id}` });
  }
  const newJobs = jobs.filter((job) => job.id !== id);
  jobs = newJobs;

  res.status(200).json({ msg: 'job deleted' });
});

//-----------

// #### Not Found Middleware
app.use('*', (req, res) => {
  res.status(404).json({ msg: '404-not found' });
});
// #### Error Middleware
const errorHandler: ErrorRequestHandler = (
  err,
  req,
  res,
  next,
) => {
  console.log(err);
  res
    .status(500)
    .json({ msg: 'something went wrong', err });
};
app.use(errorHandler);

const port = process.env.PORT || 5101;
app.listen(port, () => {
  console.log(`Server running on port: ${port}...`);
});
