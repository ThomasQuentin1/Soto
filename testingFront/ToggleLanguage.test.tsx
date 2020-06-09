import React from 'react';
import renderer from 'react-test-renderer';
import ContainToggleLanguage from './ContainToggleLanguage';

test('ToggleLanguague is the components that display the button which change the language', () => {
    const component = renderer.create(
        <ContainToggleLanguage></ContainToggleLanguage>
    )

    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});