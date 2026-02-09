export interface Case {
    title: string;
    text: string;
    tags: string[];
    assets: Asset[];
    youtube?: string;
}

export interface Asset {
    type: 'img' | 'video' | 'json';
    src: string;
}

export interface Item {
    title: string;
    text: string;
    src: string;
};