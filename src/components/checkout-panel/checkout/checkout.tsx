import React, { useEffect, useState } from 'react';
import checkoutPanelViewWrapper from '../view-wrapper';
import CheckoutButton from './checkout-button';
import { selectedOffer } from '../../../slices/offers-slice';
import { GiftCard } from '../../../components/common/';
import { useAppSelector } from '../../../hooks';
import CheckoutOffers from './checkout-offers';

import './checkout.less';

const CheckoutPanelView: React.FC = (): React.ReactElement => {
    const curSelectedOffer = useAppSelector(selectedOffer);
    const [hasSelectedOffer, setHasSelectedOffer] = useState(false);

    useEffect(() => {
        // this allows us to hide/show the starting label while user is selecting/unselecting offers
        if (curSelectedOffer) {
            setHasSelectedOffer(true);
        } else {
            setHasSelectedOffer(false);
        }
    }, [curSelectedOffer]);

    return (
        <section className="checkout">
            {curSelectedOffer && (
                <div className="grid grid--top-bottom grid--stretch-top">
                    <div className="grid__item">
                        <section className="checkout__brand">
                            <GiftCard
                                name={curSelectedOffer.name}
                                imgUrl={curSelectedOffer.image_url}
                                altText={curSelectedOffer.name}
                                className="offer"
                            />
                            <CheckoutOffers offer={curSelectedOffer} />
                        </section>
                    </div>
                    <div className="grid__item">
                        <section className="checkout__calculation">
                            <CheckoutButton />
                        </section>
                    </div>
                </div>
            )}
            {!hasSelectedOffer && <p>Select a Giftcard to Redeem</p>}
        </section>
    );
};

export default checkoutPanelViewWrapper(CheckoutPanelView, 'checkout');
