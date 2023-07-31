import React from 'react';
import { isValidReactNode } from './isValidReactNode';

describe('isValidReactNode', () => {
  it('should return true when a JSX element is given', () => {
    expect(isValidReactNode(<div />)).toBe(true);
  });

  it('should return true when `null` is given', () => {
    expect(isValidReactNode(null)).toBe(true);
  });

  it('should return true when `undefined` is given', () => {
    expect(isValidReactNode(undefined)).toBe(true);
  });

  it('should return true when a string is given', () => {
    expect(isValidReactNode('hello')).toBe(true);
  });

  it('should return true when a number is given', () => {
    expect(isValidReactNode(42)).toBe(true);
  });

  it('should return true when a React.Fragment is given', () => {
    expect(isValidReactNode(<></>)).toBe(true);
  });
});
