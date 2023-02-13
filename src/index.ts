import { useState, useEffect, useMemo, ReactNode } from "react";
import { z } from "zod";
import { CacheState, CellophaneWrapper, CellophaneWrapperProps } from "./types";

export default function useCellophane({
  target,
  initialState,
  callback,
}: CellophaneWrapperProps): CellophaneWrapper<typeof target> {
  let wrapper = useMemo(
    function () {
      return function () {
        return typeof callback === "function" ? callback() : typeStasis;
      };
    },
    [target]
  );
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

  /*
  we typecast here because we know more than typescript does. Functions and objects both extend the object prototype which can be assigned keys in a similar fashion
  to a dictionary. Those keys can be other functions which behave like methods. We know we've assigned those keys which makes the shape of wrapper consistent with
  the intended CellophaneWrapper<typeof target> but typescript will throw an error because it only interprets the original function.
  */
  return wrapper as CellophaneWrapper<typeof target>;
}
