import { PriceDto } from '../../dto/price.dto';

export function mapDynamicwebPrice(p: any): PriceDto {
	const mp: PriceDto = {};

	if (p.showPricesWithVat !== undefined) mp.showPricesWithVat = p.showPricesWithVat;
	if (p.price !== undefined) mp.price = p.price;
	if (p.priceFormatted !== undefined) mp.priceFormatted = p.priceFormatted;
	if (p.priceWithoutVat !== undefined) mp.priceWithoutVat = p.priceWithoutVat;
	if (p.priceWithoutVatFormatted !== undefined)
		mp.priceWithoutVatFormatted = p.priceWithoutVatFormatted;
	if (p.priceWithVat !== undefined) mp.priceWithVat = p.priceWithVat;
	if (p.priceWithVatFormatted !== undefined)
		mp.priceWithVatFormatted = p.priceWithVatFormatted;
	if (p.vat !== undefined) mp.vat = p.vat;
	if (p.vatFormatted !== undefined) mp.vatFormatted = p.vatFormatted;
	if (p.vatPercent !== undefined) mp.vatPercent = p.vatPercent;
	if (p.vatPercentFormatted !== undefined) mp.vatPercentFormatted = p.vatPercentFormatted;
	if (p.currencyCode !== undefined) mp.currencyCode = p.currencyCode;

	return mp;
}
