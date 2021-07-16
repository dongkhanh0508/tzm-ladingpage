import React from 'react';
import PropTypes from 'prop-types';
import Ripple from 'material-ripple-effects';

const Colors = {
  blueGray: 'bg-blue-gray-500',
  gray: 'bg-gray-500',
  brown: 'bg-brown-500',
  deepOrange: 'bg-deep-orange-500',
  orange: 'bg-orange-500',
  amber: 'bg-amber-500',
  yellow: 'bg-yellow-600',
  lime: 'bg-lime-500',
  lightGreen: 'bg-light-green-500',
  green: 'bg-green-500',
  teal: 'bg-teal-500',
  cyan: 'bg-cyan-500',
  lightBlue: 'bg-light-blue-500',
  blue: 'bg-blue-500',
  indigo: 'bg-indigo-500',
  deepPurple: 'bg-deep-purple-500',
  purple: 'bg-purple-500',
  pink: 'bg-pink-500',
  red: 'bg-red-500',
};

const ShadowColors = {
  blueGray: 'shadow-md-blue-gray',
  gray: 'shadow-md-gray',
  brown: 'shadow-md-brown',
  deepOrange: 'shadow-md-deep-orange',
  orange: 'shadow-md-orange',
  amber: 'shadow-md-amber',
  yellow: 'shadow-md-yellow',
  lime: 'shadow-md-lime',
  lightGreen: 'shadow-md-light-green',
  green: 'shadow-md-green',
  teal: 'shadow-md-teal',
  cyan: 'shadow-md-cyan',
  lightBlue: 'shadow-md-light-blue',
  blue: 'shadow-md-blue',
  indigo: 'shadow-md-indigo',
  deepPurple: 'shadow-md-deep-purple',
  purple: 'shadow-md-purple',
  pink: 'shadow-md-pink',
  red: 'shadow-md-red',
};

export function DropdownItemCustom({ children, color,selected ,ripple, className, ...rest }) {
  const rippleEffect = new Ripple();

  return (
    <span
      {...rest}
      className={`${selected && Colors[color] +' '+ShadowColors[color]} block w-full text-sm py-3 px-4 font-normal cursor-pointer whitespace-no-wrap rounded-md text-gray-900`}
      onMouseUp={(e) => {
        ripple === 'dark' && rippleEffect.create(e, 'dark');
        ripple === 'light' && rippleEffect.create(e, 'light');
      }}
    >
      {children}
    </span>
  );
}

DropdownItemCustom.defaultProps = {
  color: 'lightBlue'
};

DropdownItemCustom.propTypes = {
  children: PropTypes.node.isRequired,
  color: PropTypes.string.isRequired,
  ripple: PropTypes.string,
  selected: PropTypes.bool,
};
