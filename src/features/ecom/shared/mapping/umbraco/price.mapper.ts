import { PriceDto } from '../../dto/price.dto';

export function mapUmbracoPrice(p: any): PriceDto {
	const mp: PriceDto = {};
	const v = p.value;

	if (p.showPricesWithVat !== undefined) mp.showPricesWithVat = p.showPricesWithVat;
	if (v.withTax !== undefined || p.value !== undefined) mp.price = v.withTax || p.value;
	if (v.formatted?.withTax !== undefined || p.formatted?.value !== undefined)
		mp.priceFormatted = v.formatted?.withTax || p.formatted?.value;
	if (v.withoutTax !== undefined) mp.priceWithoutVat = v.withoutTax;
	if (v.formatted?.withoutTax !== undefined)
		mp.priceWithoutVatFormatted = v.formatted?.withoutTax;
	if (v.withTax !== undefined) mp.priceWithVat = v.withTax;
	if (v.formatted?.withoutTax !== undefined)
		mp.priceWithVatFormatted = v.formatted?.withoutTax;
	if (v.tax !== undefined) mp.vat = v.tax;
	if (v.formatted?.tax !== undefined) mp.vatFormatted = v.formatted?.tax;
	if (p.vatPercent !== undefined) mp.vatPercent = p.vatPercent;
	if (p.vatPercentFormatted !== undefined) mp.vatPercentFormatted = p.vatPercentFormatted;
	if (v.currency?.code !== undefined) mp.currencyCode = v.currency?.code;

	return mp;
}
