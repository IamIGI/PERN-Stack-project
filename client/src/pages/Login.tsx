import { Logo, FormRow } from '../components';
import Wrapper from '../assets/wrappers/RegisterAndLoginPage';
import {
  Form,
  Link,
  redirect,
  useNavigation,
  type ActionFunctionArgs,
} from 'react-router-dom';
import serverRequest from '../utils/serverRequest.utils';
import { toast } from 'react-toastify';
import type { AxiosError } from 'axios';

// eslint-disable-next-line
export const action = async ({
  request,
}: ActionFunctionArgs) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  // const errors = { msg: '' };
  // if ((data.password as string).length < 3) {
  //   errors.msg = 'password too short';
  //   return errors;
  // }
  try {
    await serverRequest.post('/auth/login', data);
    toast.success('Login successful');
    return redirect('/dashboard');
  } catch (error) {
    const axiosError = error as AxiosError<{ msg: string }>;
    toast.error(axiosError?.response?.data?.msg);
    // errors.msg = error.response.data.msg;
    return error;
  }
};

const Login = () => {
  // const errors = useActionData(); //Option to access the form submit data
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';
  return (
    <Wrapper>
      <Form className="form" method="post">
        <Logo />
        <h4>Login</h4>
        {/* {errors && <p style={{ color: 'red' }}>{errors.msg}</p>} */}
        <FormRow
          type="email"
          name="email"
          defaultValue="admin@gmail.com"
        />
        <FormRow
          type="password"
          name="password"
          defaultValue="Admin123!"
        />
        <button
          type="submit"
          className="btn btn-block"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'submitting...' : 'submit'}
        </button>
        <button type="button" className="btn btn-block">
          explore the app
        </button>
        <p>
          Not a member yet?
          <Link to="/register" className="member-btn">
            Register
          </Link>
        </p>
      </Form>
    </Wrapper>
  );
};
export default Login;
