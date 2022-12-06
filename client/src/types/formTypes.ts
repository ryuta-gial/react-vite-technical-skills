export interface users {
  isSignedIn?: boolean;
  orgCode: string | null;
  userId: string | null;
  userPass: string | null;
}

export interface loginState {
  user: {
    orgCode?: string;
    userId?: string;
    role?: string;
    orgName?: string;
  };
  isSignedIn: boolean;
  isInit?: boolean;
  vehicleList?: [];
}

export interface initialStateType {
  isSignedIn: boolean;
  orgCode: string;
  userId: string;
}

//セレクトボックスで利用する型
export interface setVehiclesStateTypes {
  value: string;
  label: string;
}
