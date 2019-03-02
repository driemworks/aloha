import { Component, OnInit, Input, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { HueService } from '../services/hue.service';
import { Store } from '@ngrx/store';
import { AppState } from '../store/app.state';
import { User } from '../models/user.model';
import { Scene } from '../models/scene.model';
import { Router } from '@angular/router';
import { LightManagementInfoComponent } from './light-management-info/light-management-info.component';
import { UpdateUserAction } from '../store/user/user.actions';
import { GroupScene } from '../models/GroupScene.model';
import { flatten } from '@angular/core/src/render3/util';
import { itemsProperty } from 'nativescript-accordion/accordion.common';
import { ObservableArray } from 'tns-core-modules/data/observable-array/observable-array';

@Component({
	moduleId: module.id,
	selector: 'light-management',
	templateUrl: './light-management.component.html',
	styleUrls: ['./light-management.component.css']
})

export class LightManagementComponent implements OnInit {

	@Input() user: User;
	groupScenes = new Map();
	editMode: boolean = false;
	obserableGroupScenes: ObservableArray<any>;

	@ViewChildren(LightManagementInfoComponent) lightInfoList: QueryList<LightManagementInfoComponent>;

	constructor(private store: Store<AppState>,
				private hueService: HueService) { 
		// this.obserableGroupScenes = new ObservableArray();
		
		let mockScene: Scene = {
			name: 'test scene name',
			id: "adfadfadsfadf",
			enableOnHome: true
		}
		let anotherMock: Scene = {
			name: 'Mock Scene 2',
			id: "adfakif39vnsfg",
			enableOnHome: false
		}
		let noScene: Scene = {
			name: '',
			id: '',
			enableOnHome: false
		};
		
		// this.scenes[1] = anotherMock;
	}
	
	templateSelector(item: any, index: number, items: any): string {
		return item.expanded ? "expanded" : "default";
	}

	ngOnInit() {
		// construct the group scenes
		this.hueService.getGroups(this.user.bridgeIpAddress, this.user.username).subscribe((groupsResponse: Response) => {
			this.hueService.getScenes(this.user.bridgeIpAddress, this.user.username).subscribe((res: Response) => {
				var idx = 0;
				Object.keys(res).forEach(key => {
					if (res[key].type === 'GroupScene') {
						var groupId = res[key]['group'];
						var groupName = groupsResponse[groupId]['name'];
						var sceneName = res[key]['name'];
						var sceneId = key;
						var enableOnHome = false;
					
						if (this.user.groupStates) {
							this.user.groupStates.forEach(groupstate => {
								if (groupstate.sceneId === key) {
									enableOnHome = true;
								}
							});
						}

						let scene: Scene = {
							name: res[key]['name'],
							id: key,
							enableOnHome: enableOnHome
						};

						let _groupScene: GroupScene = null;
						// the group id has already been encountered
						if (this.groupScenes.get(groupId)) {
							// get the dto and append to the scenes
							 _groupScene = this.groupScenes.get(groupId);
							_groupScene.scenes.push(scene);
						} else {
							// This is the first time we have seen this group
							_groupScene = {
								groupId: groupId,
								groupName: groupName,
								scenes: [scene]
							}
						}
						this.groupScenes.set(groupId, _groupScene);
					}
					// if (idx === Object.keys(res).length-1) {
					// 	this.groupScenes.forEach(group => {
					// 		this.obserableGroupScenes.push(group);
					// 	});
					// }
					idx += 1;
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
		if (!this.user.groupStates) {
			this.user.groupStates = [];
		}
		this.editMode = !this.editMode;
		
		var i = 0;
		this.lightInfoList.forEach(info => {
			if (info.checked && info.groupState !== null) {
				this.user.groupStates.push(info.groupState);
			}
			// if it's the last time through the loop, update the user
			if (i === (this.lightInfoList.length - 1)) {
				// this.store.dispatch(new UpdateUserAction(this.user));
			}

			i += 1;
		});
		this.store.dispatch(new UpdateUserAction(this.user));
	}

	onCancelTap(args) {
		this.editMode = false;
		this.lightInfoList.forEach(info => {
			if (info.changed === true) {
				info.checked = !info.checked;
			}
		});
	}

	createItem(title, headerText, items) {
		return {
			title: `${title}`,
			headerText: `${headerText}`,
			items: [items],
			footer:'10'
		};
	}

	getGroupScenes() {
		console.log('aloha');
		return this.groupScenes.values;
	}

}
