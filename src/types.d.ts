import { ReactNode } from "react";

export type CellophaneValidationFn = (x?: any) => boolean;

export type CellophaneMapFn = (x?: any) => CellophaneWrapper<any>;

export type CellophaneTarget = ReactNode;

export type CacheState = {
  validated?: boolean | CellophaneValidationFn;
  data?: any;
};

export type WrapperStateTimeline = WrapperState[];

export type WrapperState = {
  validated?: boolean | CellophaneValidationFn;
  validatorFn?: CellophaneValidationFn;
  data?: any[] | Record<any, any>;
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
  accessorFn?: (x?: T) => any;
  validatorFn?: CellophaneValidationFn;
  initialState?: WrapperState | (() => WrapperState);
  timeline?: WrapperStateTimeline;
  (): any;
};
