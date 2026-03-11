import { FormRow } from '.';
import Wrapper from '../assets/wrappers/DashboardFormPage';
import { Form, Link, useSubmit } from 'react-router-dom';
import FormRowSelect from './FormRowSelect';
import { JobSortBy, JobStatus, JobType } from '../types';
import { useAllJobsContext } from '../pages/AllJobs';

const SearchContainer = () => {
  const { searchValues } = useAllJobsContext();

  const { search, jobStatus, jobType, sort } = searchValues;

  const submit = useSubmit();

  const debounce = (
    onChange: (form: HTMLFormElement) => void,
  ) => {
    const timeInSeconds: number = 1.5;
    let timeout: ReturnType<typeof setTimeout>;

    return (
      e: React.ChangeEvent<
        | HTMLFormElement
        | HTMLInputElement
        | HTMLSelectElement
      >,
    ) => {
      const form = e.currentTarget.form;

      if (!form) return;

      clearTimeout(timeout);

      timeout = setTimeout(() => {
        onChange(form);
      }, timeInSeconds * 1000);
    };
  };

  return (
    <Wrapper>
      <Form className="form">
        <h5 className="form-title">search form</h5>
        <div className="form-center">
          {/* search position */}

          <FormRow
            type="search"
            name="search"
            defaultValue={search}
            onChange={debounce((form) => {
              submit(form);
            })}
          />
          <FormRowSelect
            labelText="job status"
            name="jobStatus"
            list={['all', ...Object.values(JobStatus)]}
            defaultValue={jobStatus}
            onChange={debounce((form) => {
              submit(form);
            })}
          />
          <FormRowSelect
            labelText="job type"
            name="jobType"
            list={['all', ...Object.values(JobType)]}
            defaultValue={jobType}
            onChange={(e) => {
              submit(e.currentTarget.form);
            }}
          />
          <FormRowSelect
            name="sort"
            defaultValue={sort}
            list={[...Object.values(JobSortBy)]}
            onChange={(e) => {
              submit(e.currentTarget.form);
            }}
          />

          <Link
            to="/dashboard/all-jobs"
            className="btn form-btn delete-btn"
          >
            Reset Search Values
          </Link>
        </div>
      </Form>
    </Wrapper>
  );
};

export default SearchContainer;
