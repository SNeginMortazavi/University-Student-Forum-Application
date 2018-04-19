import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    animations: [routerTransition()]
})
export class DashboardComponent implements OnInit {
    public alerts: Array<any> = [];
    public sliders: Array<any> = [];

    constructor() {
        this.sliders.push(
            {
                imagePath: 'assets/images/slider1.jpg',
                label: 'Spring is here on campus',
                text:
                    'New Activity: There is Spring Outing!!'
            },
            {
                imagePath: 'assets/images/slider2.jpg',
                label: 'Update your Student Card',
                text: 'Please Notice!!Your card is expired.',
                color: 'black'
            },
            {
                imagePath: 'assets/images/slider3.jpg',
                label: 'XXX will visit our campus from Boston',
                text:
                    'Bring your question and ask her!'
            }
        );

        this.alerts.push(
            {
                id: 1,
                type: 'success',
                message: `Your tuition payment has not been done. And the deadline is tomorrow. `,
                link: 'https://prod-web.neu.edu/wasapp/StudentFinancialServices/secure/main.action',
                linkMessage: 'Make the Payment!'
            },
            {
                id: 2,
                type: 'warning',
                message: `Don't miss deadline for registering next semester. Here is the link.`,
                link: 'https://nubanner.neu.edu/StudentRegistrationSsb/ssb/registration',
                linkMessage: 'Register Now!'

            }
        );
    }

    ngOnInit() {}

    public closeAlert(alert: any) {
        const index: number = this.alerts.indexOf(alert);
        this.alerts.splice(index, 1);
    }
}
