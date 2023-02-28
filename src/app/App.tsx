import React, { ChangeEvent, useState } from "react";

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

  if (isLoading) {
    return <div>Data is loading...</div>;
  }

  if (error) {
    return <div> Unexpected error... </div>;
  }

  if (!data) {
    return <div>No data</div>;
  }

  return (
    <div>
      <EnhancedTable
        pageNumber={pageNumber}
        pageSize={pageSize}
        data={data.data}
        setPageSize={setPageSize}
        setPageNumber={setPageNumber}
        totalCount={data.totalCount}
        setQuery={setQuery}
        query={query}
      />
    </div>
  );
}

export default App;
