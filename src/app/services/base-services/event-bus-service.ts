import { Injectable } from "@angular/core";
import { filter, map, Subject, Subscription } from "rxjs";
import { EventModel } from "../../models/event-model";

@Injectable({ providedIn: 'root' })
export class EventBusService {
    private subject$ = new Subject<EventModel>();

    emit(event: EventModel) {
        this.subject$.next(event);
    }

    on(eventName: string, action: any): Subscription {
        return this.subject$.pipe(
            filter((e: EventModel) => e.name === eventName),
            map((e: EventModel) => e["value"])).subscribe(action);
    }
}
