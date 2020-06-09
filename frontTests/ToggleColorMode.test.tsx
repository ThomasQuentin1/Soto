import React from 'react';
import renderer from 'react-test-renderer';
import ContainToggleColorMode from './ContainToggleColorMode';

test('DarkModeParent is a container that apply the theming and style to all childs, it has to be used in pages', () => {
    const component = renderer.create(
        <ContainToggleColorMode></ContainToggleColorMode>
    )

    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});