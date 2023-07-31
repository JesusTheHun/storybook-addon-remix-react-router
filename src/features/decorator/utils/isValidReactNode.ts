import React from 'react';
import { hasOwnProperty } from '../../../utils/misc';

export function isValidReactNode(e: unknown): e is React.ReactNode {
  if (React.isValidElement(e)) return true;

  switch (true) {
    case React.isValidElement(e):
    case typeof e === 'string':
    case typeof e === 'number':
    case typeof e === 'boolean':
    case e === null:
    case e === undefined:
    case e instanceof Object && hasOwnProperty(e, Symbol.iterator):
      return true;
  }

  return false;
}
