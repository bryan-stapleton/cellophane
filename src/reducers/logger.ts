enum LoggerReducerActionType {}

export type LogState = {
  data: any[];
};

export type LoggerReducerAction<T> = {
  type: T;
  payload: any;
};

export const logReducer = (
  state: LogState,
  action: LoggerReducerAction<LoggerReducerActionType>
) => {};
