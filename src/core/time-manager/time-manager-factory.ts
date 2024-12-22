import {CurrentTimeZoneTimeManager} from "@/core/time-manager/time-manager";

export class TimeManagerFactory {
    static create() {
        return new CurrentTimeZoneTimeManager();
    }
}