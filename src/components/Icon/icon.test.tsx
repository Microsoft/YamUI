/*! Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license. */
import * as React from 'react';
import { shallow, ShallowWrapper, mount, ReactWrapper } from 'enzyme';
import Icon, { IconProps, IconSize, ICONS } from './index';
import * as util from 'util';

describe('<Icon />', () => {
  let component: ShallowWrapper<IconProps, {}>;
  let fullComponent: ReactWrapper<IconProps, {}>;

  const icons = Object.keys(ICONS).map((icon) => {
    return icon;
  });

  describe('with minimal options', () => {
    beforeEach(() => {
      component = shallow(
        <Icon icon="attach" />,
      );
    });

    it('contains the correct SVG icon', () => {
      expect(component.find(ICONS['attach'])).toHaveLength(1);
    });

    it('contains its base className', () => {
      expect(component.hasClass('y-icon')).toBe(true);
    });

    it('is the default height', () => {
      expect(component.getNode().props.height).toBe(IconSize.MEDIUM + 'px');
    });

    it('is the default width', () => {
      expect(component.getNode().props.width).toBe(IconSize.MEDIUM + 'px');
    });

    it('matches its snapshot', () => {
      expect(component).toMatchSnapshot();
    });
  });

  describe('with color', () => {
    beforeEach(() => {
      component = shallow(
        <Icon icon="attach" color="blue" />,
      );
    });

    it('contains the given color style', () => {
      expect(component.getNode().props.style.color).toEqual('blue');
    });

    it('matches its snapshot', () => {
      expect(component).toMatchSnapshot();
    });
  });

  describe('with block', () => {
    beforeEach(() => {
      component = shallow(
        <Icon icon="attach" block />,
      );
    });

    it('contains its block className', () => {
      expect(component.hasClass('y-icon__isBlock')).toBe(true);
    });

    it('matches its snapshot', () => {
      expect(component).toMatchSnapshot();
    });
  });

  describe('with passed size value', () => {
    beforeEach(() => {
      component = shallow(
        <Icon icon="attach" size={IconSize.XXLARGE} />,
      );
    });

    it('is the correct height', () => {
      expect(component.getNode().props.height).toBe(IconSize.XXLARGE + 'px');
    });

    it('is the correct width', () => {
      expect(component.getNode().props.width).toBe(IconSize.XXLARGE + 'px');
    });

    it('matches its snapshot', () => {
      expect(component).toMatchSnapshot();
    });
  });

  describe('with additional className', () => {
    beforeEach(() => {
      component = shallow(
        <Icon icon="attach" className="TEST_CLASSNAME" />,
      );
    });

    it('includes that className', () => {
      expect(component.hasClass('TEST_CLASSNAME')).toBe(true);
    });

    it('still includes its base className', () => {
      expect(component.hasClass('y-icon')).toBe(true);
    });

    it('matches its snapshot', () => {
      expect(component).toMatchSnapshot();
    });
  });

  describe('each React component generated from SVG source', () => {
    it('renders without error', () => {
      icons.forEach((icon: any) => {
        fullComponent = mount(
          <Icon icon={icon} />,
        );
        expect(fullComponent.hasClass(`y-icon__${icon}`)).toBe(true);
      });
    });
  });
});
