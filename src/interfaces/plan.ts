export default interface Plan {
    shortName: string;
    shortKey: string;
    type: string;
    enabled: boolean;
    link: {
        href: string;
        rel: string;
    };
    key: string;
    name: string;
    planKey: {
        key: string;
    };
}
