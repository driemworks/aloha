import { Component, OnInit, Input } from '@angular/core';
import { GroupScene } from '~/app/models/GroupScene.model';

@Component({
	moduleId: module.id,
	selector: 'scene-management',
	templateUrl: './scene-management.component.html',
	styleUrls: ['./scene-management.component.css']
})

export class SceneManagementComponent implements OnInit {

	@Input() groupScene: GroupScene;

	enabledSceneName = ' - ';

	constructor() { }

	ngOnInit() {
		console.log('In scene mgmt' + JSON.stringify(this.groupScene));
		this.groupScene.scenes.forEach(scene => {
			if (scene.enableOnHome === true) {
				this.enabledSceneName = scene.name;
			}
		});
	}
}