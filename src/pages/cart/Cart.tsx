// pages/cart/Cart.tsx
import FakeHeader from '../../components/header/FakeHeader';
import Header from '../../components/header/Header';
import { CartItems } from './components/CartItems';

const Cart: React.FC = () => {
  return (
    <>
    <div>
    <section>
      <FakeHeader />
    </section>
      <Header />
      <h2>Cart</h2>
      <CartItems />
    </div>
    </>
  );
};

export default Cart;