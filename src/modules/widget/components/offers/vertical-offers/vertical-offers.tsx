import React from 'react';
import Classnames from 'classnames';
import {
    PrizeoutOffer,
    PrizeoutOfferSettings,
    selectedOffer,
    setSelectedOffer,
    setSelectedOfferValue,
} from '../../../../../slices/offers-slice';
import { OfferGiftCard } from '../offer-gift-card/offer-gift-card';
import { useAppSelector } from '../../../../../hooks';
import { selectIsCheckoutPanelCollapsed } from '../../../../../slices/common-slice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../../../store';
import { toggleIsCollapsedCheckoutPanelOpen, selectIsProcessing } from '../../../../../slices/checkout-slice';

import './vertical-offers.less';

interface OfferView {
    offers: PrizeoutOffer[];
    viewSettings?: PrizeoutOfferSettings;
}

const VerticalOffers: React.FC<OfferView> = ({ offers, viewSettings }): React.ReactElement => {
    const isCheckoutPanelCollapsedView = useAppSelector(selectIsCheckoutPanelCollapsed);
    const heading = viewSettings.title || 'Recommended for you';
    const classes: string = Classnames('vertical-offers');
    const dispatch = useDispatch<AppDispatch>();
    const curSelectedOffer = useAppSelector(selectedOffer);
    const isCheckoutProcessing = useAppSelector(selectIsProcessing);

    const offerClickHandler = (offer: PrizeoutOffer) => {
        if (!isCheckoutProcessing) {
            if (isCheckoutPanelCollapsedView) {
                dispatch(toggleIsCollapsedCheckoutPanelOpen());
            }
            dispatch(setSelectedOffer(null));
            dispatch(setSelectedOfferValue(null));

            setTimeout(() => {
                // this allows us to autoFocus after selection, we default to first option value
                if (offer !== curSelectedOffer) {
                    dispatch(setSelectedOffer(offer));
                    dispatch(setSelectedOfferValue(offer.giftcard_list[0]));
                }
            }, 1);
        }
    };

    const returnOffers = () => {
        return offers.map((offer) => (
            <OfferGiftCard
                key={`${heading}-${offer.name}`}
                offer={offer}
                onClickHandler={() => offerClickHandler(offer)}
            />
        ));
    };

    return (
        <div className={classes}>
            <h2>{heading}</h2>
            {offers && (
                <div className={`vertical-offers__gift-cards${isCheckoutProcessing ? ' processing' : ''}`}>
                    {returnOffers()}
                </div>
            )}
        </div>
    );
};

export default VerticalOffers;
