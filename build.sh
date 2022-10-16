#! /usr/bin/bash

echo -----
echo TSAB Build Compiler v1
echo Built and Maintained by SDS under the GNU AGPLv3 Licence
echo Find us at https://github.com/summerisadev/the-somewhat-awesome-bot!
echo -----

echo Deleting existing build...
rm -rf /build/
echo Compiling TypeScript...
tsc
echo Done!
echo ------
echo Run start.sh to start the bot and sync commands!
echo If an error occurs when compiling, run tsc. If that dont work, you probably dont have TypeScript
