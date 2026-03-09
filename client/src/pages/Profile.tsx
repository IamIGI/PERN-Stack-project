import { FormRow } from '../components';
import Wrapper from '../assets/wrappers/DashboardFormPage';
import {
  useOutletContext,
  type ActionFunctionArgs,
} from 'react-router-dom';
import { useNavigation, Form } from 'react-router-dom';
import type { DashboardContextOutlet } from './DashboardLayout';
import { toast } from 'react-toastify';
import serverRequest from '../utils/serverRequest.utils';
import type { AxiosError } from 'axios';

// eslint-disable-next-line
export const action = async ({
  request,
}: ActionFunctionArgs) => {
  const formData = await request.formData();

  const file = formData.get('avatar') as File | null;
  if (file instanceof File && file.size > 500000) {
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
  const { name, lastName, email, location } = user;
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';
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
            type="email"
            name="email"
            defaultValue={email}
          />
          <FormRow
            type="text"
            name="location"
            defaultValue={location}
          />
          <button
            className="btn btn-block form-btn"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting
              ? 'submitting...'
              : 'save changes'}
          </button>
        </div>
      </Form>
    </Wrapper>
  );
};

export default Profile;
