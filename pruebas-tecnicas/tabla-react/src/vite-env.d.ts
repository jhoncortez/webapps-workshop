/// <reference types="vite/client" />



export interface User {
  name: {
    first: string;
    last: string;
  };
  email: string;
  location: {
    city: string;
    country: string;
  };
  picture: {
    large: string;
    medium: string;
    thumbnail: string;
  };
  login: {
    uuid: string;
  };
}
export interface TableDataContextType {
    veryInitialData: {current: ApiResponse};
    setInitialTableData: ( data: ApiResponse | extendedApiResponse) => void;
    filteredData: User[] | [];
    searchTerm: string;
    setSearchTerm: (term: string) => void;
  }
 export interface ApiResponse {
    results?: User[] | [];
  }
export interface extendedApiResponse extends ApiResponse {
  (prevData: ApiResponse): ApiResponse
  }