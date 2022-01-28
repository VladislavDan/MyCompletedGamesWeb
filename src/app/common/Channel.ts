import {Observable, Subject, Subscription} from 'rxjs';

export class Channel<A, D> {

    private readonly outputSubject: Subject<D>;
    private observableCreator: (arg: A) => Observable<D>;
    private subscriptions: Subscription[] = [];

    constructor(observableCreator: (arg: A) => Observable<D>) {
        this.outputSubject = new Subject<D>();
        this.observableCreator = observableCreator;
    }

    next(value: A) {
        this.subscriptions.push(this.observableCreator(value).subscribe((value) => {
            this.outputSubject.next(value);
        }));
    }

    subscribe(next?: (data: D) => void, errorHandler?: (error: Error) => void): Subscription {


        const outputSubjectSubscription = this.outputSubject.subscribe(
            (data: D) => {
                if(next) {
                    next(data)
                }
            },
            (error: Error) => {
                if(errorHandler) {
                    errorHandler(error);
                }
                console.error(error)
            }
        );
        this.subscriptions.push(outputSubjectSubscription);
        return outputSubjectSubscription;
    }

    unsubscribe() {
        this.subscriptions.forEach((subscribtion: Subscription) => {
            if(!subscribtion.closed) {
                subscribtion.unsubscribe();
            }
        });
        this.subscriptions = [];
    }
}
