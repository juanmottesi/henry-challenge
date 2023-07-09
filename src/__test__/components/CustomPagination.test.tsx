import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';

import CustomPagination from '@/components/CustomPagination';

describe('CustomPagination', () => {
  it('render', () => {
    const page = render(<CustomPagination page={1} sizePerPage={10} onPageChange={jest.fn} totalSize={100} />);

    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(2);

    expect(screen.getByAltText('prev')).toBeInTheDocument();
    expect(screen.getByAltText('next')).toBeInTheDocument();
    
    const texts = page.container.getElementsByClassName('textContainer');
    expect(texts).toHaveLength(2);
    expect(texts[0]).toHaveTextContent('1de10');
    expect(texts[1]).toHaveTextContent('100items');
  });

  it('onPageChange go prev', () => {
    const onClick = jest.fn();
    render(<CustomPagination page={2} sizePerPage={10} onPageChange={onClick} totalSize={100} />);
    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(2);
    fireEvent.click(buttons[0]);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('onPageChange go prev do not call the function if the page is the first one', () => {
    const onClick = jest.fn();
    render(<CustomPagination page={1} sizePerPage={10} onPageChange={onClick} totalSize={100} />);
    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(2);
    fireEvent.click(buttons[0]);
    expect(onClick).toHaveBeenCalledTimes(0);
  });

  it('onPageChange go next', () => {
    const onClick = jest.fn();
    render(<CustomPagination page={1} sizePerPage={10} onPageChange={onClick} totalSize={100} />);
    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(2);
    fireEvent.click(buttons[1]);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('onPageChange go next do not call the function if the page is the last one', () => {
    const onClick = jest.fn();
    render(<CustomPagination page={10} sizePerPage={10} onPageChange={onClick} totalSize={100} />);
    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(2);
    fireEvent.click(buttons[1]);
    expect(onClick).toHaveBeenCalledTimes(0);
  });

});
