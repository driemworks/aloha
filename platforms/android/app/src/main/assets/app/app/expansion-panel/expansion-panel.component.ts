import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
	moduleId: module.id,
	selector: 'expansion-panel',
	templateUrl: './expansion-panel.component.html',
	styleUrls: ['./expansion-panel.component.css']
})

export class ExpansionPanelComponent {

	showPanel = false;

	@Output() onTogglePanel: EventEmitter<any> = new EventEmitter();

	constructor() { }

	handleClick() {
		this.showPanel = !this.showPanel;
		this.onTogglePanel.emit(this.showPanel);
	}
}