import * as React from 'react';
import Pagination from 'react-bootstrap/Pagination';

export interface Pagination {
  activePage: number;
  numberOfPages: number;
  changePage: (page: number) => void;
}

export const AdvancedPagination: React.FC<Pagination> = ({ activePage, numberOfPages, changePage }) => {
  if (numberOfPages === 0 || numberOfPages === 1) {
    return (
      <Pagination className="mb-4">
        <Pagination.Prev />
        <Pagination.Item key={1} active>{1}</Pagination.Item>
        <Pagination.Next />
      </Pagination>
    )
  }

  if (numberOfPages === 2) {
    return (
      <Pagination className="mb-4">
        <Pagination.Prev onClick={()=> changePage(activePage - 1)} disabled={activePage === 1} />
        <Pagination.Item onClick={()=> changePage(1)} key={1} active={activePage === 1}>{1}</Pagination.Item>
        <Pagination.Item onClick={()=> changePage(2)} key={2} active={activePage === 2}>{2}</Pagination.Item>
        <Pagination.Next onClick={()=> changePage(activePage + 1)} disabled={activePage === 2} />
      </Pagination>
    )
  }

  let paginations = [];

  if (numberOfPages > 2 && numberOfPages <= 10) {
    
    for (let i = 1; i < numberOfPages; i++) {
      paginations.push(<Pagination.Item onClick={()=> changePage(i + 1)} key={i + 1} active={activePage === i + 1}>{i + 1}</Pagination.Item>)
    }

    return (
      <Pagination className="mb-4">
        <Pagination.First onClick={()=> changePage(1)} disabled={activePage === 1} />
        <Pagination.Prev onClick={()=> changePage(activePage - 1)} disabled={activePage === 1} />
        <Pagination.Item onClick={()=> changePage(1)} key={1} active={activePage === 1}>{1}</Pagination.Item>
        {paginations}
        <Pagination.Next onClick={()=> changePage(activePage + 1)} disabled={activePage === numberOfPages} />
        <Pagination.Last onClick={()=> changePage(numberOfPages)} disabled={activePage === numberOfPages} />
      </Pagination>
    );
  }
  
  for (let i = 1; i < 9; i++) {
    paginations.push(<Pagination.Item onClick={()=> changePage(i + 1)} key={i + 1} active={activePage === i + 1}>{i + 1}</Pagination.Item>)
  }

  return (
    <Pagination className="mb-4">
      <Pagination.First onClick={()=> changePage(1)} disabled={activePage === 1} />
      <Pagination.Prev onClick={()=> changePage(activePage - 1)} disabled={activePage === 1} />
      <Pagination.Item onClick={()=> changePage(1)} key={1} active={activePage === 1}>{1}</Pagination.Item>
      {paginations}
      <Pagination.Item onClick={()=> changePage(10)} key={10} active={activePage === 10}>{10}</Pagination.Item>
      <Pagination.Next onClick={()=> changePage(activePage + 1)} disabled={activePage === 10} />
      <Pagination.Last onClick={()=> changePage(10)} disabled={activePage === 10} />
    </Pagination>
  );
}
