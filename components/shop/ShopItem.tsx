import React from 'react';
import Container from '@material-ui/core/Container';
import ShopItemProps from 'interfaces/ShopItem';

const ShopItem = ({product} : ShopItemProps) => {
    return (
        <>
        {product && 
            <Container maxWidth="xs" style={{textAlign: 'center'}}>
                {product.name}
            </Container>
        }
        </>
    );
}

export default ShopItem