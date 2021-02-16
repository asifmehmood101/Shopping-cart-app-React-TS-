import React from 'react';

//styled
import { Wrapper } from '../Styles/Items.styled';
//MUI components
import Button from '@material-ui/core/Button';

//import props
import { CartItemsType } from '../App';

//props type
type Props = {
  item: CartItemsType;
  HandleAddtoCart: (clickedItem: CartItemsType) => void;
};

const Item: React.FC<Props> = ({ item, HandleAddtoCart }) => {
  return (
    <Wrapper>
      <img src={item.image} alt={item.title} />
      <div>
        <h3>{item.title}</h3>
        <p>{item.description}</p>
        <h3>${item.price}</h3>
      </div>
      <Button onClick={() => HandleAddtoCart(item)}>Add to Cart</Button>
    </Wrapper>
  );
};

export default Item;
