import { WrapperState, WrapperStateTimeline } from "../../types";

export enum TimelineReducerActionType {
  UPDATE = "UPDATE",
  REJECT = "REJECT",
}

export type TimelineReducerAction<TimelineReducerActionType> = {
  type: TimelineReducerActionType;
  payload: WrapperState;
};

export const timelineReducer = (
  state: WrapperStateTimeline,
  action: TimelineReducerAction<TimelineReducerActionType>
): WrapperStateTimeline => {
  switch (action.type) {
    case "UPDATE": {
      return typeof action.payload !== null || undefined
        ? [...state, action.payload]
        : state;
    }
    case "REJECT": {
      console.log("rejected");
      return state;
    }
    default: {
      throw new Error("Error: Type or input mismatch");
    }
  }
};
