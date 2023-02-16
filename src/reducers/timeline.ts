import { WrapperState, WrapperStateTimeline } from "../types";

export enum TimelineReducationActionType {
  UPDATE = "UPDATE",
  REJECT = "REJECT",
}

export type TimelineReducerAction<T> = {
  type: T;
  payload: WrapperState;
};

export const timelineReducer = (
  state: WrapperStateTimeline,
  action: TimelineReducerAction<TimelineReducationActionType>
): WrapperStateTimeline => {
  switch (action.type) {
    case "UPDATE": {
      return typeof action.payload !== null
        ? [...state, action.payload]
        : [...state];
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
