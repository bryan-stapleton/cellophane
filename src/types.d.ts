import { ReactNode } from "react";

export type CellophaneValidationFn = (x?: any) => boolean;

export type CellophaneTarget = ReactNode;

export type CacheState = {
  validated?: boolean | CellophaneValidationFn;
  data?: any;
};

export type WrapperStateTimeline = WrapperState[];

export type WrapperState = {
  validated?: boolean | CellophaneValidationFn;
  validatorFn?: CellophaneValidationFn;
  persist?: boolean;
  data?: any[] | Record<any, any>;
  cache?: CacheState | null;
};

export type CellophaneWrapperProps = {
  target: CellophaneTarget;
  initialState?: WrapperState;
  callback?: () => any | void;
};

export interface CellophaneWrappedObject<T> {
  identity: () => T;
  children: ReactNode[];
  (): any;
}

export type CellophaneWrapper<T> = {
  identity: () => T;
  callback?: () => any;
  children: () => ReactNode;
  accessorFn?: (x?: T) => any;
  validatorFn?: CellophaneValidationFn;
  initialState?: WrapperState | (() => WrapperState);
  timeline?: WrapperStateTimeline;
  (): any;
};