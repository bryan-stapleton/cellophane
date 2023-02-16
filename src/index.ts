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

  /*
  we typecast here because we know more than typescript does. Functions and objects both extend the object prototype which can be assigned keys in a similar fashion
  to a dictionary. Those keys can be other functions which behave like methods. We know we've assigned those keys which makes the shape of wrapper consistent with
  the intended CellophaneWrapper<typeof target> but typescript will throw an error because it only interprets the original function.
  */
  return wrapper as CellophaneWrapper<typeof target>;
}
