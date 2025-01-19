export const addressFragment = `
fragment AddressFields on MailingAddress {
    address1
    address2
    zip
    city
    country
    countryCodeV2
    company
    province
}
`;

export const priceFragment = `
fragment PriceFields on MoneyV2 {
    amount
    currencyCode
}
`;

export const variantFragment = `
fragment VariantFields on ProductVariant {
    id
    title
    sku
    image {
        url
    }
    product {
        id
        title
    }
    unitPrice {
        ...PriceFields
    }
}
${priceFragment}
`;

export const lineItemFragment = `
fragment LineItemFields on OrderLineItem {
    title
    quantity
    originalTotalPrice {
        ...PriceFields
    }
    discountedTotalPrice {
        ...PriceFields
    }
    variant {
        ...VariantFields
    }
}
${priceFragment}
${variantFragment}
`;

export const orderFragment = `
fragment OrderFields on Order {
    id
    name
    orderNumber
    processedAt
    fulfillmentStatus
    totalPrice {
        ...PriceFields
    }
    subtotalPrice {
        ...PriceFields
    }
    currentTotalTax {
        ...PriceFields
    }
    currentTotalPrice {
        ...PriceFields
    }
    originalTotalPrice {
        ...PriceFields
    }
    currentSubtotalPrice {
        ...PriceFields
    }
    totalTax {
        ...PriceFields
    }
    totalShippingPrice {
        ...PriceFields
    }
    originalTotalDuties {
        ...PriceFields
    }
    shippingAddress {
        ...AddressFields
    }
    lineItems(first: 99) {
        edges {
            node {
                ...LineItemFields
            }
        }
    }
}
${priceFragment}
${addressFragment}
${lineItemFragment}
`;
