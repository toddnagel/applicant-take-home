import React from 'react';
import Classnames from 'classnames';
import { useAppSelector } from '../../../hooks';
import {
    PrizeoutOffer,
    PrizeoutOfferValueOptions,
    selectedOfferValue,
    setSelectedOfferValue,
} from '../../../slices/offers-slice';
import { selectIsProcessing } from '../../../slices/checkout-slice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../store';

import './checkout.less';

interface CheckoutOffersProps {
    offer?: PrizeoutOffer;
}

const CheckoutOffers: React.FC<CheckoutOffersProps> = ({ offer }): React.ReactElement => {
    const dispatch = useDispatch<AppDispatch>();
    const curSelectedOfferValue = useAppSelector(selectedOfferValue);
    const isCheckoutProcessing = useAppSelector(selectIsProcessing);
    const classes: string = Classnames('checkout-offers');

    const buttonHandler = (offerOption: PrizeoutOfferValueOptions) => {
        if (!isCheckoutProcessing) {
            dispatch(setSelectedOfferValue(offerOption));
        }
    };

    const priceInUSD = (price: number) => {
        // this can easily be configured other currencies, but wasnt in scope of the task
        return (price / 100).toLocaleString('en-US', {
            currency: 'USD',
            style: 'currency',
        });
    };

    const returnOfferOptions = () => {
        // I used an input instead of the Button to allow for autoFocus to work smoothly
        return offer.giftcard_list.map((option, idx) => (
            <input
                key={`offer-option__${idx}`}
                aria-label={`Select ${priceInUSD(option.cost_in_cents)}}`}
                autoFocus={idx === 0}
                onClick={() => {
                    !isCheckoutProcessing ? buttonHandler(option) : null;
                }}
                defaultValue={priceInUSD(option.cost_in_cents)}
                type="button"
                className={Classnames('offer-value', {
                    processing: isCheckoutProcessing,
                    selected: curSelectedOfferValue.checkout_value_id === option.checkout_value_id,
                })}
            />
        ));
    };

    const returnOfferTotals = () => {
        return (
            <div className="checkout-offers__offer-summary">
                <div className="flex-row">
                    <span>Redemption Amount</span>
                    <span>{priceInUSD(curSelectedOfferValue.cost_in_cents)}</span>
                </div>
                {curSelectedOfferValue.display_bonus ? (
                    <div className="flex-row">
                        <span className="bonus-value">Prizeout Bonus (+{curSelectedOfferValue.display_bonus}%)</span>
                        <span className="bonus-value">
                            {priceInUSD(curSelectedOfferValue.value_in_cents - curSelectedOfferValue.cost_in_cents)}
                        </span>
                    </div>
                ) : null}
                <div className="flex-row">
                    <span>You Get</span>
                    <span>{priceInUSD(curSelectedOfferValue.value_in_cents)}</span>
                </div>
            </div>
        );
    };

    return (
        <div className={classes}>
            <span>Select Redemption Amount</span>
            {curSelectedOfferValue && (
                <>
                    <div className="checkout-offers__offer-options">{returnOfferOptions()}</div>
                    <div className="checkout-offers__offer-totals">{returnOfferTotals()}</div>
                </>
            )}
        </div>
    );
};

export default CheckoutOffers;
