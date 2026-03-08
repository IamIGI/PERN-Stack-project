import { Logo } from '../components';
import Wrapper from '../assets/wrappers/RegisterAndLoginPage';
import FormRow from '../components/FormRow';
import {
  Form,
  redirect,
  useNavigation,
  Link,
  type ActionFunctionArgs,
} from 'react-router-dom';
import serverRequest from '../utils/serverRequest.utils';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';

//Fast refresh issue
// src
//  ├─ pages
//  │   └─ Register.tsx
//  ├─ actions
//  │   └─ register.action.ts
//  ├─ loaders
//  │   └─ dashboard.loader.ts

// eslint-disable-next-line
export const action = async ({
  request,
}: ActionFunctionArgs) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    await serverRequest.post('/auth/register', data);
    toast.success('Registration successful');
    return redirect('/login');
  } catch (error) {
    const axiosError = error as AxiosError<{ msg: string }>;
    toast.error(axiosError?.response?.data?.msg);
    return error;
  }
};

const Register = () => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';
  return (
    <Wrapper>
      <Form className="form" method="post">
        <Logo />
        <h4>Register</h4>
        <FormRow type="text" name="name" />
        <FormRow
          type="text"
          name="lastName"
          labelText="last name"
        />
        <FormRow type="text" name="location" />
        <FormRow type="email" name="email" />

        <FormRow type="password" name="password" />

        <button
          type="submit"
          className="btn btn-block"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'submitting...' : 'submit'}
        </button>
        <p>
          Already a member?
          <Link to="/login" className="member-btn">
            Login
          </Link>
        </p>
      </Form>
    </Wrapper>
  );
};
export default Register;
