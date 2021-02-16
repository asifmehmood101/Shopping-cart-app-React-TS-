import { CartItemsType } from '../App';
import CartItem from '../components/CartItem';

//styles
import { Wrapper } from '../Styles/Cart.styled';

//types

type Props = {
  cartItems: CartItemsType[];
  addToCart: (clickedItem: CartItemsType) => void;
  removeFromCart: (id: number) => void;
};

const Cart: React.FC<Props> = ({ cartItems, addToCart, removeFromCart }) => {
  return (
    <Wrapper>
      <h2>YourShoppig Cart</h2>
      {cartItems.length === 0 ? <p>No Item in Cart</p> : null}
      {cartItems.map((item) => {
        return (
          <CartItem
            key={item.id}
            item={item}
            addToCart={addToCart}
            removeFromCart={removeFromCart}
          />
        );
      })}
    </Wrapper>
  );
};

export default Cart;
