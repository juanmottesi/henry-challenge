import '@testing-library/jest-dom';
import { render, screen, within } from '@testing-library/react';

import LeaderboardCard from '@/components/LeaderboardCard';

describe('LeaderboardCard', () => {
  it('empty render', () => {
    render(<LeaderboardCard tours={[]} />);

    const selectTour = document.getElementById('Tour')!!;
    const selectSeason = document.getElementById('Season')!!;

    expect(within(selectTour).getByText('Tour')).toBeInTheDocument();
    expect(within(selectSeason).getByText('Season')).toBeInTheDocument();

    expect(screen.getAllByRole('columnheader')).toHaveLength(6);
    expect(screen.getAllByRole('row')).toHaveLength(1);
    expect(screen.getByRole('row')).toHaveTextContent('#');
    expect(screen.getByRole('row')).toHaveTextContent('name');
    expect(screen.getByRole('row')).toHaveTextContent('# of wins');
    expect(screen.getByRole('row')).toHaveTextContent(`# of top 10's`);
    expect(screen.getByRole('row')).toHaveTextContent('# of events');

    expect(screen.getByText('Select tournament and season.')).toBeInTheDocument();
  });
});
