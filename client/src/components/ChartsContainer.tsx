import BarChart from './BarChart';
import AreaChart from './AreaChart';
import Wrapper from '../assets/wrappers/ChartsContainer';
import { useState } from 'react';
import type { MonthlyJobApplication } from '../types';

interface Props {
  data: MonthlyJobApplication[];
}

const ChartsContainer = ({ data }: Props) => {
  const [barChart, setBarChart] = useState<boolean>(true);

  return (
    <Wrapper>
      <h4>Monthly Applications</h4>
      <button
        type="button"
        onClick={() => setBarChart(!barChart)}
      >
        {barChart ? 'Area Chart' : 'Bar Chart'}
      </button>
      {barChart ? (
        <BarChart data={data} />
      ) : (
        <AreaChart data={data} />
      )}
    </Wrapper>
  );
};

export default ChartsContainer;
