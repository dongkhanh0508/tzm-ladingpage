export interface Store {
    id: number;
    name: string;
    wkt: string;
    createDate: Date;
    brandId: number;
    address: string;
    brandName: string;
    type: string;
    status: number;
    storeStreetSegments: any[];
    abilityToServe: number;
    timeSlot: string;
    geom: Geom;
    storeTypeName: string;
}

export interface Geom {
    type: string;
    coordinates: number[];
}