import { IResult } from "src/model/model";

export const getData = async (
  curPage: number,
  count: number,
  query: string
) => {
  try {
    return new Promise((resolve) => setTimeout(resolve, 0)).then(async () => {
      const response = await fetch("data.json");
      const data: IResult[] = await response.json();
      const filtered = data.filter(
        (item) => item.title.includes(query) || item.description.includes(query)
      );

      return {
        data: filtered.slice(curPage * count, (curPage + 1) * count),
        totalCount: filtered.length,
      };
    });
  } catch (e) {
    console.log(e);
  }
};
