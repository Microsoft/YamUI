/*! Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license. */
import '../../yamui';
import * as React from 'react';
import { BaseComponentProps } from '../../util/BaseComponent/props';
import { join } from '../../util/classNames';
import Block, { GutterSize, TextColor, TextSize } from '../Block';
import Box from '../Box';
import Clickable from '../Clickable';
import EditableText from '../EditableText';
import RemoveIcon from '../Icon/icons/Cancel';
import { IconSize } from '../Icon';
import Image from '../Image';
import MediaObject, { MediaObjectProps, MediaObjectSize } from '../MediaObject';
import ProgressIndicator from '../ProgressIndicator';
import Spinner, { SpinnerColor, SpinnerSize } from '../Spinner';
import './PreviewCard.css';

export interface PreviewCardProps extends BaseComponentProps {
  /**
   * The name of the file or entity being represented. This will be displayed as the title.
   */
  name: string;

  /**
   * Description of the file.
   */
  description?: string;

  /**
   * Whether the description can be edited or not.
   */
  isDescriptionEditable?: boolean;

  /**
   * Will display on the left of the PreviewCard. If not provided the image will be replaced
   * by an icon depending on the file type.
   */
  imageUrl?: string;

  /**
   * The alt text to be displayed for the image.
   */
  imageDescription?: string;

  /**
   * If true will display a Spinner, or a ProgressIndicator if progress is also provided.
   * Note that the loading Spinner will be displayed in place of the description.
   */
  isLoading?: boolean;

  /**
   * A string to describe the loading state. If you've provided a progress value then
   * this string should also include that percentage.
   */
  loadingText?: string;

  /**
   * Percentage between 0 and 1. If provided, will replace the loading Spinner with
   * a ProgressIndicator to show the percentage.
   */
  progress?: number;

  /**
   * The text to display when the description is editable and currently empty.
   */
  emptyEditableDescriptionText?: string;

  /**
   * An optional max length for the description field when editing.
   */
  descriptionMaxLength?: number;

  /**
   * Triggered when the PreviewCard is clicked. This will not be triggered for clicks on the Remove icon
   * or to edit the description.
   */
  onClick?: (() => void);

  /**
   * AriaLabel value describing the onClick action.
   */
  clickAriaLabel?: string;

  /**
   * Triggered when the Remove icon is clicked.
   */
  onRemoveClick?: (() => void);

  /**
   * Alt text for the Remove button
   */
  removeAriaLabel?: string;

  /**
   * Returns the new description string when updated.
   */
  onDescriptionChange?: ((description: string) => void);
}

export interface PreviewCardState {
  isEditing: boolean;
}

/**
 * PreviewCard is a compact representation of an uploaded file or other attachment. It supports an
 * editable description, and a loading experience (Spinner or percentage ProgressIndicator).
 */
export default class PreviewCard extends React.Component<PreviewCardProps, PreviewCardState> {
  constructor(props: PreviewCardProps) {
    super(props);
    this.state = {
      isEditing: false,
    };
  }

  public render() {
    const mediaObjectProps: MediaObjectProps = {
      size: MediaObjectSize.MEDIUM,
      className: 'y-previewCard--media',
      imageContent: this.getImageContent(),
      titleContent: this.getNameContent(),
      metadataContent: this.getDescriptionContent(),
    };

    const onClick = this.allowOnClick() ? this.props.onClick : undefined;

    return (
      <Box className={this.getClassnames()} onClick={onClick}>
        <MediaObject {...mediaObjectProps} />
        {this.getRemoveButton()}
        {this.getProgressIndicator()}
      </Box>
    );
  }

  private getClassnames() {
    const classes = ['y-previewCard', this.props.className];
    if (this.allowOnClick()) {
      classes.push('y-previewCard__hasClick');
    }
    return join(classes);
  }

  // Allow onClick callback and hover styling if onClick prop was provided and we're not in edit mode
  private allowOnClick(): boolean {
    return !!this.props.onClick && !this.state.isEditing;
  }

  private getNameContent() {
    const { name, onClick, clickAriaLabel } = this.props;
    const size = this.state.isEditing ? TextSize.XSMALL : undefined;
    // Note that the actual onClick handler is on the outer Box wrapper,
    // while the clickAriaLabel is here on the keyboard-tabbable element.
    const content = onClick ? (
      <Clickable ariaLabel={clickAriaLabel} unstyled={true}>
        {name}
      </Clickable>
    ) : (
      name
    );
    return <Block textSize={size}>{content}</Block>;
  }

  private getRemoveButton() {
    const { onRemoveClick, removeAriaLabel } = this.props;
    if (onRemoveClick) {
      return (
        <span className="y-previewCard--remove">
          <Clickable onClick={this.handleRemoveClick} unstyled={true} ariaLabel={removeAriaLabel} block={true}>
            <Block padding={GutterSize.SMALL}>
              <RemoveIcon size={IconSize.XSMALL} block={true} />
            </Block>
          </Clickable>
        </span>
      );
    }

    return null;
  }

  private getProgressIndicator() {
    if (this.shouldShowProgressIndicator()) {
      const { loadingText, progress } = this.props;
      return (
        <ProgressIndicator
          className="y-previewCard--progress"
          ariaValueText={loadingText as string}
          percentComplete={progress as number}
        />
      );
    }

    return null;
  }

  private getImageContent(): React.ReactNode {
    const { imageUrl, imageDescription = '' } = this.props;
    if (imageUrl) {
      return <Image source={imageUrl} fullWidth={true} description={imageDescription} />;
    }

    return null;
  }

  private getDescriptionContent(): React.ReactNode {
    const { description, isDescriptionEditable } = this.props;
    if (this.shouldShowLoadingSpinner()) {
      return this.getLoadingSpinner();
    }

    if (isDescriptionEditable) {
      return this.getEditableText();
    }

    return description;
  }

  private getEditableText() {
    const { description, descriptionMaxLength, emptyEditableDescriptionText, onDescriptionChange } = this.props;
    const blockPush = this.state.isEditing ? -3 : 0;

    return (
      <Block push={blockPush} textColor={TextColor.METADATA}>
        <EditableText
          text={description}
          promptText={emptyEditableDescriptionText}
          placeHolder={emptyEditableDescriptionText}
          maxLength={descriptionMaxLength}
          onUpdate={onDescriptionChange}
          onBeginEditing={this.enterEditMode}
          onEndEditing={this.exitEditMode}
        />
      </Block>
    );
  }

  private getLoadingSpinner() {
    const { loadingText } = this.props;
    return (
      <Block textColor={TextColor.METADATA} className="y-previewCard--spinner" push={1}>
        <Spinner text={loadingText as string} size={SpinnerSize.XSMALL} color={SpinnerColor.METADATA} />
      </Block>
    );
  }

  private handleRemoveClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    (this.props.onRemoveClick as Function)();
  };

  private enterEditMode = () => {
    this.setState(() => ({ isEditing: true }));
  };

  private exitEditMode = () => {
    this.setState(() => ({ isEditing: false }));
  };

  private hasProgress() {
    return typeof this.props.progress === 'number';
  }

  private shouldShowLoadingSpinner() {
    return this.props.isLoading && !this.hasProgress();
  }

  private shouldShowProgressIndicator() {
    return this.props.isLoading && this.hasProgress();
  }
}
