/*! Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license. */
import '../../yamui';
import * as React from 'react';
import { NestableBaseComponentProps } from '../../util/BaseComponent/props';
import { CustomizableComponentProps, nullTheme } from '../Customizer';
import Block from '../Block';
import { FixedGridColumn, FixedGridRow, GutterSize } from '../FixedGrid';
import Heading from '../Heading';
import Text, { TextSize } from '../Text';
import { getClassNames } from './AsideSection.styles';
import { customizable } from '@uifabric/utilities';

export interface AsideSectionProps extends NestableBaseComponentProps {
  /**
   * The visual title of the aside section
   */
  title: string;

  /**
   * An actionable react component to the right of the title
   */
  action?: React.ReactNode;
}

/**
 * A section component to be used primarily for sidebar modules
 */
@customizable('AsideSection', ['theme'])
export default class AsideSection extends React.Component<AsideSectionProps & CustomizableComponentProps> {
  public render() {
    const { title, children, theme = nullTheme } = this.props;
    const classes = getClassNames({ theme });

    return (
      <div className="y-aside-section">
        <Block textSize={TextSize.SMALL}>
          <FixedGridRow className={classes.header} bottomSpacing={GutterSize.SMALL}>
            <FixedGridColumn>
              <Heading level="2" size="none">
                <Block bottomSpacing={GutterSize.XSMALL}>
                  <Text uppercase={true} bold={true}>
                    {title}
                  </Text>
                </Block>
              </Heading>
            </FixedGridColumn>
            {this.getActionColumn()}
          </FixedGridRow>
        </Block>
        <div>{children}</div>
      </div>
    );
  }

  private getActionColumn() {
    if (this.props.action) {
      return <FixedGridColumn fixed={true}>{this.props.action}</FixedGridColumn>;
    }

    return null;
  }
}
