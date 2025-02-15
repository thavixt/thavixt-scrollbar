#!/bin/bash
set -e

module="core" # replace with the current package name
prefix="\n[$module]"

if [[ $# -eq 0 ]] ; then
    printf '$prefix Specify version number in argument'
    exit 0
fi

cd $module
version=$1

printf "$prefix Pre-release of thavixt-scrollbar-$module v$version"

printf "$prefix Check dependencies"
npm i 

printf "$prefix Run type checks"
npm run typecheck 
printf "$prefix Run tests"
npm run test 
printf "$prefix Run build"
npm run build 

# npm run lint
if [[ "$*" == *"--pre"* ]]
then
    exit 0
else
    printf "$prefix Release thavixt-scrollbar-$module v$version\n"
    npm version $version 
    npm publish 
    printf "$prefix Published thavixt-scrollbar-$module v$version\n"
    cd ..
fi