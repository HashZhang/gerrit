// Copyright (C) 2016 The Android Open Source Project
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
(function() {
  'use strict';

  Polymer({
    is: 'gr-confirm-revert-dialog',

    /**
     * Fired when the confirm button is pressed.
     *
     * @event confirm
     */

    /**
     * Fired when the cancel button is pressed.
     *
     * @event cancel
     */

    properties: {
      message: String,
    },

    populateRevertMessage: function(message) {
      // Figure out what the revert title should be.
      var originalTitle = message.split('\n')[0];
      var revertTitle = 'Revert "' + originalTitle + '"';
      // Figure out what the revert commit message should be.
      var commitRegex = /\nChange-Id: (\w+)\n\s*/g;
      var match = commitRegex.exec(message);
      if (!match) {
        alert('Unable to find Change-Id in footer of commit message.');
        return;
      }
      var revertCommitText = 'This reverts commit ' + match[1] + '.';
      // Add '> ' in front of the original commit text.
      var originalCommitText = message.replace(/^/gm, '> ');

      this.message = revertTitle + '\n\n' +
                     revertCommitText + '\n\n' +
                     'Reason for revert: <INSERT REASONING HERE>\n\n' +
                     'Original change\'s description:\n' + originalCommitText;
    },

    _handleConfirmTap: function(e) {
      e.preventDefault();
      this.fire('confirm', null, {bubbles: false});
    },

    _handleCancelTap: function(e) {
      e.preventDefault();
      this.fire('cancel', null, {bubbles: false});
    },
  });
})();
