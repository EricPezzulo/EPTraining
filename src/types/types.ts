export interface ClientDataProps {
  id: number;
  created_at: string;
  firstName: string;
  lastName: string;
  middleInital: string | null;
  weight: number | null;
  height: number | null;
  phoneNumber: string | null;
  activeClientStatus: boolean | null;
  nextSession: string | null;
  currentPTM: string | null;
  totalSessions: string | null;
  firstSession: string | null;
  clientPicture: string | null;
  clientId: string;
  username: string | null;
  schedule: any[] | null;
  description: string | null;
  bodyFatPercentage: number | null;
  clientEmail: string | null;
  age: string | null;
  DOB: string | null;
}
export type ClientListProps = ClientDataProps[];

export type Session = {
  sessionType: string;
  sessionDate: string;
};

export type Schedule = {
  sessions: Session[];
};
export interface User {
  firstName: string;
  lastName: string;
  middleInitial: string;
  description: string;
  clientEmail: string | null;
  age: number | null;
  DOB?: string | undefined;
  bodyFatPercentage: number | null;
  weight: number | null;
  height: string | null;
  phoneNumber: string | null;
  activeClientStatus: boolean;
  nextSession: string | null;
  currentPTM: string;
  schedule?: Schedule[];
  totalSessions: number;
  firstSession: string;
  clientPicture: string;
  clientId: string;
}

export type Params = {
  client: string;
};
export type ClientPageProps = {
  params: Params;
};
