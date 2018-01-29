/*! Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license. */
import '../../yamui';
import * as React from 'react';
import { NestableBaseComponentProps } from '../../util/BaseComponent/props';
import { join } from '../../util/classNames';
import Block, { GutterSize } from '../Block';
import './Box.css';

export interface BoxProps extends NestableBaseComponentProps {
  onClick?: (() => void);
}

/**
 * A Box is a div with a border and fixed padding. It also has `display: relative` so you can
 * absolutely-position elements like a close button. Boxes will primarily be used for card views.
 */
export default class Box extends React.Component<BoxProps, {}> {
  public render() {
    const { children, className, onClick } = this.props;

    return (
      <div
        className={join(['y-box', className])}
        onClick={onClick}
        role={onClick ? 'button' : undefined}
      >
        <Block className="y-box--inner" padding={GutterSize.SMALL}>
          {children}
        </Block>
      </div>
    );
  }
}
