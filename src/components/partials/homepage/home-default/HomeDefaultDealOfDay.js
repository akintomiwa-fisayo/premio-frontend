import React, { Component } from 'react';
import NextArrow from '../../../elements/carousel/NextArrow';
import PrevArrow from '../../../elements/carousel/PrevArrow';
import CountDownSimple from '../../../elements/CountDownSimple';
import Link from 'next/link';

import Slider from 'react-slick';
import ProductDealOfDay from '../../../elements/products/ProductDealOfDay';
import { onSale } from '../../../../public/static/data/product';

class HomeDefaultDealOfDay extends Component {
    render() {
        const carouselSetting = {
            dots: false,
            infinite: true,
            speed: 500,
            slidesToShow: 7,
            slidesToScroll: 3,
            arrows: true,
            nextArrow: <NextArrow />,
            prevArrow: <PrevArrow />,
            responsive: [
                {
                    breakpoint: 1680,
                    settings: {
                        slidesToShow: 6,
                        slidesToScroll: 1,
                        dots: false,
                    },
                },
                {
                    breakpoint: 1366,
                    settings: {
                        slidesToShow: 5,
                        slidesToScroll: 3,
                        infinite: true,
                        dots: false,
                    },
                },
                {
                    breakpoint: 1200,
                    settings: {
                        slidesToShow: 4,
                        slidesToScroll: 4,
                        infinite: true,
                        dots: true,
                        arrows: false,
                    },
                },
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 2,
                        dots: true,
                        arrows: false,
                    },
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 2,
                        dots: true,
                        arrows: false,
                    },
                },
            ],
        };

        return (
            <div className="ps-deal-of-day">
                <div className="ps-container">
                    <div className="ps-section__content">
                        {onSale.map(product => (
                            <ProductDealOfDay
                                product={product}
                                key={product.title}
                            />
                        ))}
                    </div>
                </div>
            </div>
        );
    }
}

export default HomeDefaultDealOfDay;
