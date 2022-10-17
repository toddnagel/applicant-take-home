import React from 'react';
import Classnames from 'classnames';
import { GiftCard, BonusTag } from '../../../../../components/common/';
import { PrizeoutOffer, selectedOffer } from '../../../../../slices/offers-slice';
import { useAppSelector } from '../../../../../hooks';

import './offer-gift-card.less';

interface OfferGiftCardProps {
    offer: PrizeoutOffer;
    onClickHandler: () => void;
}

export const OfferGiftCard: React.FC<OfferGiftCardProps> = ({ offer, onClickHandler }): React.ReactElement => {
    const curSelectedOffer = useAppSelector(selectedOffer);

    // this part really threw me off, I thought about moving the selected option
    // to the beginning of the list, and displaying a sorted list, however it did
    // not make enough sense to me, and would need further clarification if that
    // is actually what was expected.. doing so would allow the first in list to
    // always be the selected value option, and wouldnt need to keep track of the
    // curSelectedOffer I created in the offers-slice.

    const firstGiftCard = offer.giftcard_list[0];
    const offerType = firstGiftCard.display_monetary_bonus ? 'monetary' : 'percentage';
    const offerValue = firstGiftCard.display_bonus;
    const classes: string = Classnames('offer-gift-card', {
        'offer-gift-card--selected': curSelectedOffer === offer,
    });

    const selectOfferOnEnter = (event: React.KeyboardEvent<HTMLElement>) => {
        // this routine inspired my to get autoFocus working :)
        if (event.key === 'Enter') {
            onClickHandler();
        }
    };

    return (
        <div
            className={classes}
            onClick={() => onClickHandler()}
            onKeyDown={(event) => selectOfferOnEnter(event)}
            role="button"
            tabIndex={0}
        >
            <GiftCard name={offer.name} imgUrl={offer.image_url} altText={offer.name} className="offer" />
            {offerValue > 0 && <BonusTag type={offerType} value={offerValue} size="small" />}
        </div>
    );
};
