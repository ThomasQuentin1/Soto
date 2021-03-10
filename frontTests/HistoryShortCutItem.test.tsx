import React from 'react';
import renderer from 'react-test-renderer';
import HistoryShortCutItem from './ContainHistoryShortCutItem';

test('ToggleLanguague is the components that display the button which change the language', () => {
    const component = renderer.create(
        <HistoryShortCutItem></HistoryShortCutItem>
    )

    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});