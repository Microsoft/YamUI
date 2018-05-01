/*! Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license. */
import * as React from 'react';
import { shallow, ShallowWrapper, mount } from 'enzyme';
import TextField, { TextFieldProps } from '.';
import { TextField as FabricTextField } from 'office-ui-fabric-react/lib/TextField';

describe('<TextField />', () => {
  let component: ShallowWrapper<TextFieldProps>;

  describe('with default options', () => {
    beforeEach(() => {
      component = shallow(<TextField />)
        .dive()
        .dive();
    });

    it('matches its snapshot', () => {
      expect(component).toMatchSnapshot();
    });
  });

  describe('with all options', () => {
    beforeEach(() => {
      component = shallow(
        <TextField
          prefix="PREFIX"
          suffix="SUFFIX"
          underlined={true}
          className="CLASS"
          value="VALUE"
          label="LABEL"
          description="DESCRIPTION"
          disabled={true}
          required={true}
          errorMessage="ERROR MESSAGE"
          placeHolder="PLACEHOLDER"
          onFocus={jest.fn().mockName('onFocus')}
          onBlur={jest.fn().mockName('onBlur')}
          onMouseEnter={jest.fn().mockName('onMouseEnter')}
          onMouseLeave={jest.fn().mockName('onMouseLeave')}
          componentRef={jest.fn().mockName('componentRef')}
        />,
      )
        .dive()
        .dive();
    });

    it('matches its snapshot', () => {
      expect(component).toMatchSnapshot();
    });
  });

  describe('full mount with default options', () => {
    let ref: any;
    const setRef = (i: any) => (ref = i);

    beforeEach(() => {});

    describe('when focused', () => {
      let focusSpy: jest.SpyInstance;
      let setSelectionRangeSpy: jest.SpyInstance;

      beforeEach(() => {
        focusSpy = jest.spyOn(FabricTextField.prototype, 'focus');
        setSelectionRangeSpy = jest.spyOn(FabricTextField.prototype, 'setSelectionRange');
        mount(<TextField componentRef={setRef} />);
      });

      it('calls focus', () => {
        ref.focus();
        expect(focusSpy).toHaveBeenCalled();
      });

      it('calls setSelectionRangeSpy', () => {
        ref.focus();
        expect(setSelectionRangeSpy).toHaveBeenCalledWith(0, 0);
      });
    });
  });

  describe('full mount with value', () => {
    const value = 'VALUE';
    let ref: any;
    const setRef = (i: any) => (ref = i);

    beforeEach(() => {
      mount(<TextField value={value} componentRef={setRef} />);
    });

    describe('when focused', () => {
      let focusSpy: jest.SpyInstance;
      let setSelectionRangeSpy: jest.SpyInstance;

      beforeEach(() => {
        focusSpy = jest.spyOn(FabricTextField.prototype, 'focus');
        setSelectionRangeSpy = jest.spyOn(FabricTextField.prototype, 'setSelectionRange');
      });

      it('calls focus', () => {
        ref.focus();
        expect(focusSpy).toHaveBeenCalled();
      });

      it('calls setSelectionRangeSpy', () => {
        ref.focus();
        expect(setSelectionRangeSpy).toHaveBeenCalledWith(value.length, value.length);
      });
    });
  });
});
