/*! Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license. */
import * as React from 'react';
import Block, { TextSize, GutterSize } from '../Block';
import Text, { TextColor } from '../Text';
import { MediaObjectSize } from './enums';

export { MediaObjectSize };

const BlockPushMap = {
  [MediaObjectSize.XLARGE]: -1,
  [MediaObjectSize.LARGE]: 3,
  [MediaObjectSize.MEDIUM]: 3,
  [MediaObjectSize.SMALL]: 0,
  [MediaObjectSize.XSMALL]: 0,
};

export interface MediaObjectMetadataProps {
  size: MediaObjectSize;
}

const MediaObjectMetadata: React.StatelessComponent<MediaObjectMetadataProps> = props => (
  <Block
    className="y-media-object--metadata"
    textSize={TextSize.SMALL}
    push={BlockPushMap[props.size]}
  >
    <Text color={TextColor.METADATA}>{props.children}</Text>
  </Block>
);

export default MediaObjectMetadata;
