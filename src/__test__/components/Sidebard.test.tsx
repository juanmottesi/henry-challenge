import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import Sidebar from '@/components/Sidebar';

describe('Sidebar', () => {
  it('render henry image', () => {
    render(<Sidebar />);

    const henryImg = screen.getByAltText('Henry challenge');

    expect(henryImg).toBeInTheDocument();
    
  });

  it('render sidebar items', () => {
    render(<Sidebar />);

    const buttons = screen.getAllByRole('button');

    expect(buttons).toHaveLength(1);
  })
});
