export const mapGetShopifyCustomerIdByTokenResponse = (q: any): string => {
	const id = q.data?.customer?.id;

	return id;
};
