import { toast } from 'react-toastify';

import { useLoaderData } from 'react-router-dom';
import SearchContainer from '../components/SearchContainer';
import JobsContainer from '../components/JobsContainer';
import type { AxiosError } from 'axios';
import serverRequest from '../utils/serverRequest.utils';
import { createContext, useContext } from 'react';
import type { Job as IJob } from '../types';

interface JobContextInterface {
  data: { jobs: IJob[] };
}

// eslint-disable-next-line
export const loader = async (): Promise<
  JobContextInterface | unknown
> => {
  try {
    const { data } = await serverRequest.get('/jobs');
    return {
      data,
    };
  } catch (error) {
    const axiosError = error as AxiosError<{ msg: string }>;
    toast.error(axiosError?.response?.data?.msg);
    return error;
  }
};

const AllJobsContext = createContext<JobContextInterface>({
  data: {
    jobs: [],
  },
});

const AllJobs = () => {
  const { data } = useLoaderData<JobContextInterface>();

  return (
    <AllJobsContext.Provider value={{ data }}>
      <SearchContainer />
      <JobsContainer />
    </AllJobsContext.Provider>
  );
};
// eslint-disable-next-line
export const useAllJobsContext = () =>
  useContext(AllJobsContext);

export default AllJobs;
