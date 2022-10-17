import React, { useState } from 'react';
import { Button } from '../../common';
import { Alert } from '../../common/modals';
import { useAppSelector } from '../../../hooks';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../store';
import { selectedOffer, selectedOfferValue } from '../../../slices/offers-slice';
import { selectIsProcessing, toggleIsProcessing } from '../../../slices/checkout-slice';

import './checkout.less';

interface CheckoutPurchaseProps {
    checkout_value_id: string;
    cost_in_cents: number;
    name: string;
    value_in_cents: number;
}

const CheckoutButton: React.FC = (): React.ReactElement => {
    const curSelectedOffer = useAppSelector(selectedOffer);
    const curSelectedOfferValue = useAppSelector(selectedOfferValue);
    const dispatch = useDispatch<AppDispatch>();
    const isCheckoutProcessing = useAppSelector(selectIsProcessing);
    const [message, setMessage] = useState({
        message: '',
        type: undefined,
    });

    const purchaseGiftCard = async () => {
        // we have access to the full offer and chosen value if more is needed
        const data: CheckoutPurchaseProps = {
            checkout_value_id: curSelectedOfferValue.checkout_value_id,
            cost_in_cents: curSelectedOfferValue.cost_in_cents,
            name: curSelectedOffer.name,
            value_in_cents: curSelectedOfferValue.value_in_cents,
        };

        const requestOptions = {
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' },
            method: 'POST',
        };

        fetch('http://localhost:8069/fake-url', requestOptions)
            .then(async (response) => {
                const isJson = response.headers.get('content-type')?.includes('application/json');
                const results = isJson && (await response.json());

                // check for error response
                // if (!response.ok) {
                //     // get error message from body or default to response status
                //     const error = (results && results.message) || response.status;
                //     return Promise.reject(error);
                // }
                setTimeout(() => {
                    setMessage({
                        message: 'Prizeout Success!',
                        type: 'success',
                    });
                    dispatch(toggleIsProcessing());
                }, 2000);
            })
            .catch((error) => {
                setTimeout(() => {
                    setMessage({
                        message: 'Prizeout Failed!',
                        type: 'error',
                    });
                    dispatch(toggleIsProcessing());
                }, 2000);
                console.error('There was an error!', error);
            });
    };

    const buttonText = `Prizeout ${!isCheckoutProcessing ? 'Gift Card' : 'in Process'}`;

    const buttonHandler = async () => {
        setMessage({
            message: '',
            type: undefined,
        });
        dispatch(toggleIsProcessing());
        await purchaseGiftCard();
        setTimeout(() => {
            setMessage({
                message: '',
                type: undefined,
            });
        }, 5000);
    };

    return (
        <>
            {message && message.message && (
                <p className="checkout-response">
                    <Alert type={message.type} message={message.message} />
                </p>
            )}
            <Button
                ariaLabel={!isCheckoutProcessing ? 'Prizeout your gift card.' : 'Prizeout in process.'}
                color={`primary`}
                onClick={buttonHandler}
                size="medium"
                text={buttonText}
                type="submit"
                isDisabled={isCheckoutProcessing}
            />
        </>
    );
};

export default CheckoutButton;
