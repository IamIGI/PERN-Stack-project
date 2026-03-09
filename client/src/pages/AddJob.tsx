import {
  Form,
  redirect,
  useOutletContext,
  type ActionFunctionArgs,
} from 'react-router-dom';
import Wrapper from '../assets/wrappers/DashboardFormPage';
import { FormRow } from '../components';
import { JobStatus, JobType, type User } from '../types';
import FormRowSelect from '../components/FormRowSelect';
import serverRequest from '../utils/serverRequest.utils';
import { toast } from 'react-toastify';
import type { AxiosError } from 'axios';
import SubmitBtn from '../components/SubmitBtn';

// eslint-disable-next-line
export const action = async ({
  request,
}: ActionFunctionArgs) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  try {
    await serverRequest.post('/jobs', data);
    toast.success('Job added successfully');
    return redirect('all-jobs');
  } catch (error) {
    const axiosError = error as AxiosError<{ msg: string }>;
    toast.error(axiosError?.response?.data?.msg);
    return error;
  }
};

const AddJob = () => {
  const { user } = useOutletContext() as { user: User };

  return (
    <Wrapper>
      <Form method="post" className="form">
        <h4 className="form-title">add job</h4>
        <div className="form-center">
          <FormRow type="text" name="position" />
          <FormRow type="text" name="company" />
          <FormRow
            type="text"
            labelText="job location"
            name="jobLocation"
            defaultValue={user.location}
          />
          <FormRowSelect
            labelText="job status"
            name="jobStatus"
            defaultValue={JobStatus.PENDING}
            list={Object.values(JobStatus)}
          />
          <FormRowSelect
            name="jobType"
            labelText="job type"
            defaultValue={JobType.FULL_TIME}
            list={Object.values(JobType)}
          />

          <SubmitBtn />
        </div>
      </Form>
    </Wrapper>
  );
};
export default AddJob;
