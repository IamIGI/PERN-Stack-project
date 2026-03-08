import { FormRow } from '../components';
import Wrapper from '../assets/wrappers/DashboardFormPage';
import {
  useLoaderData,
  type ActionFunctionArgs,
  type LoaderFunctionArgs,
} from 'react-router-dom';
import {
  Form,
  useNavigation,
  redirect,
} from 'react-router-dom';
import { toast } from 'react-toastify';
import serverRequest from '../utils/serverRequest.utils';
import {
  JobStatus,
  JobType,
  type JobResponse,
} from '../types';
import type { AxiosError } from 'axios';
import FormRowSelect from '../components/FormRowSelect';

// eslint-disable-next-line
export const loader = async ({
  params,
}: LoaderFunctionArgs) => {
  try {
    const { data } = (await serverRequest.get(
      `jobs/${params.id}`,
    )) as { data: JobResponse };

    return data;
  } catch (error) {
    const axiosError = error as AxiosError<{ msg: string }>;
    toast.error(axiosError?.response?.data?.msg);
    return redirect('/dashboard/all-jobs');
  }
};

// eslint-disable-next-line
export const action = async ({
  request,
  params,
}: ActionFunctionArgs) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  try {
    await serverRequest.patch(`/jobs/${params.id}`, data);
    toast.success('Job edited successfully');

    return redirect('/dashboard/all-jobs');
  } catch (error) {
    const axiosError = error as AxiosError<{ msg: string }>;
    toast.error(axiosError?.response?.data?.msg);
    return error;
  }
};

const EditJob = () => {
  const { job } = useLoaderData() as JobResponse;

  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

  return (
    <Wrapper>
      <Form method="post" className="form">
        <h4 className="form-title">edit job</h4>
        <div className="form-center">
          <FormRow
            type="text"
            name="position"
            defaultValue={job.position}
          />
          <FormRow
            type="text"
            name="company"
            defaultValue={job.company}
          />
          <FormRow
            type="text"
            labelText="job location"
            name="jobLocation"
            defaultValue={job.jobLocation}
          />

          <FormRowSelect
            name="jobStatus"
            labelText="job status"
            defaultValue={
              job.jobStatus as unknown as string
            }
            list={Object.values(JobStatus)}
          />
          <FormRowSelect
            name="jobType"
            labelText="job type"
            defaultValue={job.jobType as unknown as string}
            list={Object.values(JobType)}
          />
          <button
            type="submit"
            className="btn btn-block form-btn "
            disabled={isSubmitting}
          >
            {isSubmitting ? 'submitting...' : 'submit'}
          </button>
        </div>
      </Form>
    </Wrapper>
  );
};
export default EditJob;
