import { Component, OnInit, Input } from '@angular/core';
import { HueService } from '../services/hue.service';
import { Store } from '@ngrx/store';
import { AppState } from '../store/app.state';
import { map } from 'rxjs/operators';
import { User } from '../models/user.model';
import { EventData } from 'tns-core-modules/ui/page/page';

@Component({
	moduleId: module.id,
	selector: 'light-management',
	templateUrl: './light-management.component.html',
	styleUrls: ['./light-management.component.css']
})

export class LightManagementComponent implements OnInit {

	@Input() user: User;
	lightString: String = 'light state';

	lightStates: any[] = [];

	constructor(private hueService: HueService) { }

	ngOnInit() {
		console.log('Init with user: ' + JSON.stringify(this.user));
		this.hueService.getLights(this.user.bridgeIpAddress, this.user.username).subscribe(res => {
			console.log('******************' + res.keys);
			// this.lightStates = Object.keys(res).map(e => res[e]);
			// console.log('Mapped light states: ' + JSON.stringify(this.lightStates));
			this.lightString = JSON.stringify(res);
		});
	}

	getLightState(args: EventData) {
		console.log("hello");
	}
}