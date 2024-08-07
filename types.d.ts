export interface ActionResponse {
  type: "SUCCESS" | "ERROR";
  message: string;
}

export interface PrevStateProps {
  type: string;
  message: string;
}
