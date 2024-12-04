import { ReactNode } from "react";

export type CellophaneValidationFn<T> = (x?: T) => boolean;

export type CellophaneMapFn = (x?: any) => CellophaneWrapper<any>;

export type CellophaneTarget = ReactNode;

export type CacheState = {
  validated?: boolean | CellophaneValidationFn<any>;
  data?: any;
};

export type WrapperStateTimeline = WrapperState[];

export type WrapperState = {
  validated?: boolean | CellophaneValidationFn<unknown>;
  validatorFn?: CellophaneValidationFn<unknown>;
  data?: Record<any, any>;
  cache?: CacheState | null;
};

export type CellophaneWrapperProps = {
  target: CellophaneTarget;
  initialState: WrapperState;
  callback?: () => any | void;
};

export type CellophaneWrapper<T> = {
  identity: () => T;
  callback?: () => any;
  children: () => CellophaneTarget;
  accessorFn?: (x?: keyof T) => void;
  validatorFn?: CellophaneValidationFn<T>;
  initialState?: WrapperState | (() => WrapperState);
  timeline?: WrapperStateTimeline;
  (): any;
};
