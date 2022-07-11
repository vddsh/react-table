import {useEffect, useMemo, useState} from 'react';

const useTable = ({data, columns, pagination}) => {
  const [pageIndex, setPageIndex] = useState(0);

  const headers = useMemo(() => columns.map(column => ({
    label: column.label
  })), [columns]);

  const rawRows = pagination
    ? data.slice(pageIndex * pagination.pageSize, (pageIndex + 1) * pagination.pageSize)
    : data;

  const rows = useMemo(() => {
    return rawRows.map(dataRow => {
      const cells = columns.map(({accessor}) => {
        const renderedValue = typeof accessor === 'function' ? accessor(dataRow) : dataRow[accessor];
        return {renderedValue};
      });
      return {cells};
    });
  }, [data, columns, pageIndex, pagination?.pageSize]);

  const totalPages = Math.ceil(data.length / pagination.pageSize);

  const nextPage = () => {
    setPageIndex(Math.min(pageIndex + 1, totalPages - 1));
  };

  const previousPage = () => {
    setPageIndex(Math.max(pageIndex - 1, 0));
  };

  useEffect(() => {
    if (pageIndex > totalPages - 1) {
      setPageIndex(totalPages - 1)
    }
  }, [pageIndex, data]);

  return {
    headers,
    rows,
    pagination: {
      nextPage,
      previousPage,
      pageNumber: pageIndex + 1,
      totalPages,
    }
  };
};

export default useTable;