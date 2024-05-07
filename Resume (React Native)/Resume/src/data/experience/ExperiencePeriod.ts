import Experience from "./Experience";

class ExperiencePeriod {
    constructor(
        public readonly label: number | "Active",
        public readonly experiences: Experience[],
    ) {}
}

export default ExperiencePeriod;
