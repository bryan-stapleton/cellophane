import { useState, useEffect, useMemo, ReactNode } from "react";
import { z } from "zod";

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

export default function useCellophane({
  target,
  initialState,
  callback,
}: CellophaneWrapperProps): CellophaneWrapper<typeof target> {
  let wrapper = useMemo(function () {
    return function () {
      return typeof callback === "function" ? callback() : typeStasis;
    };
  }, []);
  const [persist, togglePersist] = useState<boolean>(
    initialState?.persist || true
  );
  const [cache, setCache] = useState<CacheState | null>(
    initialState?.cache || null
  );

  let typeStasis = useMemo(() => {
    if (typeof target === undefined) {
      return;
    }
    return target;
  }, [target]);

  wrapper["identity"] = () => typeof typeStasis;
  wrapper["children"] = () => typeStasis;
  wrapper["timeline"] = [initialState];

  useEffect(() => {
    console.log(Object.keys(wrapper));
  }, []);

  return wrapper as CellophaneWrapper<typeof target>;
}
