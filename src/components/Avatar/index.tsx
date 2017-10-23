/*! Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license. */
import '../../yamui';
import * as React from 'react';
import { Persona, PersonaSize } from 'office-ui-fabric-react/lib/Persona';
import { BaseComponentProps } from '../../util/BaseComponent/props';
import ScreenreaderText from '../ScreenreaderText';
import { AvatarBorderType, AvatarSize } from './enums';
import './avatar.css';

export { AvatarBorderType, AvatarSize };

const SizeMap = {
  [AvatarSize.XLARGE]: PersonaSize.large,
  [AvatarSize.LARGE]: PersonaSize.regular,
  [AvatarSize.MEDIUM]: PersonaSize.small,
  [AvatarSize.SMALL]: PersonaSize.extraSmall,
  [AvatarSize.XSMALL]: PersonaSize.extraExtraSmall,
};

export interface BaseAvatarProps extends BaseComponentProps {
  /**
   * Image source URL.
   */
  imageUrl?: string;

  /**
   * 2 letters to be displayed if an imageUrl wasn't provided.
   */
  initials?: string;

  /**
   * The name of the person or object being represented. Will be used as accessible alt text.
   */
  name: string;

  /**
   * Image, SVG, icon, etc. You can set its height and width to fill the available area.
   */
  badgeContent?: React.ReactNode;

  /**
   * A short accessible description of the badge. Will be appended to name if provided.
   */
  badgeDescription?: string;

  /**
   * Round or soft border. Defaults to round.
   */
  borderType?: AvatarBorderType;

  /**
   * XLARGE: 72px, LARGE: 48px, MEDIUM: 40px, SMALL: 32px, XSMALL: 24px. Defaults to medium.
   */
  size?: AvatarSize;
}
export interface ImageAvatarProps extends BaseAvatarProps {
  /**
   * Image source URL.
   */
  imageUrl: string;
}
export interface InitialsAvatarProps extends BaseAvatarProps {
  /**
   * 2 letters to be displayed if an imageUrl wasn't provided.
   */
  initials: string;
}

// AvatarProps requires either imageUrl OR initials
export type AvatarProps = ImageAvatarProps | InitialsAvatarProps;

export default class Avatar extends React.PureComponent<AvatarProps, {}> {
  static defaultProps: Partial<AvatarProps> = {
    borderType: AvatarBorderType.ROUND,
    size: AvatarSize.MEDIUM,
  };

  render() {
    const personaSize = SizeMap[this.props.size as string];

    const badge = this.props.badgeContent && (
      <div className={`y-avatar--badge y-avatar__size-${this.props.size}--badge`}>
        {this.props.badgeContent}
      </div>
    );

    return (
      <div className={this.getClasses()}>
        <Persona
          imageUrl={this.props.imageUrl}
          imageInitials={this.getInitials()}
          size={personaSize}
          hidePersonaDetails={true}
          primaryText={this.props.name}
        />
        {badge}
        <ScreenreaderText>{this.getAccessibleText()}</ScreenreaderText>
      </div>
    );
  }

  private getInitials() {
    if (!this.props.initials) {
      return;
    }

    if (this.props.size === AvatarSize.XSMALL) {
      return this.props.initials.substring(0, 1);
    } else {
      return this.props.initials.substring(0, 2);
    }
  }

  private getAccessibleText() {
    const { name, badgeDescription } = this.props;
    if (badgeDescription) {
      return `${name} - ${badgeDescription}`;
    }
    return name;
  }

  private getClasses() {
    const classes: string[] = ['y-avatar', `y-avatar__size-${this.props.size}`];
    if (this.props.borderType !== Avatar.defaultProps.borderType) {
      classes.push(`y-avatar__borderType-${this.props.borderType}`);
    }
    if (this.props.className) {
      classes.push(this.props.className);
    }
    return classes.join(' ');
  }
}
