export class Books {
    constructor(
        public readonly id: number,
        public readonly code: string,
        public readonly title: string,
        public readonly author: string,
        public readonly stock: number,
    ) {}
}