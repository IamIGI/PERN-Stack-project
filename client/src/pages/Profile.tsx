import { FormRow } from '../components';
import Wrapper from '../assets/wrappers/DashboardFormPage';
import {
  useOutletContext,
  type ActionFunctionArgs,
} from 'react-router-dom';
import { Form } from 'react-router-dom';
import type { DashboardContextOutlet } from './DashboardLayout';
import { toast } from 'react-toastify';
import serverRequest from '../utils/serverRequest.utils';
import type { AxiosError } from 'axios';
import SubmitBtn from '../components/SubmitBtn';

// eslint-disable-next-line
export const action = async ({
  request,
}: ActionFunctionArgs) => {
  const formData = await request.formData();

  const file = formData.get('avatar') as File | null;
  console.log('Debug: ', { size: file!.size });
  if (file instanceof File && file.size > 5000000) {
    toast.error('Image size too large');
    return null;
  }

  try {
    await serverRequest.patch(
      '/users/update-user',
      formData,
    );
    toast.success('Profile updated successfully');
  } catch (error) {
    const axiosError = error as AxiosError<{ msg: string }>;
    toast.error(axiosError?.response?.data?.msg);
  }
};

const Profile = () => {
  const { user } =
    useOutletContext<DashboardContextOutlet>();
  const { name, lastName, location } = user;

  return (
    <Wrapper>
      <Form
        method="post"
        className="form"
        encType="multipart/form-data" //required for images
      >
        <h4 className="form-title">profile</h4>

        <div className="form-center">
          <div className="form-row">
            <label htmlFor="avatar" className="form-label">
              Select an image file (max 0.5 MB):
            </label>
            <input
              type="file"
              id="avatar"
              name="avatar"
              className="form-input"
              accept="image/*"
            />
          </div>
          <FormRow
            type="text"
            name="name"
            defaultValue={name}
          />
          <FormRow
            type="text"
            labelText="last name"
            name="lastName"
            defaultValue={lastName}
          />
          <FormRow
            type="text"
            name="location"
            defaultValue={location}
          />
          <SubmitBtn />
        </div>
      </Form>
    </Wrapper>
  );
};

export default Profile;
