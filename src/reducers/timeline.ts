import { WrapperState, WrapperStateTimeline } from "../types";

enum TimelineReducationActionType {
  UPDATE = "UPDATE",
  REJECT = "REJECT",
}

export type TimelineReducerAction<T> = {
  type: T;
  payload: WrapperState | null | undefined;
};

export const timelineReducer = (
  state: WrapperStateTimeline,
  action: TimelineReducerAction<TimelineReducationActionType>
) => {};
