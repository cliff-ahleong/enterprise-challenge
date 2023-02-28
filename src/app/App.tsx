import React, { useState } from "react";

import { useQuery } from "@tanstack/react-query";
import { getData } from "src/services/api";

import { EnhancedTable } from "src/components/Table";

function App() {
  const [pageNumber, setPageNumber] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(10);
  const [query, setQuery] = React.useState<string>("");

  const { isLoading, error, data } = useQuery({
    queryKey: ["getData", pageNumber, pageSize, query],
    queryFn: () => getData(pageNumber, pageSize, query),
  });

  console.log(query);

  if (error) {
    return <div> Unexpected error... </div>;
  }

  if (!data) {
    return (
      <EnhancedTable
        pageNumber={pageNumber}
        pageSize={pageSize}
        data={[]}
        setPageSize={setPageSize}
        setPageNumber={setPageNumber}
        totalCount={0}
        setQuery={setQuery}
        query={query}
        isLoading={isLoading}
      />
    );
  }

  return (
    <EnhancedTable
      pageNumber={pageNumber}
      pageSize={pageSize}
      data={data.data}
      setPageSize={setPageSize}
      setPageNumber={setPageNumber}
      totalCount={data.totalCount}
      setQuery={setQuery}
      query={query}
      isLoading={isLoading}
    />
  );
}

export default App;
