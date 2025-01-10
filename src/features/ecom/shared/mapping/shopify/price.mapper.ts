import { PriceDto } from '../../dto/price.dto';

export function mapShopifyPrice(discountedPrice: any): PriceDto {
	const mp: PriceDto = {};
	const dp = discountedPrice;

	if(!dp)
		return mp;

	if (dp.amount !== undefined) mp.price = Number(dp.amount);
	if (dp.currencyCode !== undefined) mp.currencyCode = dp.currencyCode;
	if (dp.currencyCode !== undefined && dp.amount !== undefined)
		mp.priceFormatted = `${dp.amount} ${dp.currencyCode}`;

	return mp;
}

export function mapShopifyUnitPrice(price: any): PriceDto {
	const mp: PriceDto = {};

	if(!price)
		return mp;

	if (price.amount !== undefined) mp.price = price.amount;
	if (price.currencyCode !== undefined) mp.price = price.currencyCode;
	if (price.currencyCode !== undefined && price.amount !== undefined)
		mp.priceFormatted = `${price.amount} ${price.currencyCode}`;

	return mp;
}
