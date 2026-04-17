interface OpeningHours {
    day: string;
    start: string;
    end: string;
  }

  interface Store {
    id: number;
    name: string;
    address: string;
    latitude: number;
    longitude: number;
    hours: string;
    openingHours: OpeningHours[];
    imageUrl: string;
  }
  
  interface StoresResponse {
    stores: Store[];
    total: number
    offset: number
  }
  

  export {Store, StoresResponse, OpeningHours}