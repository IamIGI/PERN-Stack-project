import { FormRow } from '.';
import Wrapper from '../assets/wrappers/DashboardFormPage';
import { Form, Link } from 'react-router-dom';

import FormRowSelect from './FormRowSelect';
import SubmitBtn from './SubmitBtn';
import { JobSortBy, JobStatus, JobType } from '../types';

const SearchContainer = () => {
  return (
    <Wrapper>
      <Form className="form">
        <h5 className="form-title">search form</h5>
        <div className="form-center">
          {/* search position */}

          <FormRow
            type="search"
            name="search"
            defaultValue="a"
          />
          <FormRowSelect
            labelText="job status"
            name="jobStatus"
            list={['all', ...Object.values(JobStatus)]}
            defaultValue="all"
          />
          <FormRowSelect
            labelText="job type"
            name="jobType"
            list={['all', ...Object.values(JobType)]}
            defaultValue="all"
          />
          <FormRowSelect
            name="sort"
            defaultValue="newest"
            list={[...Object.values(JobSortBy)]}
          />

          <Link
            to="/dashboard/all-jobs"
            className="btn form-btn delete-btn"
          >
            Reset Search Values
          </Link>
          {/* TEMP!!!! */}
          <SubmitBtn />
        </div>
      </Form>
    </Wrapper>
  );
};

export default SearchContainer;
