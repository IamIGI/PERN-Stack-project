import { RequestHandler } from 'express';
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

const getAllJobs: RequestHandler = async (req, res) => {
  res.status(200).json({ jobs });
};

const getJob: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const job = jobs.find((job) => job.id === id);
  if (!job) {
    return res
      .status(404)
      .json({ msg: `no job with id ${id}` });
  }
  res.status(200).json({ job });
};

const createJob: RequestHandler = async (req, res) => {
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
};

const updateJob: RequestHandler = async (req, res) => {
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
};

const deleteJob: RequestHandler = async (req, res) => {
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
};

export default {
  getAllJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob,
};
