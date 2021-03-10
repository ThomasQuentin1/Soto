import React from 'react';
import renderer from 'react-test-renderer';
import ContainHistoryItem from './ContainHistoryItem';

test('ToggleLanguague is the components that display the button which change the language', () => {
    const component = renderer.create(
        <ContainHistoryItem></ContainHistoryItem>
    )

    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});