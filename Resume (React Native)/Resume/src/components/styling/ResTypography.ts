import ResColors from "./ResColors";
import { ResFontFamily } from "./typography/ResFontFamily";
import { ResFontWeight } from "./typography/ResFontWeight";
import ResTypographyConfig from "./typography/ResTypographyConfig";

class ResTypography {
    static get pageTitle(): ResTypographyConfig {
        return new ResTypographyConfig(32, ResFontFamily.gilroy, ResColors.textDark, ResFontWeight.black);
    }

    static get splash(): ResTypographyConfig {
        return new ResTypographyConfig(34, ResFontFamily.circular, ResColors.textDark, ResFontWeight.black);
    }

    static get standoutBody(): ResTypographyConfig {
        return new ResTypographyConfig(16, ResFontFamily.plexMono, ResColors.textDark);
    }

    static get body(): ResTypographyConfig {
        return new ResTypographyConfig(14, ResFontFamily.plexMono, ResColors.textDark);
    }

    static get subscript(): ResTypographyConfig {
        return new ResTypographyConfig(14, ResFontFamily.plexMono, ResColors.textSemiDark);
    }

    static get subscriptLabel(): ResTypographyConfig {
        return new ResTypographyConfig(11.5, ResFontFamily.plexMono, ResColors.textSemiDark);
    }

    static get chip(): ResTypographyConfig {
        return new ResTypographyConfig(11.5, ResFontFamily.plexMono, ResColors.textLightPersistent);
    }

    static get button(): ResTypographyConfig {
        return new ResTypographyConfig(15, ResFontFamily.plexMono, ResColors.textLight);
    }

    static get buttonSmall(): ResTypographyConfig {
        return new ResTypographyConfig(14, ResFontFamily.plexMono, ResColors.textLight);
    }

    static get sectionTitle(): ResTypographyConfig {
        return new ResTypographyConfig(26, ResFontFamily.gilroy, ResColors.textDark, ResFontWeight.black);
    }

    static get header(): ResTypographyConfig {
        return new ResTypographyConfig(
            31,
            ResFontFamily.circular,
            ResColors.textDark,
            ResFontWeight.black,
            false,
            false,
            false,
            -0.5,
        );
    }
}

export default ResTypography;
