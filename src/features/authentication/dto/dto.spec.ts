import { BadRequestException } from "@nestjs/common";
import { RefreshTokenResponseDto } from "./refresh-token.dto";
import { testDtoValidation } from "src/common/helpers/test-helper";
import { SignInRequestDto, SignInResponseDto } from "./sign-in.dto";

describe('Authentication DTO validation tests', () => {
    it('should validate RefreshTokenResponseDto with invalid data types', async () => {
        await expect(testDtoValidation(RefreshTokenResponseDto)).rejects.toThrow(
            BadRequestException,
        );
    });

    it('should validate SignInRequestDto with invalid data types', async () => {
        await expect(testDtoValidation(SignInRequestDto)).rejects.toThrow(
            BadRequestException,
        );
    });

    it('should validate SignInResponseDto with invalid data types', async () => {
        await expect(
            testDtoValidation(SignInResponseDto),
        ).rejects.toThrow(BadRequestException);
    });
});