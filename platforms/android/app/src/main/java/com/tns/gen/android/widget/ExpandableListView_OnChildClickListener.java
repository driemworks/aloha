/* AUTO-GENERATED FILE. DO NOT MODIFY.
 * This class was automatically generated by the
 * static binding generator from the resources it found.
 * Please do not modify by hand.
 */
package com.tns.gen.android.widget;

public class ExpandableListView_OnChildClickListener implements android.widget.ExpandableListView.OnChildClickListener {
	public ExpandableListView_OnChildClickListener() {
		com.tns.Runtime.initInstance(this);
	}

	public boolean onChildClick(android.widget.ExpandableListView param_0, android.view.View param_1, int param_2, int param_3, long param_4)  {
		java.lang.Object[] args = new java.lang.Object[5];
		args[0] = param_0;
		args[1] = param_1;
		args[2] = param_2;
		args[3] = param_3;
		args[4] = param_4;
		return (boolean)com.tns.Runtime.callJSMethod(this, "onChildClick", boolean.class, args);
	}

}
