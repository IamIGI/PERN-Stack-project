import { useLoaderData } from 'react-router-dom';
import ChartsContainer from '../components/ChartsContainer';
import StatsContainer from '../components/StatsContainer';
import type { JobStatsResponse } from '../types';
import serverRequest from '../utils/serverRequest.utils';

export const loader = async () => {
  try {
    const response =
      await serverRequest.get<JobStatsResponse>(
        '/jobs/stats',
      );

    return response.data;
  } catch (error) {
    return error;
  }
};

const Stats = () => {
  const { defaultStats, monthlyApplications } =
    useLoaderData() as JobStatsResponse;

  return (
    <>
      <StatsContainer defaultStats={defaultStats} />
      {monthlyApplications?.length > 0 && (
        <ChartsContainer data={monthlyApplications} />
      )}
    </>
  );
};
export default Stats;
