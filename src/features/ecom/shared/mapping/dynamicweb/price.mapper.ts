import { PriceDto } from '../../dto/price.dto';

export function mapDynamicwebPrice(p: any): PriceDto {
    const mp: PriceDto = {};

    if (p.showPricesWithVat) mp.showPricesWithVat = p.showPricesWithVat;
    if (p.price) mp.price = p.price;
    if (p.priceFormatted) mp.priceFormatted = p.priceFormatted;
    if (p.priceWithoutVat) mp.priceWithoutVat = p.priceWithoutVat;
    if (p.priceWithoutVatFormatted) mp.priceWithoutVatFormatted = p.priceWithoutVatFormatted;
    if (p.priceWithVat) mp.priceWithVat = p.priceWithVat;
    if (p.priceWithVatFormatted) mp.priceWithVatFormatted = p.priceWithVatFormatted;
    if (p.vat) mp.vat = p.vat;
    if (p.vatFormatted) mp.vatFormatted = p.vatFormatted;
    if (p.vatPercent) mp.vatPercent = p.vatPercent;
    if (p.vatPercentFormatted) mp.vatPercentFormatted = p.vatPercentFormatted;
    if (p.currencyCode) mp.currencyCode = p.currencyCode;

    return mp;
}