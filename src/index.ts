import { useState, useEffect, useMemo, ReactNode, useReducer } from "react";
import { z } from "zod";
import {
  TimelineReducationActionType,
  timelineReducer,
} from "./reducers/timeline";
import { CacheState, CellophaneWrapper, CellophaneWrapperProps } from "./types";

export default function useCellophane({
  target,
  initialState,
  callback,
}: CellophaneWrapperProps): CellophaneWrapper<typeof target> {
  const [timeline, dispatch] = useReducer(timelineReducer, [initialState]);

  let wrapper = useMemo(
    function () {
      return function () {
        return typeof callback === "function" ? callback() : typeStasis;
      };
    },
    [target]
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

  useEffect(() => {
    dispatch({
      type: TimelineReducationActionType.UPDATE,
      payload: { data: ["test"] },
    });
  }, [cache]);

  wrapper["identity"] = () => typeof typeStasis;
  wrapper["children"] = () => typeStasis;
  wrapper["timeline"] = [initialState];

  useEffect(() => {
    console.log(Object.keys(wrapper));
  }, []);


  return wrapper as CellophaneWrapper<typeof target>;
}
