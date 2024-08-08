import { Members } from "../entities/Members";

export interface IMembersRepository {
    get(): Promise<Members[]>;
}