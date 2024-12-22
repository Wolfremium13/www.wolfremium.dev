import {UuidManagerGenerator} from "@/core/uuid-manager/uuid-manager";

export class UuidManagerFactory {
    static create() {
        return new UuidManagerGenerator();
    }
}