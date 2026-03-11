import { toast } from 'react-toastify';

import {
  useLoaderData,
  type LoaderFunctionArgs,
} from 'react-router-dom';
import SearchContainer from '../components/SearchContainer';
import JobsContainer from '../components/JobsContainer';
import type { AxiosError } from 'axios';
import serverRequest from '../utils/serverRequest.utils';
import { createContext, useContext } from 'react';
import type {
  Job as IJob,
  JobStatusType,
  JobTypeType,
} from '../types';

interface JobContextInterface {
  data: { jobs: IJob[] };
  searchValues: {
    search?: string;
    jobStatus?: JobStatusType | 'all';
    jobType?: JobTypeType | 'all';
    sort?: 'newest' | 'oldest' | 'a-z' | 'z-a';
    page?: string;
    limit?: string;
  };
}

// eslint-disable-next-line
export const loader = async ({
  request,
}: LoaderFunctionArgs) => {
  try {
    const params = Object.fromEntries([
      ...new URL(request.url).searchParams.entries(),
    ]);

    const { data } = await serverRequest.get('/jobs', {
      params,
    });

    return {
      data,
      searchValues: { ...params },
    };
  } catch (error) {
    const axiosError = error as AxiosError<{
      msg: string;
    }>;
    toast.error(axiosError?.response?.data?.msg);
    return error;
  }
};

const AllJobsContext = createContext<JobContextInterface>({
  data: {
    jobs: [],
  },
  searchValues: {},
});

const AllJobs = () => {
  const { data, searchValues } =
    useLoaderData<JobContextInterface>();

  return (
    <AllJobsContext.Provider value={{ data, searchValues }}>
      <SearchContainer />
      <JobsContainer />
    </AllJobsContext.Provider>
  );
};
// eslint-disable-next-line
export const useAllJobsContext = () =>
  useContext(AllJobsContext);

export default AllJobs;
