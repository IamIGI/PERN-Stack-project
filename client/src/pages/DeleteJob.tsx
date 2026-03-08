import {
  redirect,
  type ActionFunctionArgs,
} from 'react-router-dom';
import serverRequest from '../utils/serverRequest.utils';
import { toast } from 'react-toastify';
import type { AxiosError } from 'axios';

// eslint-disable-next-line
export const action = async ({
  params,
}: ActionFunctionArgs) => {
  try {
    await serverRequest.delete(`/jobs/${params.id}`);
    toast.success('Job delete successfully');
  } catch (error) {
    const axiosError = error as AxiosError<{ msg: string }>;
    toast.error(axiosError?.response?.data?.msg);
  }
  return redirect('/dashboard/all-jobs');
};
