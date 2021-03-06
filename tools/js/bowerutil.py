# Copyright (C) 2013 The Android Open Source Project
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
# http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

import os
from os import path


def hash_bower_component(hash_obj, path):
  """Hash the contents of a bower component directory.

  This is a stable hash of a directory downloaded with `bower install`, minus
  the .bower.json file, which is autogenerated each time by bower. Used in lieu
  of hashing a zipfile of the contents, since zipfiles are difficult to hash in
  a stable manner.

  Args:
    hash_obj: an open hash object, e.g. hashlib.sha1().
    path: path to the directory to hash.

  Returns:
    The passed-in hash_obj.
  """
  if not os.path.isdir(path):
    raise ValueError('Not a directory: %s' % path)

  path = os.path.abspath(path)
  for root, dirs, files in os.walk(path):
    dirs.sort()
    for f in sorted(files):
      if f == '.bower.json':
        continue
      p = os.path.join(root, f)
      hash_obj.update(p[len(path)+1:])
      hash_obj.update(open(p).read())

  return hash_obj
