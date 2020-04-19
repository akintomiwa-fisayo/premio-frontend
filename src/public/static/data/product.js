const shop1 = require('../img/products/shop/1.jpg');
const shop2 = require('../img/products/shop/2.jpg');
const shop3 = require('../img/products/shop/3.jpg');
const shop4 = require('../img/products/shop/4.jpg');
const shop5 = require('../img/products/shop/5.jpg');
const shop6 = require('../img/products/shop/6.jpg');
const shop7 = require('../img/products/shop/7.jpg');
const shop8 = require('../img/products/shop/8.jpg');
const shop9 = require('../img/products/shop/9.jpg');
const shop10 = require('../img/products/shop/10.jpg');
const shop11 = require('../img/products/shop/11.jpg');
const shop12 = require('../img/products/shop/12.jpg');
const shop13 = require('../img/products/shop/13.jpg');
const shop14 = require('../img/products/shop/14.jpg');
const shop15 = require('../img/products/shop/15.jpg');
const shop16 = require('../img/products/shop/16.jpg');
const shop17 = require('../img/products/shop/17.jpg');
const shop18 = require('../img/products/shop/18.jpg');
const shop19 = require('../img/products/shop/19.jpg');
const shop20 = require('../img/products/shop/20.jpg');
const shop21 = require('../img/products/shop/21.jpg');
const shop22 = require('../img/products/shop/22.jpg');
const shop23 = require('../img/products/shop/23.jpg');

const home2 = require('../img/products/home/2.jpg');
const home3 = require('../img/products/home/3.jpg');
const home4 = require('../img/products/home/4.jpg');
const home5 = require('../img/products/home/5.jpg');
const home6 = require('../img/products/home/6.jpg');
const home7 = require('../img/products/home/7.jpg');

const electronic4 = require('../img/products/electronic/4.jpg');
const electronic7 = require('../img/products/electronic/7.jpg');
const electronic12 = require('../img/products/electronic/12.jpg');
const electronic14 = require('../img/products/electronic/14.jpg');

const recommend1 = require('../img/products/home-2/recommend/1.jpg');
const recommend2 = require('../img/products/home-2/recommend/2.jpg');
const recommend3 = require('../img/products/home-2/recommend/3.jpg');
const recommend4 = require('../img/products/home-2/recommend/4.jpg');
const recommend5 = require('../img/products/home-2/recommend/5.jpg');
const recommend6 = require('../img/products/home-2/recommend/6.jpg');

const technology2 = require('../img/products/technology/2.jpg');
const technology3 = require('../img/products/technology/3.jpg');

exports.products = [
  {
    id: '1',
    thumbnail: shop1,
    title: 'Apple iPhone Retina 6s Plus 32GB',
    vendor: 'ROBERT’S STORE',
    price: '640.00',
    sale: 'false',
    categories: [
      {
        id: '1',
        value: 'phone',
        name: 'Phones & Accessories',
      },
    ],
    brand: [
      {
        id: '1',
        value: 'apple',
        text: 'Apple',
      },
    ],
  },
  {
    id: '2',
    thumbnail: shop1,
    title: 'Apple iPhone Retina 6s Plus 64GB',
    vendor: 'Young Shop',
    price: '1150.00',
    sale: 'false',
    categories: [
      {
        id: '1',
        value: 'phone',
        name: 'Phones & Accessories',
      },
    ],
    brand: [
      {
        id: '1',
        value: 'apple',
        text: 'Apple',
      },
    ],
  },
  {
    id: '3',
    thumbnail: shop2,
    title: 'Marshall Kilburn Portable Wireless Speaker',
    vendor: 'Go Pro',
    price: '42.99',
    rating: true,
    ratingCount: '5',
    categories: [
      {
        id: '2',
        value: 'electronic',
        name: 'Consumer Electrics',
      },
    ],
    brand: [
      {
        id: '2',
        value: 'marshall',
        text: 'Marshall',
      },
    ],
  },
  {
    id: '4',
    thumbnail: shop4.jpg,
    title: 'Herschel Leather Duffle Bag In Brown Color',
    vendor: 'Go Pro',
    price: '125.30',
    rating: true,
    ratingCount: '4',
    categories: [
      {
        id: '3',
        value: 'clothing',
        name: 'Clothing & Apparel',
      },
    ],
    brand: [
      {
        id: '3',
        value: 'herschel',
        text: 'Herschel',
      },
    ],
  },
  {
    id: '5',
    thumbnail: shop5,
    title: 'Xbox One Wireless Controller Black Color',
    vendor: 'Global Office',
    price: '55.99',
    rating: true,
    ratingCount: '5',
    badge: [
      {
        type: 'hot',
        value: 'hot',
      },
    ],
    categories: [
      {
        id: '4',
        value: 'technologies',
        name: 'Computers & Technologies',
      },
    ],
    brand: [
      {
        id: '4',
        value: 'microsoft',
        text: 'Microsoft',
      },
    ],
  },
  {
    id: '6',
    thumbnail: shop6,
    title: 'Grand Slam Indoor Of Show Jumping Novel',
    vendor: "Robert's Store",
    sale: true,
    price: '32.99',
    salePrice: '41.00',
    rating: true,
    ratingCount: '4',
    badge: [
      {
        type: 'sale',
        value: '-37%',
      },
    ],
    categories: [
      {
        id: '5',
        value: 'book',
        name: 'Books & Office',
      },
    ],
    brand: [
      {
        id: '4',
        value: 'megasystem',
        text: 'Mega System',
      },
    ],
  },
  {
    id: '7',
    thumbnail: shop7,
    title: 'Sound Intone I65 Earphone White Version',
    vendor: 'Youngshop',
    sale: true,
    price: '100.99',
    salePrice: '106.00',
    rating: true,
    ratingCount: '5',
    badge: [
      {
        type: 'sale',
        value: '-5%',
      },
    ],
    categories: [
      {
        id: '4',
        value: 'technologies',
        name: 'Computers & Technologies',
      },
    ],
    brand: [
      {
        id: '6',
        value: 'sony',
        text: 'Sony',
      },
    ],
  },
  {
    id: '8',
    thumbnail: shop8,
    title: 'Korea Long Sofa Fabric In Blue Navy Color',
    vendor: 'Youngshop',
    sale: true,
    price: '567.80',
    salePrice: '670.20',
    rating: true,
    ratingCount: '4',
    badge: [
      {
        type: 'sale',
        value: '-16%',
      },
    ],
    categories: [
      {
        id: '6',
        value: 'garden',
        name: 'Garden & Kitchen',
      },
    ],
    brand: [
      {
        id: '7',
        value: 'flatfuniture',
        text: 'Flat Funiture',
      },
    ],
  },
  {
    id: '9',
    thumbnail: shop9,
    title: 'Unero Military Classical Backpack',
    vendor: 'Young shop',
    sale: true,
    price: '35.89',
    salePrice: '42.20',
    rating: true,
    ratingCount: '3',
    badge: [
      {
        type: 'sale',
        value: '-16%',
      },
    ],
    categories: [
      {
        id: '3',
        value: 'clothing',
        name: 'Clothing & Apparel',
      },
    ],
    brand: [
      {
        id: '3',
        value: 'herschel',
        text: 'Herschel',
      },
    ],
  },
  {
    id: '10',
    thumbnail: shop10,
    title: 'Rayban Rounded Sunglass Brown Color',
    vendor: 'Young shop',
    price: '35.89',
    rating: true,
    ratingCount: '5',
    categories: [
      {
        id: '3',
        value: 'clothing',
        name: 'Clothing & Apparel',
      },
    ],
    brand: [
      {
        id: '3',
        value: 'herschel',
        text: 'Herschel',
      },
    ],
  },
  {
    id: '11',
    thumbnail: shop11,
    title: 'Sleeve Linen Blend Caro Pane Shirt',
    vendor: 'Go Pro',
    price: '29.39 ',
    rating: true,
    ratingCount: '4',
    categories: [
      {
        id: '3',
        value: 'clothing',
        name: 'Clothing & Apparel',
      },
    ],
    brand: [
      {
        id: '8',
        value: 'gucci',
        text: 'Gucci',
      },
    ],
  },
  {
    id: '12',
    thumbnail: shop12,
    title: 'Men’s Sports Runnning Swim Board Shorts',
    vendor: "Robert's Store",
    price: '13.43',
    rating: true,
    ratingCount: '5',
    categories: [
      {
        id: '3',
        value: 'clothing',
        name: 'Clothing & Apparel',
      },
    ],
    brand: [
      {
        id: '8',
        value: 'gucci',
        text: 'Gucci',
      },
    ],
  },
  {
    id: '13',
    thumbnail: shop13,
    title: 'Paul’s Smith Sneaker InWhite Color',
    vendor: 'Global Office',
    price: '75.44',
    rating: true,
    ratingCount: '4',
    categories: [
      {
        id: '3',
        value: 'clothing',
        name: 'Clothing & Apparel',
      },
    ],
    brand: [
      {
        id: '8',
        value: 'gucci',
        text: 'Gucci',
      },
    ],
  },
  {
    id: '14',
    thumbnail: shop14,
    title: 'MVMTH Classical Leather Watch In Black',
    vendor: 'Young Shop',
    sale: true,
    price: '57.99',
    salePrice: '62.99',
    rating: true,
    ratingCount: '5',
    badge: [
      {
        type: 'sale',
        value: '-7%',
      },
    ],
    categories: [
      {
        id: '3',
        value: 'clothing',
        name: 'Clothing & Apparel',
      },
    ],
    brand: [
      {
        id: '3',
        value: 'herschel',
        text: 'Herschel',
      },
    ],
  },
  {
    id: '15',
    thumbnail: shop15,
    title: 'Beat Spill 2.0 Wireless Speaker – White',
    vendor: 'Global Office',
    sale: true,
    price: '57.99',
    salePrice: '62.99',
    rating: true,
    ratingCount: '5',
    badge: [
      {
        type: 'sale',
        value: '-7%',
      },
    ],
    categories: [
      {
        id: '2',
        value: 'electronic',
        name: 'Consumer Electrics',
      },
    ],
    brand: [
      {
        id: '6',
        value: 'sony',
        text: 'Sony',
      },
    ],
  },
  {
    id: '16',
    thumbnail: shop16,
    title: 'ASUS Chromebook Flip – 10.2 Inch',
    vendor: 'Young Shop',
    sale: false,
    price: '332.38',
    rating: true,
    ratingCount: '4',
    categories: [
      {
        id: '4',
        value: 'technologies',
        name: 'Computers & Technologies',
      },
    ],
    brand: [
      {
        id: '8',
        value: 'asus',
        text: 'asus',
      },
    ],
  },
  {
    id: '17',
    thumbnail: shop17,
    title: 'Apple Macbook Retina Display 12',
    vendor: 'Young Shop',
    sale: true,
    price: '1200.00',
    salePrice: '1362.99',
    rating: true,
    ratingCount: '4',
    badge: [
      {
        type: 'sale',
        value: '-7%',
      },
    ],
    categories: [
      {
        id: '4',
        value: 'technologies',
        name: 'Computers & Technologies',
      },
    ],
    brand: [
      {
        id: '1',
        value: 'apple',
        text: 'Apple',
      },
    ],
  },
  {
    id: '18',
    thumbnail: shop18,
    title: 'Samsung UHD TV 24inch',
    vendor: "Robert's Store",
    price: '599.00',
    rating: true,
    ratingCount: '4',
    categories: [
      {
        id: '2',
        value: 'electronic',
        name: 'Consumer Electrics',
      },
    ],
    brand: [
      {
        id: '9',
        value: 'samsung',
        text: 'Samsung',
      },
    ],
  },
  {
    id: '19',
    thumbnail: shop19,
    title: 'EPSION Plaster Printer',
    vendor: "Robert's Store",
    price: '233.28',
    rating: true,
    ratingCount: '4',
    categories: [
      {
        id: '2',
        value: 'electronic',
        name: 'Consumer Electrics',
      },
    ],
    brand: [
      {
        id: '9',
        value: 'samsung',
        text: 'Samsung',
      },
    ],
  },
  {
    id: '20',
    thumbnail: shop19,
    title: 'EPSION Plaster Printer 2',
    vendor: "Robert's Store",
    price: '299.28',
    rating: true,
    ratingCount: '5',
    categories: [
      {
        id: '2',
        value: 'electronic',
        name: 'Consumer Electrics',
      },
    ],
    brand: [
      {
        id: '9',
        value: 'samsung',
        text: 'Samsung',
      },
    ],
  },
  {
    id: '21',
    thumbnail: shop20,
    title: 'LG White Front Load Steam Washer',
    vendor: 'Young Shop',
    sale: true,
    price: '1025.50',
    salePrice: '1422.70',
    rating: true,
    ratingCount: '5',
    badge: [
      {
        type: 'sale',
        value: '-28%',
      },
    ],
    categories: [
      {
        id: '2',
        value: 'electronic',
        name: 'Consumer Electrics',
      },
    ],
    brand: [
      {
        id: '10',
        value: 'lg',
        text: 'LG Electronics',
      },
    ],
  },
  {
    id: '22',
    thumbnail: shop21,
    title: 'Edifier Powered Bookshelf Speakers',
    vendor: 'Young Shop',
    sale: true,
    price: '85.00',
    salePrice: '96.00',
    rating: true,
    ratingCount: '5',
    categories: [
      {
        id: '2',
        value: 'electronic',
        name: 'Consumer Electrics',
      },
    ],
    brand: [
      {
        id: '2',
        value: 'marshall',
        text: 'Marshall',
      },
    ],
  },
  {
    id: '24',
    thumbnail: shop22,
    title: 'Amcrest Security Camera in White Color',
    vendor: 'Global Office',
    sale: true,
    price: '45.90',
    salePrice: '62.99',
    rating: true,
    ratingCount: '5',
    badge: [
      {
        type: 'sale',
        value: '-27%',
      },
    ],
    categories: [
      {
        id: '4',
        value: 'technologies',
        name: 'Computers & Technologies',
      },
    ],
    brand: [
      {
        id: '6',
        value: 'sony',
        text: 'Sony',
      },
    ],
  },
  {
    id: '25',
    thumbnail: shop23,
    title: 'DJI Phantom 4 Quadcopter Camera',
    vendor: 'Go Pro',
    sale: true,
    price: '945.90',
    salePrice: '1,207.15',
    rating: true,
    ratingCount: '5',
    badge: [
      {
        type: 'sale',
        value: '-22%',
      },
    ],
    categories: [
      {
        id: '4',
        value: 'technologies',
        name: 'Computers & Technologies',
      },
    ],
    brand: [
      {
        id: '6',
        value: 'sony',
        text: 'Sony',
      },
    ],
  },
  {
    id: '26',
    thumbnail: home2,
    title: 'Aroma Rice Cooker',
    vendor: 'Global Office',
    sale: false,
    price: '101.99',
    rating: true,
    ratingCount: '01',
    badge: [
      {
        type: 'outStock',
        value: 'Out Of Stock',
      },
    ],
    categories: [
      {
        id: '6',
        value: 'garden',
        name: 'Garden & Kitchen',
      },
    ],
    brand: [
      {
        id: '10',
        value: 'lg',
        text: 'LG Electronics',
      },
    ],
  },
  {
    id: '27',
    thumbnail: home3,
    title: 'Simple Plastice Chair In White Color',
    vendor: 'Young Shop',
    sale: true,
    price: '42.00',
    salePrice: '60.00',
    rating: true,
    ratingCount: '02',
    badge: [
      {
        type: 'sale',
        value: '-25%',
      },
    ],
    categories: [
      {
        id: '6',
        value: 'garden',
        name: 'Garden & Kitchen',
      },
    ],
    brand: [
      {
        id: '7',
        value: 'flatfuniture',
        text: 'Flat Funiture',
      },
    ],
  },
  {
    id: '28',
    thumbnail: home4,
    title: 'Korea Fabric Chair In Brown Colorr',
    vendor: 'Global Office',
    sale: false,
    price: '320.00',
    rating: true,
    ratingCount: '01',
    badge: [
      {
        type: 'outStock',
        value: 'Out Of Stock',
      },
    ],
    categories: [
      {
        id: '6',
        value: 'garden',
        name: 'Garden & Kitchen',
      },
    ],
    brand: [
      {
        id: '7',
        value: 'flatfuniture',
        text: 'Flat Funiture',
      },
    ],
  },
  {
    id: '29',
    thumbnail: home5,
    title: 'Set 14-Piece Knife From KichiKit',
    vendor: 'Global Office',
    sale: false,
    price: '85.00',
    rating: true,
    ratingCount: '01',
    badge: [
      {
        type: 'outStock',
        value: 'Out Of Stock',
      },
    ],
    categories: [
      {
        id: '6',
        value: 'garden',
        name: 'Garden & Kitchen',
      },
    ],
    brand: [
      {
        id: '7',
        value: 'flatfuniture',
        text: 'Flat Funiture',
      },
    ],
  },
  {
    id: '30',
    thumbnail: home6,
    title: 'Magic Bullet NutriBullet Pro 900 Series Blender',
    vendor: 'Global Store',
    sale: false,
    price: '92.00',
    rating: true,
    ratingCount: '01',
    badge: [
      {
        type: 'outStock',
        value: 'Out Of Stock',
      },
    ],
    categories: [
      {
        id: '6',
        value: 'garden',
        name: 'Garden & Kitchen',
      },
    ],
    brand: [
      {
        id: '7',
        value: 'flatfuniture',
        text: 'Flat Funiture',
      },
    ],
  },
  {
    id: '31',
    thumbnail: home7,
    title: 'Letter Printed Cushion Cover Cotton',
    vendor: 'Young Shop',
    sale: true,
    price: '42.00',
    salePrice: '60.00',
    rating: true,
    ratingCount: '02',
    badge: [
      {
        type: 'sale',
        value: '-46%',
      },
    ],
    categories: [
      {
        id: '6',
        value: 'garden',
        name: 'Garden & Kitchen',
      },
    ],
    brand: [
      {
        id: '7',
        value: 'flatfuniture',
        text: 'Flat Funiture',
      },
    ],
  },
  {
    id: '32',
    thumbnail: electronic4,
    title: 'Samsung Gear VR Virtual Reality Headset',
    vendor: 'Global Office',
    sale: false,
    price: '320.00',
    rating: true,
    ratingCount: '01',
    categories: [
      {
        id: '4',
        value: 'technologies',
        name: 'Computers & Technologies',
      },
    ],
    brand: [
      {
        id: '9',
        value: 'samsung',
        text: 'Samsung',
      },
    ],
  },
  {
    id: '33',
    thumbnail: recommend1,
    title: 'Anderson Composites – Custom Hood',
    ratingCount: '02',
    rating: true,
    sale: false,
    price: '990.99',
    salePrice: '1050.50',
    categories: [
      {
        id: '7',
        value: 'cars',
        name: 'Cars & Motocycless',
      },
    ],
    brand: [
      {
        id: '9',
        value: 'samsung',
        text: 'Samsung',
      },
    ],
  },
  {
    id: '34',
    thumbnail: recommend2,
    title: 'Evolution Sport Drilled and Slotted Brake Kit',
    vendor: 'ROBERT’S STORE',
    rating: true,
    sale: true,
    price: '45.99',
    salePrice: '50.50',
    badge: [
      {
        type: 'sale',
        value: '5%',
      },
    ],
    categories: [
      {
        id: '7',
        value: 'cars',
        name: 'Cars & Motocycless',
      },
    ],
    brand: [
      {
        id: '2',
        value: 'marshall',
        text: 'Marshall',
      },
    ],
  },
  {
    id: '35',
    thumbnail: recommend3,
    title: 'Depo Black Housing Tail Lights Frs Brz 86',
    vendor: 'Young Shop',
    rating: true,
    sale: true,
    price: '100.99',
    salePrice: '120.50',
    badge: [
      {
        type: 'sale',
        value: '10%',
      },
    ],
    categories: [
      {
        id: '7',
        value: 'cars',
        name: 'Cars & Motocycless',
      },
    ],
    brand: [
      {
        id: '3',
        value: 'herschel',
        text: 'Herschel',
      },
    ],
  },
  {
    id: '36',
    thumbnail: recommend4,
    title: 'Anderson Composites – Custom Hood',
    vendor: 'Go Pro',
    rating: true,
    ratingCount: '01',
    price: '442.99',
    categories: [
      {
        id: '7',
        value: 'cars',
        name: 'Cars & Motocycless',
      },
    ],
    brand: [
      {
        id: '3',
        value: 'herschel',
        text: 'Herschel',
      },
    ],
  },
  {
    id: '37',
    thumbnail: recommend5,
    title: 'Simpson Polymer White Racing Helmet',
    vendor: 'Go Pro',
    rating: true,
    ratingCount: '01',
    sale: true,
    price: '625.99',
    salePrice: '770.50',
    badge: [
      {
        type: 'sale',
        value: '12%',
      },
    ],
    categories: [
      {
        id: '7',
        value: 'cars',
        name: 'Cars & Motocycless',
      },
    ],
    brand: [
      {
        id: '11',
        value: 'yamaha',
        text: 'Yamaha',
      },
    ],
  },
  {
    id: '38',
    thumbnail: recommend6,
    title: 'Gibson – Double Skull Exhaust System',
    vendor: 'Global Office',
    price: '1055.99',
    rating: true,
    ratingCount: '1',
    badge: [
      {
        type: 'hot',
        value: 'hot',
      },
    ],
    categories: [
      {
        id: '7',
        value: 'cars',
        name: 'Cars & Motocycless',
      },
    ],
    brand: [
      {
        id: '11',
        value: 'yamaha',
        text: 'Yamaha',
      },
    ],
  },
  {
    id: '39',
    thumbnail: electronic12,
    title: 'TCL 47-inch 4K Ultra HD Smart TV',
    vendor: 'Go Pro',
    sale: true,
    price: '567.99',
    rating: true,
    salePrice: '670.00',
    ratingCount: '01',
    badge: [
      {
        type: 'sale',
        value: '-16%',
      },
    ],
    categories: [
      {
        id: '2',
        value: 'electronic',
        name: 'Consumer Electrics',
      },
    ],
    brand: [
      {
        id: '10',
        value: 'lg',
        text: 'LG Electronics',
      },
    ],
  },
  {
    id: '40',
    thumbnail: electronic14,
    title: 'Samsung 65-Inch 4K Ultra HD Smart LED TVr',
    vendor: 'Global Office',
    sale: false,
    price: '1600.99',
    rating: true,
    ratingCount: '01',
    categories: [
      {
        id: '2',
        value: 'electronic',
        name: 'Consumer Electrics',
      },
    ],
    brand: [
      {
        id: '9',
        value: 'samsung',
        text: 'Samsung',
      },
    ],
  },
  {
    id: '41',
    thumbnail: electronic7,
    title: 'LG Electrolux 500L Inverte Washing Machine',
    vendor: 'Young Shop',
    sale: true,
    price: '342.00',
    salePrice: '360.00',
    rating: true,
    ratingCount: '02',
    badge: [
      {
        type: 'sale',
        value: '-5%',
      },
    ],
    categories: [
      {
        id: '2',
        value: 'electronic',
        name: 'Consumer Electrics',
      },
    ],
    brand: [
      {
        id: '9',
        value: 'samsung',
        text: 'Samsung',
      },
    ],
  },
  {
    id: '61',
    thumbnail: technology2,
    title: 'Apple iPhone 7 Plus 128 GB – Red Color',
    vendor: 'Global Office',
    sale: true,
    price: '820.99',
    salePrice: '893.00',
    rating: true,
    ratingCount: '01',
    badge: [
      {
        type: 'sale',
        value: '11%',
      },
    ],
    categories: [
      {
        id: '4',
        value: 'technologies',
        name: 'Computers & Technologies',
      },
    ],
    brand: [
      {
        id: '1',
        value: 'apple',
        text: 'Apple',
      },
    ],
  },
  {
    id: '62',
    thumbnail: technology3,
    title: 'Apple MacBook Air Retina 13.3-Inch Laptop',
    vendor: 'Global Office',
    sale: true,
    price: '1020.99',
    salePrice: '1120.00',
    rating: true,
    ratingCount: '01',
    badge: [
      {
        type: 'sale',
        value: '21%',
      },
    ],
    categories: [
      {
        id: '4',
        value: 'technologies',
        name: 'Computers & Technologies',
      },
    ],
    brand: [
      {
        id: '1',
        value: 'apple',
        text: 'Apple',
      },
    ],
  },
];
exports.customerBought = [
  {
    id: '19',
    thumbnail: shop18,
    title: 'EPSION Plaster Printer',
    vendor: "Robert's Store",
    price: '233.28',
    rating: true,
    ratingCount: '4',
  },
  {
    id: '20',
    thumbnail: shop19,
    title: 'EPSION Plaster Printer',
    vendor: "Robert's Store",
    price: '233.28',
    rating: true,
    ratingCount: '5',
  },
  {
    id: '21',
    thumbnail: shop20,
    title: 'LG White Front Load Steam Washer',
    vendor: 'Young Shop',
    sale: true,
    price: '1,200.00',
    salePrice: '1362.99',
    rating: true,
    ratingCount: '5',
    badge: [
      {
        type: 'sale',
        value: '-28%',
      },
    ],
  },
  {
    id: '22',
    thumbnail: shop21,
    title: 'Edifier Powered Bookshelf Speakers',
    vendor: 'Young Shop',
    sale: true,
    price: '85.00',
    rating: true,
    ratingCount: '5',
  },
  {
    id: '24',
    thumbnail: shop22,
    title: 'Amcrest Security Camera in White Color',
    vendor: 'Global Office',
    sale: true,
    price: '45.90',
    salePrice: '56.99',
    rating: true,
    ratingCount: '5',
    badge: [
      {
        type: 'sale',
        value: '-28%',
      },
    ],
  },
  {
    id: '25',
    thumbnail: shop23,
    title: 'DJI Phantom 4 Quadcopter Camera',
    vendor: 'Go Pro',
    sale: true,
    price: '945.90',
    salePrice: '1,207.15',
    rating: true,
    ratingCount: '5',
    badge: [
      {
        type: 'sale',
        value: '-22%',
      },
    ],
  },
];
exports.onSale = [
  {
    id: '6',
    thumbnail: shop5,
    title: 'Grand Slam Indoor Of Show Jumping Novel',
    vendor: "Robert's Store",
    sale: true,
    price: '32.99',
    salePrice: '41.00',
    rating: true,
    ratingCount: '4',
    badge: [
      {
        type: 'sale',
        value: '-37%',
      },
    ],
    categories: [
      {
        id: '5',
        value: 'book',
        name: 'Books & Office',
      },
    ],
    brand: [
      {
        id: '4',
        value: 'megasystem',
        text: 'Mega System',
      },
    ],
  },
  {
    id: '7',
    thumbnail: shop6,
    title: 'Sound Intone I65 Earphone White Version',
    vendor: 'Youngshop',
    sale: true,
    price: '100.99',
    salePrice: '106.00',
    rating: true,
    ratingCount: '5',
    badge: [
      {
        type: 'sale',
        value: '-5%',
      },
    ],
    categories: [
      {
        id: '4',
        value: 'technologies',
        name: 'Computers & Technologies',
      },
    ],
    brand: [
      {
        id: '6',
        value: 'sony',
        text: 'Sony',
      },
    ],
  },
  {
    id: '8',
    thumbnail: shop7,
    title: 'Korea Long Sofa Fabric In Blue Navy Color',
    vendor: 'Youngshop',
    sale: true,
    price: '567.80',
    salePrice: '670.20',
    rating: true,
    ratingCount: '4',
    badge: [
      {
        type: 'sale',
        value: '-16%',
      },
    ],
    categories: [
      {
        id: '6',
        value: 'garden',
        name: 'Garden & Kitchen',
      },
    ],
    brand: [
      {
        id: '7',
        value: 'flatfuniture',
        text: 'Flat Funiture',
      },
    ],
  },
  {
    id: '9',
    thumbnail: shop8,
    title: 'Unero Military Classical Backpack',
    vendor: 'Young shop',
    sale: true,
    price: '35.89',
    salePrice: '42.20',
    rating: true,
    ratingCount: '3',
    badge: [
      {
        type: 'sale',
        value: '-16%',
      },
    ],
    categories: [
      {
        id: '3',
        value: 'clothing',
        name: 'Clothing & Apparel',
      },
    ],
    brand: [
      {
        id: '3',
        value: 'herschel',
        text: 'Herschel',
      },
    ],
  },
  {
    id: '14',
    thumbnail: shop13,
    title: 'MVMTH Classical Leather Watch In Black',
    vendor: 'Young Shop',
    sale: true,
    price: '57.99',
    salePrice: '62.99',
    rating: true,
    ratingCount: '5',
    badge: [
      {
        type: 'sale',
        value: '-7%',
      },
    ],
    categories: [
      {
        id: '3',
        value: 'clothing',
        name: 'Clothing & Apparel',
      },
    ],
    brand: [
      {
        id: '3',
        value: 'herschel',
        text: 'Herschel',
      },
    ],
  },
  {
    id: '15',
    thumbnail: shop14,
    title: 'Beat Spill 2.0 Wireless Speaker – White',
    vendor: 'Global Office',
    sale: true,
    price: '57.99',
    salePrice: '62.99',
    rating: true,
    ratingCount: '5',
    badge: [
      {
        type: 'sale',
        value: '-7%',
      },
    ],
    categories: [
      {
        id: '2',
        value: 'electronic',
        name: 'Consumer Electrics',
      },
    ],
    brand: [
      {
        id: '6',
        value: 'sony',
        text: 'Sony',
      },
    ],
  },
];
exports.sameBrands = [
  {
    id: '10',
    thumbnail: shop9,
    title: 'Rayban Rounded Sunglass Brown Color',
    vendor: 'Young shop',
    price: '35.89',
    rating: true,
    ratingCount: '5',
    categories: [
      {
        id: '3',
        value: 'clothing',
        name: 'Clothing & Apparel',
      },
    ],
  },
  {
    id: '11',
    thumbnail: shop10,
    title: 'Sleeve Linen Blend Caro Pane Shirt',
    vendor: 'Go Pro',
    price: '29.39 ',
    rating: true,
    ratingCount: '4',
    categories: [
      {
        id: '3',
        value: 'clothing',
        name: 'Clothing & Apparel',
      },
    ],
  },
];
exports.brands = [
  {
    id: '1',
    value: 'apple',
    text: 'Apple',
  },
  {
    id: '2',
    value: 'marshall',
    text: 'Marshall',
  },
  {
    id: '3',
    value: 'herschel',
    text: 'Herschel',
  },
  {
    id: '4',
    value: 'microsoft',
    text: 'Microsoft',
  },
  {
    id: '5',
    value: 'megasystem',
    text: 'Mega System',
  },
  {
    id: '6',
    value: 'sony',
    text: 'Sony',
  },
  {
    id: '7',
    value: 'flatfuniture',
    text: 'Flat Funiture',
  },
  {
    id: '8',
    value: 'gucci',
    text: 'Gucci',
  },
  {
    id: '8',
    value: 'asus',
    text: 'asus',
  },
  {
    id: '9',
    value: 'samsung',
    text: 'Samsung',
  },
  {
    id: '10',
    value: 'lg',
    text: 'LG Electronics',
  },
  {
    id: '11',
    value: 'yamaha',
    text: 'Yamaha',
  },
  {
    id: '12',
    value: 'gopro',
    text: 'Gopro',
  },
  {
    id: '13',
    value: 'unilever',
    text: 'Unilever',
  },
];
exports.sample = {
  id: '10',
  thumbnail: shop9,
  title: 'Rayban Rounded Sunglass Brown Color',
  vendor: 'Young shop',
  price: '35.89',
  rating: true,
  ratingCount: '5',
  categories: [
    {
      id: '3',
      value: 'clothing',
      name: 'Clothing & Apparel',
    },
  ],
  brand: [
    {
      id: '3',
      value: 'herschel',
      text: 'Herschel',
    },
  ],
};
exports.countdown = {
  id: '8',
  thumbnail: shop7,
  title: 'Korea Long Sofa Fabric In Blue Navy Color',
  vendor: 'Youngshop',
  sale: true,
  price: '567.80',
  salePrice: '670.20',
  rating: true,
  ratingCount: '4',
  badge: [
    {
      type: 'sale',
      value: '-16%',
    },
  ],
  categories: [
    {
      id: '6',
      value: 'garden',
      name: 'Garden & Kitchen',
    },
  ],
  brand: [
    {
      id: '7',
      value: 'flatfuniture',
      text: 'Flat Funiture',
    },
  ],
};
exports.extended = {
  id: '3',
  thumbnail: shop2,
  title: 'Marshall Kilburn Portable Wireless Speaker',
  vendor: 'Go Pro',
  price: '42.99',
  salePrice: '56.25',
  sale: true,
  rating: true,
  ratingCount: '5',
  categories: [
    {
      id: '2',
      value: 'electronic',
      name: 'Consumer Electrics',
    },
  ],
  brand: [
    {
      id: '2',
      value: 'marshall',
      text: 'Marshall',
    },
  ],
};
exports.gropped = {
  id: '22',
  thumbnail: shop21,
  title: 'Edifier Powered Bookshelf Speakers',
  vendor: 'Young Shop',
  sale: true,
  price: '85.00',
  salePrice: '96.00',
  rating: true,
  ratingCount: '5',
  categories: [
    {
      id: '2',
      value: 'electronic',
      name: 'Consumer Electrics',
    },
  ],
  brand: [
    {
      id: '2',
      value: 'marshall',
      text: 'Marshall',
    },
  ],
};
exports.relatedProduct = [
  {
    id: '54',
    thumbnail: shop7,
    title: 'Stadler Form Otto African Sapele Wood',
    vendor: 'Global Office',
    sale: false,
    price: '127.59',
    rating: true,
    ratingCount: '01',
    categories: [
      {
        id: '6',
        value: 'garden',
        name: 'Garden & Kitchen',
      },
    ],
    brand: [
      {
        id: '7',
        value: 'flatfuniture',
        text: 'Flat Funiture',
      },
    ],
  },
  {
    id: '55',
    thumbnail: shop1,
    title: 'Aveeno Moisturizing Body Shower 450ml',
    vendor: 'Young Shop',
    sale: true,
    price: '47.99',
    salePrice: '59.00',
    rating: true,
    ratingCount: '01',
    badge: [
      {
        type: 'sale',
        value: '-16%',
      },
    ],
    categories: [
      {
        id: '8',
        value: 'beauty',
        name: 'Health & Beauty',
      },
    ],
    brand: [
      {
        id: '13',
        value: 'unilever',
        text: 'Unilever',
      },
    ],
  },
  {
    id: '56',
    thumbnail: shop3,
    title: 'Baxter Care Hair Kit For Bearded Mens',
    vendor: 'Young Shop',
    sale: true,
    price: '42.00',
    salePrice: '60.00',
    rating: true,
    ratingCount: '02',
    badge: [
      {
        type: 'sale',
        value: '-25%',
      },
    ],
    categories: [
      {
        id: '8',
        value: 'beauty',
        name: 'Health & Beauty',
      },
    ],
    brand: [
      {
        id: '13',
        value: 'unilever',
        text: 'Unilever',
      },
    ],
  },
  {
    id: '57',
    thumbnail: shop4,
    title: 'Anna Sui Putty Mask Perfection',
    vendor: 'Global Office',
    sale: false,
    price: '25.00',
    rating: true,
    ratingCount: '01',
    categories: [
      {
        id: '8',
        value: 'beauty',
        name: 'Health & Beauty',
      },
    ],
    brand: [
      {
        id: '13',
        value: 'unilever',
        text: 'Unilever',
      },
    ],
  },
  {
    id: '58',
    thumbnail: shop5,
    title: 'Set 30 Piece Korea StartSkin Natural Mask',
    vendor: 'Global Office',
    sale: false,
    price: '85.00',
    rating: true,
    ratingCount: '01',
    categories: [
      {
        id: '8',
        value: 'beauty',
        name: 'Health & Beauty',
      },
    ],
    brand: [
      {
        id: '13',
        value: 'unilever',
        text: 'Unilever',
      },
    ],
  },
  {
    id: '59',
    thumbnail: shop6,
    title: 'Ciate Palemore Lipstick Bold Red Color',
    vendor: 'Global Store',
    sale: false,
    price: '92.00',
    rating: true,
    ratingCount: '01',
    categories: [
      {
        id: '8',
        value: 'beauty',
        name: 'Health & Beauty',
      },
    ],
    brand: [
      {
        id: '13',
        value: 'unilever',
        text: 'Unilever',
      },
    ],
  },
  {
    id: '60',
    thumbnail: shop7,
    title: 'Apple iPhone X 256GB T-Mobile – Black',
    sale: true,
    price: '1389.99',
    salePrice: '1893.00',
    rating: true,
    ratingCount: '01',
    badge: [
      {
        type: 'sale',
        value: '11%',
      },
    ],
    categories: [
      {
        id: '4',
        value: 'technologies',
        name: 'Computers & Technologies',
      },
    ],
    brand: [
      {
        id: '1',
        value: 'apple',
        text: 'Apple',
      },
    ],
  },
  {
    id: '61',
    thumbnail: shop7,
    title: 'Apple iPhone 7 Plus 128 GB – Red Color',
    vendor: 'Global Office',
    sale: true,
    price: '820.99',
    salePrice: '893.00',
    rating: true,
    ratingCount: '01',
    badge: [
      {
        type: 'sale',
        value: '11%',
      },
    ],
    categories: [
      {
        id: '4',
        value: 'technologies',
        name: 'Computers & Technologies',
      },
    ],
    brand: [
      {
        id: '1',
        value: 'apple',
        text: 'Apple',
      },
    ],
  },
  {
    id: '62',
    thumbnail: shop8,
    title: 'Apple MacBook Air Retina 13.3-Inch Laptop',
    vendor: 'Global Office',
    sale: true,
    price: '1020.99',
    salePrice: '1120.00',
    rating: true,
    ratingCount: '01',
    badge: [
      {
        type: 'sale',
        value: '21%',
      },
    ],
    categories: [
      {
        id: '4',
        value: 'technologies',
        name: 'Computers & Technologies',
      },
    ],
    brand: [
      {
        id: '1',
        value: 'apple',
        text: 'Apple',
      },
    ],
  },
];
