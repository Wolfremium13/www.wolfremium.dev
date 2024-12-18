import {CurrentTimeZoneTimeManager} from "@/core/shared/time-manager/time-manager";

export class TimeManagerFactory {
    static create() {
        return new CurrentTimeZoneTimeManager();
    }
}