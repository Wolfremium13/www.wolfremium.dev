import {Uuid} from "@/core/uuid-manager/uuid";
import { v4 as uuidv4 } from 'uuid';

export interface UuidManager {
    generate(): Uuid;
}

export class UuidManagerGenerator implements UuidManager {
    generate(): Uuid {
        return Uuid.create(uuidv4());
    }
}