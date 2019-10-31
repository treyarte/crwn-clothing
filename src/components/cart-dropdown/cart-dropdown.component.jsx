import React from "react";
import {connect} from "react-redux";
import CartItem from "../cart-item/cart-item.component";
import {selectCartItems} from "../../redux/cart/cart.selectors";
import {createStructuredSelector} from "reselect";
import {withRouter} from "react-router-dom";
import {toggleCartHidden} from "../../redux/cart/cart.actions";
import {CartDropDownContainer, CartDropDownButton, EmptyMessageContainer, CartItemContainer} from "./cart-dropdown.styles";

const CartDropdown = ({cartItems, history, dispatch}) =>(
    <CartDropDownContainer>
        <CartItemContainer>
            {
                cartItems.length ? 
                cartItems.map(
                    cartItem => (<CartItem key={cartItem.id} item={cartItem}/>
                ))
                :
                <EmptyMessageContainer>Your cart is empty</EmptyMessageContainer>
            }
        </CartItemContainer>
        <CartDropDownButton onClick ={ () => 
            {
                history.push("/checkout");
                dispatch(toggleCartHidden())
            }}>
            GO TO CHECKOUT
        </CartDropDownButton>
    </CartDropDownContainer>

)

const mapStateToProps =createStructuredSelector({
    cartItems: selectCartItems
})

export default withRouter(connect(mapStateToProps)(CartDropdown));