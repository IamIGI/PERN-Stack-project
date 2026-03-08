import Wrapper from '../assets/wrappers/JobInfo';

interface Props {
  icon: React.ComponentType;
  text: string;
}

const JobInfo = ({ icon: Icon, text }: Props) => {
  return (
    <Wrapper>
      <span className="job-icon">
        <Icon />
      </span>
      <span className="job-text">{text}</span>
    </Wrapper>
  );
};

export default JobInfo;
