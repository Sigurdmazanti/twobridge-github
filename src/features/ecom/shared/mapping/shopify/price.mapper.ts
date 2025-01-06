import { PriceDto } from '../../dto/price.dto';

export function mapShopifyPrice(discountedPrice: any, originalPrice?: any): PriceDto {
	const mp: PriceDto = {};
    const dp = discountedPrice;
    const op = originalPrice;

    if(dp.amount) mp.price = Number(dp.amount)
    if(dp.currencyCode) mp.currencyCode = dp.currencyCode
    if(dp.currencyCode && dp.amount) mp.priceFormatted = `${dp.amount} ${dp.currencyCode}`

	return mp;
}

export function mapShopifyUnitPrice(price: any): PriceDto {
	const mp: PriceDto = {};

    if(price.amount) mp.price = price.amount
    if(price.currencyCode) mp.price = price.currencyCode
    if(price.currencyCode && price.amount) mp.priceFormatted = `${price.amount} ${price.currencyCode}`;

	return mp;
}