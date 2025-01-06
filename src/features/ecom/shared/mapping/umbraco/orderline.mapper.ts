import { OrderLineDto } from 'src/features/ecom/orders/dto/orderline.dto';
import { mapUmbracoPrice } from './price.mapper';


export function mapUmbracoOrderline(ol: any): OrderLineDto {
    const mol: OrderLineDto = {};

    if (ol.id) mol.id = ol.id;
    if (ol.productReference) mol.productId = ol.productReference;
    if (ol.productVariantReference) mol.productVariantId = ol.productVariantReference;
    if (ol.productLanguageId) mol.productLanguageId = ol.productLanguageId;
    if (ol.name) mol.productName = ol.name;
    if (ol.sku) mol.productNumber = ol.sku;
    if (ol.productVariantName) mol.productVariantName = ol.productVariantName;
    if (ol.productImage) mol.productImage = ol.productImage;
    if (ol.quantity) mol.quantity = ol.quantity;
    if (ol.unitPrice) mol.unitPrice = mapUmbracoPrice(ol.unitPrice);
    if (ol.totalPrice) mol.price = mapUmbracoPrice(ol.totalPrice);
    
    return mol;
}