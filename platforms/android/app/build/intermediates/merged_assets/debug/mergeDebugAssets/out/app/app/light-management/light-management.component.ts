import { Component, OnInit, Input, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { HueService } from '../services/hue.service';
import { Store } from '@ngrx/store';
import { AppState } from '../store/app.state';
import { User } from '../models/user.model';
import { Scene } from '../models/scene.model';
import { Router } from '@angular/router';
import { LightManagementInfoComponent } from './light-management-info/light-management-info.component';

@Component({
	moduleId: module.id,
	selector: 'light-management',
	templateUrl: './light-management.component.html',
	styleUrls: ['./light-management.component.css']
})

export class LightManagementComponent implements OnInit {

	private user: User;
	scenes: any[] = [];
	editMode: boolean = false;

	@ViewChildren(LightManagementInfoComponent) lightInfoList: QueryList<LightManagementInfoComponent>;

	constructor(private store: Store<AppState>,
				private hueService: HueService) { 

		this.store.select((state: any) => state.appState.user).subscribe(user => {
			this.user = user;
		});
		
		let mockScene: Scene = {
			name: 'test scene name',
			groupName: 'test group name',
			groupId: "1",
			id: "adfadfadsfadf",
			enableOnHome: true
		}
		let anotherMock: Scene = {
			name: 'Mock Scene 2',
			groupName: 'Mock groupname 2',
			id: "adfakif39vnsfg",
			groupId: "3",
			enableOnHome: false
		}
		// this.scenes[0] = mockScene;
		// this.scenes[1] = anotherMock;
	}

	ngOnInit() {
		this.hueService.getGroups(this.user.bridgeIpAddress, this.user.username).subscribe((groupsResponse: Response) => {
			this.hueService.getScenes(this.user.bridgeIpAddress, this.user.username).subscribe((res: Response) => {
				var idx = 0;
				Object.keys(res).forEach(key => {
					if (res[key].type === 'GroupScene') {
						var groupId = res[key]['group'];
						var groupName = groupsResponse[groupId]['name'];
						var enableOnHome = false;

						this.user.groupStates.forEach(groupstate => {
							if (groupstate.sceneId === key) {
								enableOnHome = true;
							}
						});

						let scene: Scene = {
							name: res[key]['name'],
							groupName: groupName,
							id: key,
							groupId: groupId,
							enableOnHome: enableOnHome
						};
						this.scenes[idx] = scene;
						idx += 1;
					}
				});
			});
		});
	}

	onTap(btn) {
		this.editMode = !this.editMode;
		if (this.editMode) {
			btn.text = 'SAVE';
		} else {
			btn.text = 'EDIT';
		}
	}

	onSaveTap() {
		console.log('SAVE');
		this.editMode = !this.editMode;
		this.lightInfoList.forEach(info => {
			if (info.changed) {
				if (info.groupState === null) {
					this.user.groupStates.forEach(groupstate => {
						if (groupstate.sceneId === info.scene.id) {
							this.user.groupStates.pop();
						}
					});
				} else {
					this.user.groupStates.push(info.groupState);
				}
			}
		});
	}

	onCancelTap(args) {
		console.log('cancel tapped');
		this.editMode = false;
		this.lightInfoList.forEach(info => {
			if (info.changed) {
				info.checked = info.scene.enableOnHome;
			}
		});

	}

}
