import { toast } from 'react-toastify';
import type { AppStatsResponse } from '../types';
import serverRequest from '../utils/serverRequest.utils';
import type { AxiosError } from 'axios';
import { redirect, useLoaderData } from 'react-router-dom';
import Wrapper from '../assets/wrappers/StatsContainer';
import StatItem from '../components/StatItem';
import {
  FaCalendarCheck,
  FaSuitcaseRolling,
} from 'react-icons/fa';

// eslint-disable-next-line
export const loader = async () => {
  try {
    const response =
      await serverRequest.get<AppStatsResponse>(
        '/users/admin/app-stats',
      );
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<{ msg: string }>;
    toast.error(axiosError?.response?.data?.msg);
    return redirect('/dashboard');
  }
};

const Admin = () => {
  const { jobs, users } =
    useLoaderData() as AppStatsResponse;

  return (
    <Wrapper>
      <StatItem
        title="current users"
        count={users}
        color="#e9b949"
        bcg="#fcefc7"
        icon={FaSuitcaseRolling}
      />
      <StatItem
        title="total jobs"
        count={jobs}
        color="#647acb"
        bcg="#e0e8f9"
        icon={FaCalendarCheck}
      />
    </Wrapper>
  );
};
export default Admin;
