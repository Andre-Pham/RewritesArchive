import { UnreachableCaseError } from "../../../language/errors/UnreachableCaseError";
import { ResFont } from "./ResFont";
import ResFontFamilyConfig from "./ResFontFamilyConfig";

export enum ResFontFamily {
    poppins,
    circular,
    plexMono,
    gilroy,
}

export namespace ResFontFamily {
    export function getConfig(family: ResFontFamily): ResFontFamilyConfig {
        switch (family) {
            case ResFontFamily.poppins:
                return new ResFontFamilyConfig(
                    ResFont.poppinsMedium,
                    ResFont.poppinsSemiBold,
                    ResFont.poppinsBold,
                    null,
                    ResFont.poppinsMediumItalic,
                    ResFont.poppinsSemiBoldItalic,
                    ResFont.poppinsBoldItalic,
                    null,
                );
            case ResFontFamily.circular:
                return new ResFontFamilyConfig(
                    ResFont.circularMedium,
                    null,
                    ResFont.circularBold,
                    ResFont.circularBlack,
                    ResFont.circularMediumItalic,
                    null,
                    ResFont.circularBoldItalic,
                    ResFont.circularBlackItalic,
                );
            case ResFontFamily.plexMono:
                return new ResFontFamilyConfig(
                    ResFont.plexMonoMedium,
                    ResFont.plexMonoSemiBold,
                    ResFont.plexMonoBold,
                    null,
                    ResFont.plexMonoMediumItalic,
                    ResFont.plexMonoSemiBoldItalic,
                    ResFont.plexMonoBoldItalic,
                    null,
                );
            case ResFontFamily.gilroy:
                return new ResFontFamilyConfig(null, null, null, ResFont.gilroyExtraBold, null, null, null, null);
            default:
                throw new UnreachableCaseError(family);
        }
    }
}
