export interface IResponse {
  data: IResult[];
  totalCount: number;
}

export interface IResult {
  id: string;
  description: string;
  title: string;
  year: string;
}

export type Order = "asc" | "desc";
