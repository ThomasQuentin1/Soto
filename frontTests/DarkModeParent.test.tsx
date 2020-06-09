import React from 'react';
import renderer from 'react-test-renderer';
import DarkModeParent from '../components/encapsulationComponents/DarkModeParent';

test('DarkModeParent is a container that apply the theming and style to all childs, it has to be used in pages', () => {
    const component = renderer.create(
        <DarkModeParent><p>testing DarkModeParent</p></DarkModeParent>
    )

    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});