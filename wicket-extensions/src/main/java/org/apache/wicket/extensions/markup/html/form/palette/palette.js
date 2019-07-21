/*
 * Licensed to the Apache Software Foundation (ASF) under one or more
 * contributor license agreements.  See the NOTICE file distributed with
 * this work for additional information regarding copyright ownership.
 * The ASF licenses this file to You under the Apache License, Version 2.0
 * (the "License"); you may not use this file except in compliance with
 * the License.  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

;(function (undefined) {
	'use strict';

	if (typeof(Wicket) === "undefined") {
		window.Wicket = { };
	}

	if (Wicket.Palette) {
		return;
	}

	Wicket.Palette = {
		$: function(id) {
			return document.getElementById(id);
		},

		choicesOnFocus: function(choicesId, selectionId, recorderId) {
			Wicket.Palette.clearSelectionHelper(Wicket.Palette.$(selectionId));
		},

		selectionOnFocus: function(choicesId, selectionId, recorderId) {
			Wicket.Palette.clearSelectionHelper(Wicket.Palette.$(choicesId));
		},

		add: function(choicesId, selectionId, recorderId) {
			var choices=Wicket.Palette.$(choicesId);
			var selection=Wicket.Palette.$(selectionId);

			if (Wicket.Palette.moveHelper(choices, selection)) {
				var recorder=Wicket.Palette.$(recorderId);
				Wicket.Palette.updateRecorder(selection, recorder);
			}
		},

		remove: function(choicesId, selectionId, recorderId) {
			var choices=Wicket.Palette.$(choicesId);
			var selection=Wicket.Palette.$(selectionId);
	
			if (Wicket.Palette.moveHelper(selection, choices)) {
				var recorder=Wicket.Palette.$(recorderId);
				Wicket.Palette.updateRecorder(selection, recorder);
			}
		},
	
		moveHelper: function(source, dest) {
			var dirty=false;
			for (var i=0;i<source.options.length;i++) {
				if (source.options[i].selected && !source.options[i].disabled) {
					dest.appendChild(source.options[i]);
					i--;
					dirty=true;
				}
			}
			return dirty;
		},
	
		moveUp: function(choicesId, selectionId, recorderId) {
			var selection=Wicket.Palette.$(selectionId);
	
			if (Wicket.Palette.moveUpHelper(selection)) {
				var recorder=Wicket.Palette.$(recorderId);
				Wicket.Palette.updateRecorder(selection, recorder);
			}
		},
	
		moveUpHelper: function(box) {
			var dirty=false;
			for (var i=0;i<box.options.length;i++) {
				if (box.options[i].selected && i>0) {
					if(!box.options[i-1].selected) {
						box.insertBefore(box.options[i],box.options[i-1]);
						dirty=true;
						box.focus();
					}
				}
			}
			return dirty;
		},
	
		moveDown: function(choicesId, selectionId, recorderId) {
			var selection=Wicket.Palette.$(selectionId);
	
			if (Wicket.Palette.moveDownHelper(selection)) {
				var recorder=Wicket.Palette.$(recorderId);
				Wicket.Palette.updateRecorder(selection, recorder);
			}
		},
	
		moveDownHelper: function(box) {
			var dirty=false;
			for (var i=box.options.length-1;i>=0;i--) {
				if (box.options[i].selected && i<box.options.length-1) {
					if(!box.options[i+1].selected) {
						box.insertBefore(box.options[i+1],box.options[i]);
						dirty=true;
					}
				}
			}
			return dirty;
		},

		updateRecorder: function(selection, recorder) {
			recorder.value="";
			for (var i=0;i<selection.options.length;i++) {
				recorder.value=recorder.value+selection.options[i].value;
				if (i+1<selection.options.length) {
					recorder.value=recorder.value+",";
				}
			}
	
			recorder.dispatchEvent(new Event('change', { 'bubbles': true }));
		},
	
		clearSelectionHelper: function(box) {
			for (var i=0;i<box.options.length;i++) {
				box.options[i].selected=false;
			}
		},
	
		addAll: function(choicesId, selectionId, recorderId) {
			var palette = Wicket.Palette;
			var choices = palette.$(choicesId);
			var selection = palette.$(selectionId);
	
			if (palette.moveAllHelper(choices, selection)) {
				var recorder = palette.$(recorderId);
				palette.updateRecorder(selection, recorder);
			}
		},
	
		removeAll: function(choicesId, selectionId, recorderId) {
			var palette = Wicket.Palette;
			var choices = palette.$(choicesId);
			var selection = palette.$(selectionId);
	
			if (palette.moveAllHelper(selection, choices)) {
				var recorder = palette.$(recorderId);
				palette.updateRecorder(selection, recorder);
			}
		},
	
		moveAllHelper: function(source, dest) {
			var dirty = false;
			for (var i = 0;i < source.options.length; i++) {
				dest.appendChild(source.options[i]);
				i--;
				dirty = true;
			}
			return dirty;
		}
	}
})();
