/*! Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license. */
import { palette } from '../../util/colors';
import { TooltipProps } from './Tooltip';
import { borderRadiusSoft, fontSizeSmall, lineHeightSmall } from '../../util/styles';
import { ITooltipStyles } from 'office-ui-fabric-react/lib/components/Tooltip/Tooltip.types';
import { ICalloutContentStyles } from 'office-ui-fabric-react/lib/components/Callout/Callout.types';

export const getTooltipStyles = (_: TooltipProps): ITooltipStyles => {
  return {
    root: {
      lineHeight: lineHeightSmall,
    },
    content: {
      display: 'inline-block',
    },
    subText: {
      fontSize: fontSizeSmall,
      color: palette.white,
    },
  };
};

export const getCalloutStyles = (_: TooltipProps): ICalloutContentStyles => {
  return {
    container: {
      backgroundColor: 'inherit',
    },
    root: {
      backgroundColor: 'inherit',
      boxShadow: 'none',
      padding: '0.7rem 1.2rem 0.8rem',
      minHeight: '3.2rem',
      zIndex: 1000,
      border: 'none',
    },
    beak: {
      backgroundColor: palette.neutralPrimary,
    },
    beakCurtain: {
      backgroundColor: palette.neutralPrimary,
      borderRadius: borderRadiusSoft,
    },
    calloutMain: {
      backgroundColor: palette.neutralPrimary,
    },
  };
};
