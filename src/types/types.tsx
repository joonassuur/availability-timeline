export interface ReturnedDataTypes {
  availabilityBars: string[];
  minutesArray: any[];
}
export interface TempStruct {
  minute: any;
  availability: string;
  time: any;
}
export interface DataStruct {
  data: any[];
  unavailable: object;
}

export interface MouseCoords {
  xCoord?: number;
  yCoord?: number;
}
export interface DataBarProps {
  projectName: string;
  minutesArray: any[];
  availabilityBars: string[];
}

export interface HoverElementProps {
  mouseLocation: MouseCoords;
  hoverDetails: String;
  notAvailableTime: String;
  notAvailableDetails: NotAvailable;
}
export type NotAvailable =  TempStruct[];
