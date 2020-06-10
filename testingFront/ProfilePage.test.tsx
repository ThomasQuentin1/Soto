import React from 'react';
import renderer from 'react-test-renderer';
import ContainProfilePage from './ContainProfilePage';

test('Creation of profile page in a component to test it', () => {
    const component = renderer.create(
        <ContainProfilePage></ContainProfilePage>
    )

    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});