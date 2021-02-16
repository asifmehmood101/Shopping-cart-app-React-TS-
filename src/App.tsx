import React from 'react';

//for data fetching from API we use UseQuery
import { useQuery } from 'react-query';

//components
import Item from './components/Item';
import Cart from './components/Cart';
import Drawer from '@material-ui/core/Drawer';
import LinearProgress from '@material-ui/core/LinearProgress';
import { Grid } from '@material-ui/core';
import AddShoppingIcon from '@material-ui/icons/ShoppingCart';
import { Badge } from '@material-ui/core';

//syled components
import { Wrapper, StyledButton } from './Styles/App.styled';
import { ShoppingCart } from '@material-ui/icons';

//types
export type CartItemsType = {
  id: number;
  category: string;
  description: string;
  image: string;
  price: number;
  title: string;
  amount: number;
};

const getAllProducts = async (): Promise<CartItemsType[]> => {
  return await (await fetch('https://fakestoreapi.com/products')).json();
};

const App = () => {
  const [cartOpen, setCartOpen] = React.useState<boolean>(false);
  const [cartItems, setCartItems] = React.useState([] as CartItemsType[]);
  const { data, isLoading, error } = useQuery<CartItemsType[]>(
    'Products',
    getAllProducts,
  );

  const getTotlCartItems = (items: CartItemsType[]) => {
    return items.reduce((ac: number, item) => ac + item.amount, 0);
  };
  const AddtoCart = (clickedItem: CartItemsType) => {
    setCartItems((prev) => {
      //if item is in cart?
      const isItemInCart = prev.find((item) => item.id === clickedItem.id);
      if (isItemInCart) {
        return prev.map((item) =>
          item.id === clickedItem.id
            ? { ...item, amount: item.amount + 1 }
            : item,
        );
      }
      //first time the item is added
      return [...prev, { ...clickedItem, amount: 1 }];
    });
  };
  const RemoveFromCart = (id: number) => {
    setCartItems((prev) => {
      return prev.reduce((ac, item) => {
        if (item.id === id) {
          if (item.amount === 1) return ac;
          return [...ac, { ...item, amount: item.amount - 1 }];
        } else {
          return [...ac, item];
        }
      }, [] as CartItemsType[]);
    });
  };

  console.log(data);

  if (isLoading) return <LinearProgress />;
  if (error) return <div>{`Error:${error}`}</div>;
  return (
    <Wrapper>
      <Grid container spacing={3}>
        <Drawer
          anchor='right'
          open={cartOpen}
          onClose={() => setCartOpen(!cartOpen)}
        >
          <Cart
            addToCart={AddtoCart}
            cartItems={cartItems}
            removeFromCart={RemoveFromCart}
          />
        </Drawer>
        <StyledButton onClick={() => setCartOpen(!cartOpen)}>
          <Badge badgeContent={getTotlCartItems(cartItems)} color='error'>
            <ShoppingCart />
          </Badge>
        </StyledButton>
        {data?.map((item) => {
          return (
            <Grid item key={item.id} xs={12} sm={4}>
              <Item item={item} HandleAddtoCart={AddtoCart} />
            </Grid>
          );
        })}
      </Grid>
    </Wrapper>
  );
};

export default App;
