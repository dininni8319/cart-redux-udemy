import { uiActions } from "../store/ui-slice";
import { cartActions } from "./cart-slice";

export const fetchCartData = () => {
  return dispatch => {

    const fetchData = async () => {
      const response = await fetch('https://react-udemy-course-dabd2-default-rtdb.europe-west1.firebasedatabase.app/cart');

      if (!response.ok) {
        throw new Error('Could not fetch cart data!');
      }

      const data = await response.json();

      return data;
    }

    try {
      const cartData = fetchData();
      
      dispatch(cartActions.replaceCart({
        items: cartData.items || [],
        totalQuantity: cartData.totalQuantity,
      }));
      dispatch(uiActions.showNotification({
        status: 'success',
        title: 'Success',
        message: "Sending the cart data successfully!"
      }));
    } catch (error) {

      dispatch(uiActions.showNotification({
        status: 'error',
        title: 'Error',
        message: "fetching the cart data failed!"
      }));
    }
  }
}

export const sendCartData = (cart) => {
  return async (dispatch) => {
    dispatch(uiActions.showNotification({
      status: 'pending',
      title: 'Sending the request',
      message: "Sending the cart data!"
    }));

    const sendRequest = async () => {
      const response = fetch('https://react-udemy-course-dabd2-default-rtdb.europe-west1.firebasedatabase.app/cart', {
        method: "PUT",
        body: JSON.stringify({
          items: cart.items,
          totalQuantity: cart.totalQuantity,
        }),
      });
      
      if(!response.ok) {
        throw new Error('Sending cart data failed.');
      }
    };

    try {
      await sendRequest();

      dispatch(uiActions.showNotification({
        status: 'success',
        title: 'Success',
        message: "Sending the cart data successfully!"
      }));
    } catch (error) {
      
      dispatch(uiActions.showNotification({
        status: 'error',
        title: 'Error',
        message: "Sending the cart data failed!"
      }));
    };
  };
}
