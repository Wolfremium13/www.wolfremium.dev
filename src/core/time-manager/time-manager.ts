export interface TimeManager {
    now(): DateTime;
}

export class DateTime {
    constructor(private readonly date: Date) {
    }

    toString(): string {
        return this.date.toISOString();
    }
}

export class CurrentTimeZoneTimeManager implements TimeManager {
    now(): DateTime {
        return new DateTime(new Date());
    }
}