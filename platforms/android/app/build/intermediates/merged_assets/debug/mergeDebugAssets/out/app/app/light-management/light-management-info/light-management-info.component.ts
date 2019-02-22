import { Component, OnInit, Input } from '@angular/core';
import { Scene } from '~/app/models/scene.model';
import { Store } from '@ngrx/store';
import { AppState } from '~/app/store/app.state';
import { UpdateUserAction, UpdateUserStateAction } from '~/app/store/user/user.actions';
import { User } from '~/app/models/user.model';
import { GroupState } from '~/app/models/GroupState.model';

@Component({
	moduleId: module.id,
	selector: 'light-management-info',
	templateUrl: './light-management-info.component.html',
	styleUrls: ['./light-management-info.component.css']
})

export class LightManagementInfoComponent implements OnInit {

	@Input() scene: Scene;
	@Input() even: any;
	@Input() user: User;
	@Input() editMode: boolean;

	sceneGroupState: GroupState;
	groupState: GroupState = null;
	checked: boolean = false;
	changed: boolean = false;

	constructor(private store: Store<AppState>) { }

	ngOnInit() {
		// this.sceneGroupState = new GroupState(this.scene.groupId, this.scene.id);
		// this.checked = this.scene.enableOnHome;
	}

	onCheckedNoEdit(_switch) {
		// if the switch's status does not match the stored status and we are not in edit mode,
		// then flip the switch back to match the scene
		if (_switch.checked !== this.scene.enableOnHome) {
			_switch.checked = this.scene.enableOnHome;
		}
	}

	onCheckedEdit(args) {
		// if the switch is checked, set the group state to the scene's group state
		// otherwise set it to null
		this.changed = !this.changed;
		this.checked = args.object.checked;
		if (args.object.checked) {
			this.groupState = this.sceneGroupState;
		} else {
			this.groupState = null;
		}
	}

}