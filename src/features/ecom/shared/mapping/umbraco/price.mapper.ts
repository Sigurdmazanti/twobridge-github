import { PriceDto } from '../../dto/price.dto';

export function mapUmbracoPrice(p: any): PriceDto {
    const mp: PriceDto = {};
    const v = p.value;
    
    if (p.showPricesWithVat) mp.showPricesWithVat = p.showPricesWithVat;
    if (v.withTax || p.value) mp.price = v.withTax || p.value;
    if (v.formatted?.withTax || p.formatted?.value) mp.priceFormatted = v.formatted?.withTax || p.formatted?.value;
    if (v.withoutTax) mp.priceWithoutVat = v.withoutTax;
    if (v.formatted?.withoutTax) mp.priceWithoutVatFormatted = v.formatted?.withoutTax
    if (v.withTax) mp.priceWithVat = v.withTax;
    if (v.formatted?.withoutTax) mp.priceWithVatFormatted = v.formatted?.withoutTax;
    if (v.tax) mp.vat = v.tax;
    if (v.formatted?.tax) mp.vatFormatted = v.formatted?.tax;
    if (p.vatPercent) mp.vatPercent = p.vatPercent;
    if (p.vatPercentFormatted) mp.vatPercentFormatted = p.vatPercentFormatted;
    if (v.currency?.code) mp.currencyCode = v.currency?.code;

    return mp;
}