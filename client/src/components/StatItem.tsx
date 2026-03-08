import Wrapper from '../assets/wrappers/StatItem';

interface Props {
  count: number;
  title: string;
  icon: React.ComponentType;
  color: string;
  bcg: string;
}

const StatItem = ({
  count,
  title,
  icon: Icon,
  color,
  bcg,
}: Props) => {
  return (
    <Wrapper color={color} bcg={bcg}>
      <header>
        <span className="count">{count}</span>
        <span className="icon">
          <Icon />
        </span>
      </header>
      <h5 className="title">{title}</h5>
    </Wrapper>
  );
};

export default StatItem;
