import { BadRequestException } from "@nestjs/common";
import { testDtoValidation } from "src/common/helpers/test-helper";
import { GetUserOrdersQueryParamsDto, GetUserOrdersResponseDto } from "./get-user-orders.dto";
import { OrderDto } from "./order.dto";
import { OrderLineDto } from "./orderline.dto";

describe('Orders DTO validation tests', () => {
    it('should validate GetUserOrdersQueryParamsDto with invalid data types', async () => {
        await expect(testDtoValidation(GetUserOrdersQueryParamsDto)).rejects.toThrow(
            BadRequestException,
        );
    });

    it('should validate GetUserOrdersResponseDto with invalid data types', async () => {
        await expect(testDtoValidation(GetUserOrdersResponseDto)).rejects.toThrow(
            BadRequestException,
        );
    });

    it('should validate OrderDto with invalid data types', async () => {
        await expect(testDtoValidation(OrderDto)).rejects.toThrow(
            BadRequestException,
        );
    });

    it('should validate OrderLineDto with invalid data types', async () => {
        await expect(
            testDtoValidation(OrderLineDto),
        ).rejects.toThrow(BadRequestException);
    });
});