/*! Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license. */
import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import Icon, { IconProps, IconSize } from '.';
import ICONS from './icons';

describe('<Icon />', () => {
  let component: ShallowWrapper<IconProps, {}>;

  describe('with minimal options', () => {
    beforeEach(() => {
      component = shallow(<Icon icon="attach" />);
    });

    it('contains the correct SVG icon', () => {
      expect(component.find(ICONS['attach'])).toHaveLength(1);
    });

    it('contains its base className', () => {
      expect(component.hasClass('y-icon')).toBe(true);
    });

    it('matches its snapshot', () => {
      expect(component).toMatchSnapshot();
    });
  });

  describe('with color', () => {
    beforeEach(() => {
      component = shallow(<Icon icon="attach" color="blue" />);
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
      component = shallow(<Icon icon="attach" block={true} />);
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
      component = shallow(<Icon icon="attach" size={IconSize.XXLARGE} />);
    });

    it('is the correct height', () => {
      expect(component.getNode().props.style.height).toBe(IconSize.XXLARGE + 'px');
    });

    it('is the correct width', () => {
      expect(component.getNode().props.style.width).toBe(IconSize.XXLARGE + 'px');
    });

    it('matches its snapshot', () => {
      expect(component).toMatchSnapshot();
    });
  });

  describe('with additional className', () => {
    beforeEach(() => {
      component = shallow(<Icon icon="attach" className="TEST_CLASSNAME" />);
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
});
