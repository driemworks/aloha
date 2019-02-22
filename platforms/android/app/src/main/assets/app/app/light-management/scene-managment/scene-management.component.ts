import { Component, OnInit, Input } from '@angular/core';
import { GroupScene } from '~/app/models/GroupScene.model';
import { AppState } from '~/app/store/app.state';
import { Store } from '@ngrx/store';
import { UpdateUserAction } from '~/app/store/user/user.actions';
import { User } from '~/app/models/user.model';
import { GroupState } from '~/app/models/GroupState.model';
import { ListPicker} from "tns-core-modules/ui/list-picker";
import { UpdateLightStateAction } from '~/app/store/hue/hue.actions';

@Component({
	moduleId: module.id,
	selector: 'scene-management',
	templateUrl: './scene-management.component.html',
	styleUrls: ['./scene-management.component.css']
})

export class SceneManagementComponent implements OnInit {

	@Input() groupScene: GroupScene;
	@Input() user: User;

	scenes: any[] = [];
	enabledSceneName = '';
	showPanel = false;
	sceneChanged = false;
	selectedScene: any = null;
	checked = false;

	constructor(private store: Store<AppState>) { }

	ngOnInit() {
		this.groupScene.scenes.forEach(scene => {
			if (scene.enableOnHome) {
				this.enabledSceneName = scene.name;
			}
			this.scenes.push(scene.name);	
		});
		this.selectedScene = 0;
	}

	saveChange() {
		console.log('selected scene ' + this.selectedScene);
		// if the user has not set up any group states, init the array
		if (!this.user.groupStates) {
			console.log('the group states were null');
			this.user.groupStates = [];
		}
		let oldUser = Object.assign({}, this.user); 
		this.groupScene.scenes.forEach(scene => {
			if (JSON.stringify(this.selectedScene) === JSON.stringify(scene.name)) {
				let sceneId = scene.id;
				let groupState: GroupState = {
					groupId: this.groupScene.groupId.toString(),
					sceneId: sceneId.toString()
				}
				// CASE: This is the first time a group is being set up
				if (this.user.groupStates.length === 0) {
					// just append to the users group states
					this.user.groupStates.push(groupState)
				} else {
					// CASE: group states exist, so we may need to remove an old configuration
					var index = this.user.groupStates.findIndex(groupstate => groupstate.groupId == this.groupScene.groupId);
					if (index > -1) {
						// a group was already configured, so removed existing configuration
						this.user.groupStates.splice(index, 1);
						console.log('Splicing old configuration ' + JSON.stringify(this.user.groupStates));
					}
					// push new group state
					this.user.groupStates.push(groupState);
					console.log('Pushed new group state ' + JSON.stringify(this.user.groupStates));
				}
			}
		});
		// update lights with new group states
		this.store.dispatch(new UpdateLightStateAction(this.user, true, true));
		// persist new group states
		this.store.dispatch(new UpdateUserAction(this.user));
		// then collapse the panel
		this.reset();
	}	

	cancelChange() {
		console.log('canceling, but you had selected index ' + JSON.stringify(this.selectedScene));
		this.reset();
	}

	reset() {
		this.sceneChanged = false;
		this.selectedScene = null;
		this.showPanel = false;
	}

	handleClick() {
		console.log('Enabled scene: ' + JSON.stringify(this.enabledSceneName));
		this.showPanel = !this.showPanel;
		if (this.showPanel) {
			// if we are showing the panel, focus on the first item
			this.selectedScene = 0;
			this.setup();
		}
	}

	setup() {
		var i = 0;
		this.scenes.forEach(scene => {
			if (scene.enableOnHome) {
				this.enabledSceneName = scene.name;
				// make list picker focus on selected scene, check the toggle
				this.selectedScene = i;
				this.checked = true;
			}
			i++;
		});
		this.checked = false;
	}

	selectedIndexChange(args) {
		// TODO should pre load this in a list somehow
		let picker = <ListPicker> args.object;
		let index = picker.selectedIndex;
		if (index >= 0) {
			this.selectedScene = this.scenes[index];
			//  we have to loop over the group scenes and see if we find a match
			console.log('The enabled scene name is: ' + this.enabledSceneName);
			console.log('The selected scene is: ' + this.selectedScene);
			if (this.enabledSceneName === this.selectedScene) {
				console.log('checking the switch');
				this.checked = true;
			} else {
				this.checked = false;
			}
		}
		this.sceneChanged = true;
	}

	onChange(args) {
		this.checked = args.object.checked;
		var isEnabled = this.selectedScene === this.enabledSceneName;
		if (this.checked === true && !isEnabled) {
			this.enabledSceneName = this.selectedScene;
		}
		this.groupScene.scenes.forEach(scene => {
			if (scene.name === this.selectedScene) {
				scene.enableOnHome = this.checked;
			}
		});
	}
}