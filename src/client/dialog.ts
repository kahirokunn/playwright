/**
 * Copyright (c) Microsoft Corporation.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { DialogChannel, DialogInitializer } from '../protocol/channels';
import { ChannelOwner } from './channelOwner';

export class Dialog extends ChannelOwner<DialogChannel, DialogInitializer> {
  static from(dialog: DialogChannel): Dialog {
    return (dialog as any)._object;
  }

  constructor(parent: ChannelOwner, type: string, guid: string, initializer: DialogInitializer) {
    super(parent, type, guid, initializer);
  }

  type(): string {
    return this._initializer.type;
  }

  message(): string {
    return this._initializer.message;
  }

  defaultValue(): string {
    return this._initializer.defaultValue;
  }

  async accept(promptText: string | undefined) {
    return this._wrapApiCall('dialog.accept', async () => {
      await this._channel.accept({ promptText });
    });
  }

  async dismiss() {
    return this._wrapApiCall('dialog.dismiss', async () => {
      await this._channel.dismiss();
    });
  }
}
