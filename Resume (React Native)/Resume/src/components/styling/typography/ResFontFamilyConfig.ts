import { assert } from "../../../language/assertions/Assert";
import { UnreachableCaseError } from "../../../language/errors/UnreachableCaseError";
import { ResFont } from "./ResFont";
import { ResFontWeight } from "./ResFontWeight";

class ResFontFamilyConfig {
    private readonly regular: ResFont | null;
    private readonly semiBold: ResFont | null;
    private readonly bold: ResFont | null;
    private readonly black: ResFont | null;
    private readonly italic: ResFont | null;
    private readonly semiBoldItalic: ResFont | null;
    private readonly boldItalic: ResFont | null;
    private readonly blackItalic: ResFont | null;

    constructor(
        regular: ResFont | null,
        semiBold: ResFont | null,
        bold: ResFont | null,
        black: ResFont | null,
        italic: ResFont | null,
        semiBoldItalic: ResFont | null,
        boldItalic: ResFont | null,
        blackItalic: ResFont | null,
    ) {
        this.regular = regular;
        this.semiBold = semiBold;
        this.bold = bold;
        this.black = black;
        this.italic = italic;
        this.semiBoldItalic = semiBoldItalic;
        this.boldItalic = boldItalic;
        this.blackItalic = blackItalic;
    }

    public getFont(weight: ResFontWeight, isItalic: boolean): ResFont {
        switch (weight) {
            case ResFontWeight.regular:
                let regular = isItalic ? this.italic : this.regular;
                assert(regular != null, "Font requested not provided/available");
                return regular!;
            case ResFontWeight.semiBold:
                let semiBold = isItalic ? this.semiBoldItalic : this.semiBold;
                assert(semiBold != null, "Font requested not provided/available");
                return semiBold!;
            case ResFontWeight.bold:
                let bold = isItalic ? this.boldItalic : this.bold;
                assert(bold != null, "Font requested not provided/available");
                return bold!;
            case ResFontWeight.black:
                let black = isItalic ? this.blackItalic : this.black;
                assert(black != null, "Font requested not provided/available");
                return black!;
            default:
                throw new UnreachableCaseError(weight);
        }
    }
}

export default ResFontFamilyConfig;
